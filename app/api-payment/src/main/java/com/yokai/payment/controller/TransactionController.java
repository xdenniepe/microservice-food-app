package com.yokai.payment.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.yokai.core.dto.CartItemDTO;
import com.yokai.core.dto.InvoicePdfDTO;
import com.yokai.core.dto.PaymentDTO;
import com.yokai.core.dto.ProductDTO;
import com.yokai.core.dto.ReceiptDTO;
import com.yokai.core.dto.ReceiptItemsDTO;
import com.yokai.core.dto.TransactionDTO;
import com.yokai.core.enumerated.CartItemStatusEnum;
import com.yokai.core.security.jwt.JWTUtil;
import com.yokai.core.security.user.UserCredential;
import com.yokai.payment.apiservice.InventoryApiService;
import com.yokai.payment.apiservice.OrderApiService;
import com.yokai.payment.apiservice.PaymentApiService;
import com.yokai.payment.controller.request.CheckOutRequest;
import com.yokai.payment.controller.response.CouponResponse;
import com.yokai.payment.entity.Coupon;
import com.yokai.payment.entity.Payment;
import com.yokai.payment.entity.Transaction;
import com.yokai.payment.entity.TransactionItem;
import com.yokai.payment.mapper.HibernateFieldMapper;
import com.yokai.payment.repository.CouponRepository;
import com.yokai.payment.repository.PaymentRepository;
import com.yokai.payment.repository.TransactionItemRepository;
import com.yokai.payment.repository.TransactionRepository;
import com.yokai.payment.service.CouponService;
import com.yokai.payment.service.ProductService;
import com.yokai.payment.service.TransactionItemService;

import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.extern.log4j.Log4j2;

@RestController
@RepositoryRestController
@Log4j2
public class TransactionController {

    @Autowired
    private InventoryApiService inventoryApiService;

    @Autowired
    private WebClient userClient;

    @Autowired
    private OrderApiService orderApiService;

    @Autowired
    private PaymentApiService paymentApiService;
    
    @Autowired
    private CouponService couponService;

    @Autowired
    private ProductService productService;

    @Autowired
    private TransactionItemService transactionItemService;

    @Autowired
    private TransactionRepository transactionRepo;

    @Autowired
    private TransactionItemRepository transactionItemRepo;

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private CouponController couponController;

    @Autowired
    private CouponRepository couponRepo;

    private DozerBeanMapper dozer;

    @Autowired
    public TransactionController() {
        this.dozer  = new DozerBeanMapper();
        this.dozer.setCustomFieldMapper( new HibernateFieldMapper());
    }

    /**
     * This whole process should replace by SAGA orchestration pattern
     * Steps:
     * 1. Check Inventory
     * 2. Save Transaction
     * 3. Save Transaction_Item
     * 4. Update Inventory (Should be added at MVP 2)
     * 5. Perform Payment
     * 6. Save Payment information
     * 7. Update Order status to completed
     * 
     * braintree_transaction_id
     * @return
     * @throws IOException
     * @throws NotFoundException
     */
    @PostMapping("/api/transactions/checkout")
    @Transactional
    public ResponseEntity<Object> checkout(@RequestHeader("Authorization") String token, @RequestBody CheckOutRequest req) throws IOException, NotFoundException {
        log.info("TransactionController.checkout begin()");
        
        String                    qrCode        = "";
        UserCredential            uc            = JWTUtil.parseToken(token.substring(7, token.length()));
        Optional<CouponResponse>  coupon        = Optional.ofNullable(couponController.checkCouponCode(req.getCouponCode()).getBody());
        List<CartItemDTO>         cartItems     = orderApiService.getCartItems(token, uc.getUserId());

        // Step 1
        Optional<CartItemDTO>     cartItem      = cartItems.stream().findFirst();
        
        if (cartItem.isPresent()) {
            List<ProductDTO>          stocks        = inventoryApiService.getProducts(cartItem.get().getVendorMachineId());
            List<ProductDTO>          purchases     = new ArrayList<>();
            int                       ctr           = 0;

            for (CartItemDTO ci : cartItems) {
                Optional<ProductDTO>    optProdcut  = productService.getProduct(stocks, ci.getProductId());
                ProductDTO              product     = new ProductDTO();

                if (optProdcut.isPresent()) {
                    product = optProdcut.get();
                } else {
                    ci.setStatus(CartItemStatusEnum.UNAVAILABLE);
                    ctr++;
                }
                
                if (product.getQuantity() < ci.getQuantity()) {
                    ci.setStatus(CartItemStatusEnum.UNAVAILABLE);
                    ctr++;
                }

                ProductDTO purchaseItem = new ProductDTO();

                purchaseItem.setProductId(product.getProductId());
                purchaseItem.setQuantity(ci.getQuantity());
                purchases.add(purchaseItem);
            }
            
            if (ctr > 0) {
                return new ResponseEntity<>(cartItems, HttpStatus.BAD_REQUEST);
            }

            qrCode = inventoryApiService.purchase(cartItem.get().getVendorMachineId(), purchases);
        }

        // Step 2
        Transaction transaction = new Transaction();

        transaction.setOrderId(req.getOrderId());
        transaction.setCode(qrCode.replace("\"", ""));
        transaction.setUserId(uc.getUserId());
        transaction.setWhoAdded(uc.getUserId());
        transaction.setWhenAdded( (int) (new Date().getTime()/ 1000));

        if (coupon.isPresent()){
            transaction.setCouponId(coupon.get().getCouponId());
        }

        transactionRepo.save(transaction);

        // Step 3
        List<TransactionItem> transactionItems = transactionItemService.cartItemsToTransactionItems(cartItems, uc.getUserId(), transaction);
        transactionItemRepo.saveAll(transactionItems);  

        // Step 5
        Double      total       = couponService.applyCoupon(coupon,transactionItems.stream().map(TransactionItem::getItemTotalCost).reduce(0d, Double::sum));
        PaymentDTO  paymentDTO  = paymentApiService.createOrder(token, total, req.getPaymentMethod());

        // Step 6
        Payment     payment     = new Payment();
        
        dozer.map(paymentDTO, payment);
        payment.setTransaction(transaction);
        paymentRepo.save(payment);
        
        // Step 7
        orderApiService.updateOrder(token, req.getOrderId());

        return new ResponseEntity<>(HttpStatus.OK);

    }
    

    
    /**
     * 
     * @param token
     * @param orderId
     * @return
     * @throws IOException
     * @throws NotFoundException
     */
    @PostMapping("/api/transactions/receipt")
    public ResponseEntity<Object> sendReceipt(@RequestHeader("Authorization") String token, @RequestBody CheckOutRequest req) throws IOException, NotFoundException {

        Optional<Transaction>    transaction    = transactionRepo.findByOrderId(req.getOrderId());
        ReceiptDTO               receipt        = new ReceiptDTO();
        Optional<Coupon>         coupon         = Optional.ofNullable(new Coupon());
        CouponResponse           couponResponse = new CouponResponse();

        if (transaction.get().getCouponId() != null) {
            coupon = couponRepo.findByCouponId(transaction.get().getCouponId());

            if (coupon.isPresent()) {
                couponResponse = couponService.checkCoupon(coupon.get().getCouponCode());
            }
        }
        
        InvoicePdfDTO  invoicePdf     = new InvoicePdfDTO();
        Payment        payment        = paymentRepo.findByTransactionId(transaction.get().getTransactionId());
        PaymentDTO     paymentDTO     = new PaymentDTO();
        TransactionDTO transactionDTO = new TransactionDTO();
        Double         trTotal        = transaction.get().getTotal();
        Double         discount       = 0.0;
        List<CartItemDTO> cartItemDTOs =  new ArrayList<>();

        
        if (couponResponse.getPercentage() != null) {
            Double couponPercentage = ((double) couponResponse.getPercentage() / 100);
            discount = trTotal * couponPercentage;
        }

        if (couponResponse.getAmount() != null) {
            Double couponAmount = (double) (couponResponse.getAmount());
            discount = couponAmount;
        }

        if (transaction.isPresent()) {

            dozer.map(transaction.get(), transactionDTO);
            dozer.map(payment, paymentDTO);

            log.info("get Items ===> {}", req.getInvoicePdf().getItems());

            // invoicePdf
            cartItemDTOs = req.getInvoicePdf().getItems();
            invoicePdf.setItems(cartItemDTOs);
            invoicePdf.setPaymentInfo(paymentDTO);
            invoicePdf.setTransaction(transactionDTO);
            invoicePdf.setItems(req.getInvoicePdf().getItems());
            invoicePdf.setDiscount(discount);
            invoicePdf.setCoupon(req.getInvoicePdf().getCoupon());
            invoicePdf.setTransactionDate(req.getInvoicePdf().getTransactionDate());

            // receipt
            receipt.setOrderId(transaction.get().getOrderId());
            receipt.setUserId(transaction.get().getUserId());
            receipt.setSubtotal(transaction.get().getSubtotal());
            receipt.setFees(transaction.get().getFees());
            receipt.setTotal(transaction.get().getTotal());
            receipt.setInvoicePdf(invoicePdf);

            ReceiptDTO sendEmail = userClient.post().uri(uriBuilder -> uriBuilder.path("/api/users/receipt").build())
                                                    .contentType(MediaType.APPLICATION_JSON)
                                                    .header(HttpHeaders.AUTHORIZATION, token)
                                                    .bodyValue(receipt)
                                                    .retrieve().bodyToMono(ReceiptDTO.class).block();

            return new ResponseEntity<>(sendEmail, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/api/transactions/receiptjp")
    public ResponseEntity<Object> sendReceiptJp(@RequestHeader("Authorization") String token, @RequestBody CheckOutRequest req) throws IOException, NotFoundException {

        Optional<Transaction>    transaction    = transactionRepo.findByOrderId(req.getOrderId());
        ReceiptDTO               receipt        = new ReceiptDTO();
        Optional<Coupon>         coupon         = Optional.ofNullable(new Coupon());
        CouponResponse           couponResponse = new CouponResponse();

        if (transaction.get().getCouponId() != null) {
            coupon = couponRepo.findByCouponId(transaction.get().getCouponId());

            if (coupon.isPresent()) {
                couponResponse = couponService.checkCoupon(coupon.get().getCouponCode());
            }
        }
        
        InvoicePdfDTO  invoicePdf     = new InvoicePdfDTO();
        Payment        payment        = paymentRepo.findByTransactionId(transaction.get().getTransactionId());
        PaymentDTO     paymentDTO     = new PaymentDTO();
        TransactionDTO transactionDTO = new TransactionDTO();
        Double         trTotal        = transaction.get().getTotal();
        Double         discount       = 0.0;
        List<CartItemDTO> cartItemDTOs =  new ArrayList<>();

        
        if (couponResponse.getPercentage() != null) {
            Double couponPercentage = ((double) couponResponse.getPercentage() / 100);
            discount = trTotal * couponPercentage;
        }

        if (couponResponse.getAmount() != null) {
            Double couponAmount = (double) (couponResponse.getAmount());
            discount = couponAmount;
        }

        if (transaction.isPresent()) {

            dozer.map(transaction.get(), transactionDTO);
            dozer.map(payment, paymentDTO);

            log.info("get Items ===> {}", req.getInvoicePdf().getItems());

            // invoicePdf
            cartItemDTOs = req.getInvoicePdf().getItems();
            invoicePdf.setItems(cartItemDTOs);
            invoicePdf.setPaymentInfo(paymentDTO);
            invoicePdf.setTransaction(transactionDTO);
            invoicePdf.setItems(req.getInvoicePdf().getItems());
            invoicePdf.setDiscount(discount);
            invoicePdf.setCoupon(req.getInvoicePdf().getCoupon());
            invoicePdf.setTransactionDate(req.getInvoicePdf().getTransactionDate());

            // receipt
            receipt.setOrderId(transaction.get().getOrderId());
            receipt.setUserId(transaction.get().getUserId());
            receipt.setSubtotal(transaction.get().getSubtotal());
            receipt.setFees(transaction.get().getFees());
            receipt.setTotal(transaction.get().getTotal());
            receipt.setInvoicePdf(invoicePdf);

            ReceiptDTO sendEmail = userClient.post().uri(uriBuilder -> uriBuilder.path("/api/users/receiptjp").build())
                                                    .contentType(MediaType.APPLICATION_JSON)
                                                    .header(HttpHeaders.AUTHORIZATION, token)
                                                    .bodyValue(receipt)
                                                    .retrieve().bodyToMono(ReceiptDTO.class).block();

            return new ResponseEntity<>(sendEmail, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
