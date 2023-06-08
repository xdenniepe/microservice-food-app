package com.yokai.auth.controller;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;
import java.util.Random;
import java.util.List;

import javax.mail.MessagingException;

import com.yokai.auth.dto.EmailVerificationDTO;
import com.yokai.auth.dto.NewPasswordDTO;
import com.yokai.auth.entity.User;
import com.yokai.auth.entity.Verification;
import com.yokai.auth.service.EmailService;
import com.yokai.auth.service.RegistrationService;
import com.yokai.auth.service.TwilioService;
import com.yokai.auth.service.UserService;
import com.yokai.auth.service.VerificationService;
import com.yokai.auth.utility.Constants;
import com.yokai.core.dto.UserDTO;
import com.yokai.core.utility.Utility;
import com.yokai.core.dto.ExternalLoginDTO;
import com.yokai.auth.entity.ExternalLogin;
import com.yokai.auth.repository.ExternalLoginRepository;
import com.yokai.auth.repository.UserRepository;
import com.yokai.auth.repository.VerificationRepository;
import com.yokai.core.dto.VerificationDTO;
import com.yokai.auth.entity.FeedBackEntity;
import com.yokai.core.dto.FeedBackDTO;
import com.yokai.auth.repository.FeedBackRepository;

import com.yokai.auth.service.RewardsService;
import com.yokai.auth.entity.RewardsEntity;
import com.yokai.core.dto.RewardsDTO;
import com.yokai.auth.repository.RewardsRepository;

import com.yokai.auth.repository.NotificationRepository;
import com.yokai.core.dto.NotificationDTO;
import com.yokai.auth.entity.NotificationEntity;
import com.yokai.auth.service.NotificationService;

import com.yokai.auth.repository.LoyaltyRepository;
import com.yokai.core.dto.LoyaltyDTO;
import com.yokai.auth.entity.LoyaltyEntity;
import com.yokai.auth.service.LoyaltyService;


import com.yokai.auth.repository.LoyaltyRewardRepository;
import com.yokai.core.dto.LoyaltyRewardsDTO;
import com.yokai.auth.entity.LoyaltyRewardsEntity;

import com.yokai.auth.repository.FavoritesRepository;
import com.yokai.core.dto.FavoritesDTO;
import com.yokai.auth.entity.FavoritesEntity;
import com.yokai.auth.service.FavoritesService;



import com.yokai.auth.repository.CustomerTotalMoneySpentRepository;
import com.yokai.core.dto.CustomerTotalMoneySpentDTO;
import com.yokai.auth.entity.CustomerTotalMoneySpentEntity;
import com.yokai.auth.service.CustomerTotalMoneySpentService;


import com.yokai.auth.repository.LoyaltyTierListRepository;
import com.yokai.core.dto.LoyaltyTierListDTO;
import com.yokai.auth.entity.LoyaltyTierListEntity;


import com.yokai.auth.repository.UserDiscountPercentageRepository;
import com.yokai.core.dto.UserDiscountPercentageDTO;
import com.yokai.auth.entity.UserDiscountPercentageEntity;
import com.yokai.auth.service.UserDiscountPercentageService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.rest.core.config.Projection;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(path = "/api/public")
@Slf4j
public class UserController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private TwilioService twilioService;
    
    @Autowired
    private RewardsService rewardsService ;

    @Autowired
    private NotificationService notificationService ;

    @Autowired
    private LoyaltyService loyaltyService;


    @Autowired
    private CustomerTotalMoneySpentService customerTotalMoneySpentService;

    
    @Autowired
    private UserDiscountPercentageService userDiscountPercentageService;

    @Autowired
    private FavoritesService favoritesService;


    @Autowired
    private BCryptPasswordEncoder encryptPassword;

    @Autowired
    private ExternalLoginRepository externalLoginRepository;

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private FeedBackRepository feedBackRepository;

    @Autowired
    private UserRepository userRepository;

    
    @Autowired
    private RewardsRepository rewardsRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    
    @Autowired
    private LoyaltyRepository loyaltyRepository;

     @Autowired
    private LoyaltyRewardRepository loyaltyRewardRepository;

    
     @Autowired
    private CustomerTotalMoneySpentRepository customerTotalMoneySpentRepository;

    
     @Autowired
    private UserDiscountPercentageRepository userDiscountPercentageRepository;

    @Autowired
    private FavoritesRepository favoritesRepository;

    @Autowired
    private LoyaltyTierListRepository loyaltyTierListRepository;

    // @Autowired RewardsService rewardsService;
    /**
     * 
     * @return
     */
    @PostMapping("/deleteUser")
    public ResponseEntity<User> deleteUser(@RequestBody User request) {
        ResponseEntity<User> deleteUser = userService.deleteUser(request);
        return deleteUser;
    }

    /**
     *
     * 
     * @return
     * 
     */
    @PutMapping("/deleteUser/external/{status}/{dateDeleted}/{userId}")
    public Integer updateExternalState(@PathVariable String status,@PathVariable Long dateDeleted, @PathVariable List<Integer> userId){
        return userService.updateExternalState(status, dateDeleted, userId);
    }

    /**
     *
     * 
     * @return
     * 
     */
     
    @PutMapping("/deleteUser/verification/{dateDeleted}/{userId}")
    public Integer updateVerificationState(@PathVariable Long dateDeleted, @PathVariable List<Integer> userId){
        return userService.updateVerificationState(dateDeleted, userId);
    }


    /**
     * 
     * @return
     */
    @GetMapping("/search/findByToken")
    public ResponseEntity<Object> getUser() {
        log.info("GET USER by Token API");

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            log.info("Name: {}", authentication.getName());

            Optional<User> user = userService.findByEmail(authentication.getName());
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/search/findByEmail")
    public ResponseEntity<Object> findByEmail(@RequestBody UserDTO request) {
        log.info("Checking user with {}", request);

        return new ResponseEntity<>(userService.findByEmail(request.getEmail()), HttpStatus.OK);

    }

    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/search/findByVerificationUserId")
    public ResponseEntity<Object> findByVerificationUserId(@RequestBody VerificationDTO request) {
        log.info("Checking user with {}", request);

        return new ResponseEntity<>(userService.findByVerificationUserId(request.getUserId()), HttpStatus.OK);

    }


   /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/search/findByUserSub")
    public ResponseEntity<Object> findBySub(@RequestBody ExternalLoginDTO request) {
        log.info("Checking user with {}", request);

        return new ResponseEntity<>(userService.findBySub(request.getSub()), HttpStatus.OK);

    }


    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/search/findByVerificationCode")
    public ResponseEntity<Object> findByCode(@RequestBody VerificationDTO request) {
        log.info("Checking user with {}", request);

        return new ResponseEntity<>(userService.findByCode(request.getCode()), HttpStatus.OK);

    }

    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/search/findByUserId")
    public ResponseEntity<Object> findByUserId(@RequestBody UserDTO request) {
        log.info("Checking user with {}", request);

        return new ResponseEntity<>(userService.findByUserId(request.getUserId()), HttpStatus.OK);

    }

    /**
     * 
     * @return
     */
    @GetMapping("/authorization")
    public boolean checkAuthorization() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("authentication: {}", authentication.getPrincipal());
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            log.info("Name: {}", authentication);

            if (!userService.findByEmail(authentication.getName()).isEmpty()) {
                return true;
            }
        }

        return false;
    }

    /**
     * 
     * 
     * @return
     */
    @PostMapping("/register/feedback")
    public ResponseEntity<?> registerFeedback(@RequestBody FeedBackDTO feedBackDTO){

        FeedBackEntity feedBackEntity = new FeedBackEntity();
        feedBackEntity.setName(feedBackDTO.getName());
        feedBackEntity.setEmail(feedBackDTO.getEmail());
        feedBackEntity.setReason(feedBackDTO.getReason());
        feedBackEntity.setDescription(feedBackDTO.getDescription());

        feedBackRepository.save(feedBackEntity);

        return new ResponseEntity<>(feedBackEntity, HttpStatus.OK);

    }

    /**
     * 
     * 
     * @return
     */
    @PostMapping("/register/verify/external")
    public ResponseEntity<?> registerUser(@RequestBody ExternalLoginDTO externalLoginDto){
        // add check for username exists in a DB
        if(externalLoginRepository.existsBySub(externalLoginDto.getSub())){
            return new ResponseEntity<>("Account is already taken!", HttpStatus.BAD_REQUEST);
        }

        // create user object
        ExternalLogin externalLogin = new ExternalLogin();
        externalLogin.setUserId(externalLoginDto.getUserId());
        externalLogin.setEmail(externalLoginDto.getEmail());
        externalLogin.setType(externalLoginDto.getType());
        externalLogin.setStatus("ACT");
        externalLogin.setSub(externalLoginDto.getSub());

        externalLoginRepository.save(externalLogin);


        return new ResponseEntity<>(externalLogin, HttpStatus.OK);

    }

    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserDTO request) {
        log.info("Creating user with {}", request);
        return ResponseEntity.ok(registrationService.register(request));
    }

     /**
     *
     * @param request
     * @return
     * @throws IOException
     */

    @PostMapping("/register/verify/guest")
    public ResponseEntity<User> registerGuest(@RequestBody User request) {
        ResponseEntity<User> guestUser = userService.verifyGuestUser(request);
        return guestUser;
    }

    /**
     *
     * @param request
     * @return
     * @throws MessagingException
     * @throws IOException
     */

    @PostMapping("/register/verify")
    public ResponseEntity<String> signUpVerification(@RequestBody EmailVerificationDTO request)
            throws MessagingException, IOException {
        ResponseEntity<String> userStatus = userService.verifyUser(request);
        return userStatus;
    }

    @PostMapping("/register/verifyJp")
    public ResponseEntity<String> signUpVerificationJp(@RequestBody EmailVerificationDTO request)
            throws MessagingException, IOException {
        ResponseEntity<String> userStatus = userService.verifyUserJp(request);
        return userStatus;
    }

    /**
     * 
     * @param code
     * @return
     */
    @GetMapping("/register/verify/{code:.+}")
    public ResponseEntity<String> verifySignUpCode(@PathVariable("code") String code) {
        ResponseEntity<String> verificationStatus = userService.verifyCode(code);
        return verificationStatus;
    }

    /**
     * 
     * @param request
     * @return
     * @throws MessagingException
     * @throws IOException
     */
    @PostMapping("/forgotpassword")
    public ResponseEntity<Object> forgotPasswordRequest(@RequestBody EmailVerificationDTO request)
            throws MessagingException, IOException {
        HttpStatus fpRequestStatus = userService.forgotPasswordRequest(request);
        return new ResponseEntity<>(fpRequestStatus);
    }

    @PostMapping("/forgotpasswordjp")
    public ResponseEntity<Object> forgotPasswordRequestJp(@RequestBody EmailVerificationDTO request)
            throws MessagingException, IOException {
        HttpStatus fpRequestStatus = userService.forgotPasswordRequestJp(request);
        return new ResponseEntity<>(fpRequestStatus);
    }

    @GetMapping("/newpassword/{code:.+}")
    public ResponseEntity<Object> redirectToCreateNewPassword(@PathVariable("code") String code,
                                                              @RequestParam("resendRequest") boolean resendRequest) {
        HttpStatus requestStatus = userService.createNewPassword(code, resendRequest);
        return new ResponseEntity<>(requestStatus);
    }

    /**
     * 
     * @param request
     * @return
     */
    @PostMapping("/newpassword")
    public ResponseEntity<Object> updateUserPassword(@RequestBody NewPasswordDTO request) {
        HttpStatus updateStatus = userService.updateUserPassword(request);
        return new ResponseEntity<>(updateStatus);
    }

    @PostMapping("login/verify")
    public ResponseEntity<User> verify(@RequestBody UserDTO request) throws MessagingException, IOException {
        log.info("Creating OTP with {}", request);

        return ResponseEntity.ok(userService.updateOtp(request));
    }
    
    @PostMapping("login/sendOtp")
    public ResponseEntity<String> otp(@RequestBody UserDTO request) throws MessagingException, IOException {
        log.info("Sending OTP email with {}", request);
        HttpStatus status      = null;
        User       user   = userService.findByEmail(request.getEmail()).get();
        Locale     locale = new Locale.Builder().setLanguage("en").setRegion("US").build();


        emailService.sendTwoFactorAuthCode(user, locale);

        status = HttpStatus.OK;
        return new ResponseEntity<>(status);
    }

    @PostMapping("login/sendOtpJp")
    public ResponseEntity<String> otpJp(@RequestBody UserDTO request) throws MessagingException, IOException {
        log.info("Sending OTP email with {}", request);
        HttpStatus status      = null;
        User       user   = userService.findByEmail(request.getEmail()).get();
        Locale     locale = new Locale.Builder().setLanguage("en").setRegion("US").build();


        emailService.sendTwoFactorAuthCodeJp(user, locale);

        status = HttpStatus.OK;
        return new ResponseEntity<>(status);
    }

    @PostMapping("login/clearOtp")
    public ResponseEntity<User> clearOtp(@RequestBody UserDTO request) throws MessagingException, IOException {
        log.info("Clearing OTP with {}", request);

        return ResponseEntity.ok(userService.clearOtp(request));
    }

    /**
     *
     * @param userId
     * @param requestType
     * @return
     */
    public String generateCode(Integer userId, String requestType, String method) {

        Verification verification = new Verification();
        String code = "";

        Long       unixTime   = Instant.now().getEpochSecond();
        int        now        = unixTime.intValue();
        Long       expiration = Instant.now().plusSeconds(1800).getEpochSecond();

        Optional<Verification> user = verificationService.findByUserIdAndStatus(userId, Constants.ACTIVE_CODE);

        if (user.isPresent()) {
            verification = user.get();
            verification.setType(requestType);
            verification.setWhoUpdated(userId);
            if (user.get().getExpiration() < now) {
                verification.setExpiration(expiration);
                verification.setStatus(Constants.ACTIVE_CODE);

                if ("phone".equals(method)) {
                    verification.setCode(getRandomNumberString());
                } else {
                    verification.setCode(Utility.generateUUID());
                }

                verificationService.setVerification(verification);
            }

            if (user.get().getExpiration() > now) {
                verification.setStatus(Constants.INACTIVE_CODE);
                verificationService.setVerification(verification);
                addVerification(verification, expiration, requestType, userId, method);
            }
        } else {
            addVerification(verification, expiration, requestType, userId, method);
        }

        code = verification.getCode();
        return code;

    }

    private void addVerification(Verification verification, Long expiration, String requestType,
            Integer userId, String method) {

        verification.setExpiration(expiration);
        verification.setStatus(Constants.ACTIVE_CODE);
        verification.setType(requestType);
        verification.setUserId(userId);
        verification.setWhoAdded(userId);
        if ("phone".equals(method)) {
            verification.setCode(getRandomNumberString());
        } else {
            verification.setCode(Utility.generateUUID());
        }

        verificationService.setVerification(verification);
    }

    public static String getRandomNumberString() {
        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        return String.format("%06d", number);
    }


    @GetMapping("/rewards/{userId}/{status}")
    public List<RewardsEntity> getRewards(@PathVariable Integer userId, @PathVariable String status)
    {
        List<RewardsEntity> rewards =  rewardsRepository.findByUserIdAndStatus(userId,status);
        return rewards;
    }

    @PostMapping("register/rewards")
    public ResponseEntity<?> registerReward(@RequestBody RewardsDTO rewardsDTO){

        RewardsEntity rewardsEntity = new RewardsEntity();
        rewardsEntity.setUserId(rewardsDTO.getUserId());
        rewardsEntity.setPercentage(rewardsDTO.getPercentage());
        rewardsEntity.setStatus(rewardsDTO.getStatus());
        rewardsEntity.setUniqueKey(rewardsDTO.getUniqueKey());
        rewardsEntity.setSource(rewardsDTO.getSource());

        rewardsRepository.save(rewardsEntity);

        return new ResponseEntity<>(rewardsEntity, HttpStatus.OK);

    }
   

    @GetMapping("/rewards/rewardsClaim/{uniqueKey}")
    public Optional<RewardsEntity> getRewardsClaim(@PathVariable String uniqueKey)
    {
        Optional<RewardsEntity> rewardsDetails =  rewardsRepository.findByUniqueKey(uniqueKey);
        return rewardsDetails;
    }

    @PutMapping("/rewards/updateRewards/{status}/{uniqueKey}")
    public Integer updateRewards(@PathVariable String status, @PathVariable List<String> uniqueKey ){
        return rewardsService.updateRewards(status,uniqueKey);
    }

    @GetMapping("/userDiscount/{userId}")
    public Optional<UserDiscountPercentageEntity> getUserDiscount(@PathVariable Integer userId)
    {
        Optional<UserDiscountPercentageEntity> userDiscount =  userDiscountPercentageRepository.findByUserId(userId);
        return userDiscount;
    }

     @PutMapping("updateUserDiscount/{percentage}/{userId}")
    public Integer updateUserDiscount(@PathVariable Integer percentage, @PathVariable List<Integer> userId ){
        return userDiscountPercentageService.updateUserDiscount(percentage,userId);
    }

     @GetMapping("/notification/{userId}")
    public List<NotificationEntity> getNotification(@PathVariable Integer userId)
    {
        List<NotificationEntity> notification =  notificationRepository.findNotifByUserId(userId);
        return notification;
    }

    @PutMapping("/notification/updateNotifSeen/{seen}/{notifId}")
    public Integer updateNotifSeen(@PathVariable Integer seen, @PathVariable List<Integer> notifId ){
        return notificationService.updateNotifSeen(seen,notifId);
    }

    @PutMapping("/notification/updateAllNotifSeen/{seen}/{userId}")
    public Integer updateAllNotifSeen(@PathVariable Integer seen, @PathVariable List<Integer> userId ){
    return notificationService.updateAllNotifSeen(seen,userId);
    }

    @DeleteMapping("/notification/deleteNotif/{notifId}")
    public Integer deleteNotif( @PathVariable List<Integer> notifId ){
        return notificationService.deleteNotif(notifId);
    }

    @DeleteMapping("/notification/deleteAllNotif/{userId}")
    public Integer deleteAllNotif( @PathVariable List<Integer> userId ){
        return notificationService.deleteAllNotif(userId);
    }


    @GetMapping("/loyalty/{userId}")
    public Optional<LoyaltyEntity> getLoyalty(@PathVariable Integer userId)
    {
        Optional<LoyaltyEntity> loyalty =  loyaltyRepository.findByUserId(userId);
        return loyalty;
    }

    @GetMapping("/loyaltyRewards/{tierNumber}")
     public List<LoyaltyRewardsEntity> getLoyaltyRewards(@PathVariable Integer tierNumber)
    {
        List<LoyaltyRewardsEntity> loyaltyRewards =  loyaltyRewardRepository.findByTierNumber(tierNumber);
        return loyaltyRewards;
    }

    @GetMapping("/loyaltyReward/{uniqueKey}")
    public Optional<LoyaltyRewardsEntity> getLoyaltyRewardClaim(@PathVariable Integer uniqueKey)
    {
        Optional<LoyaltyRewardsEntity> loyaltyRewardClaim =  loyaltyRewardRepository.findByUniqueKey(uniqueKey);
        return loyaltyRewardClaim;
    }

    @PutMapping("/loyalty/{points}/{userId}")
    public Integer updateLoyaltyPoints(@PathVariable Integer points, @PathVariable List<Integer> userId ){
        return loyaltyService.updatePoints(points,userId);
    }


     @GetMapping("/customerTotalMoneySpent/{userId}")
    public Optional<CustomerTotalMoneySpentEntity> getTotalSpent(@PathVariable Integer userId)
    {
        Optional<CustomerTotalMoneySpentEntity> customerTotalMoneySpent =  customerTotalMoneySpentRepository.findByUserId(userId);
        return customerTotalMoneySpent;
    }
    
    @PutMapping("/customerTotalMoneySpent/{totalSpending}/{userId}")
    public Integer updateTotalSpending(@PathVariable Integer totalSpending, @PathVariable List<Integer> userId ){
        return customerTotalMoneySpentService.updateTotalSpending(totalSpending,userId);
    }


    @PostMapping("register/discountPercentage")
    public ResponseEntity<?> registerUserDiscount(@RequestBody UserDiscountPercentageDTO userDiscountPercentageDTO){

        UserDiscountPercentageEntity userDiscountPercentageEntity = new UserDiscountPercentageEntity();
        userDiscountPercentageEntity.setUserId(userDiscountPercentageDTO.getUserId());
        userDiscountPercentageEntity.setPercentage(userDiscountPercentageDTO.getPercentage());

        userDiscountPercentageRepository.save(userDiscountPercentageEntity);

        return new ResponseEntity<>(userDiscountPercentageEntity, HttpStatus.OK);

    }

    @PostMapping("register/userLoyalty")
    public ResponseEntity<?> registerUserLoyalty(@RequestBody LoyaltyDTO loyaltyDTO){

        LoyaltyEntity loyaltyEntity = new LoyaltyEntity();
        loyaltyEntity.setUserId(loyaltyDTO.getUserId());
        loyaltyEntity.setPoints(loyaltyDTO.getPoints());

        loyaltyRepository.save(loyaltyEntity);

        return new ResponseEntity<>(loyaltyEntity, HttpStatus.OK);

    }

    //this will create table row for user that counts their total money spent
    @PostMapping("register/userTotalMoneySpent")
    public ResponseEntity<?> registerUserTotalMoneySpent(@RequestBody CustomerTotalMoneySpentDTO customerTotalMoneySpentDTO){

        CustomerTotalMoneySpentEntity customerTotalMoneySpentEntity = new CustomerTotalMoneySpentEntity();
        customerTotalMoneySpentEntity.setUserId(customerTotalMoneySpentDTO.getUserId());
        customerTotalMoneySpentEntity.setTotalSpending(customerTotalMoneySpentDTO.getTotalSpending());

        customerTotalMoneySpentRepository.save(customerTotalMoneySpentEntity);

        return new ResponseEntity<>(customerTotalMoneySpentEntity, HttpStatus.OK);

    }

     @GetMapping("/loyaltyTierList/{tierListId}")
    public Optional<LoyaltyTierListEntity> getLoyaltyTierList(@PathVariable Integer tierListId)
    {
        Optional<LoyaltyTierListEntity> loyaltyTierList =  loyaltyTierListRepository.findByTierListId(tierListId);
        return loyaltyTierList;
    }


    @GetMapping("/favorites/{userId}")
     public List<FavoritesEntity> getFavorite(@PathVariable Integer userId)
    {
        List<FavoritesEntity> favorite =  favoritesRepository.findByUserId(userId);
        return favorite;
    }

    @PostMapping("favorites/addFavorites") 
    public ResponseEntity<?> addFavorites(@RequestBody FavoritesDTO favoritesDTO){

        FavoritesEntity favoritesEntity = new FavoritesEntity();
        favoritesEntity.setUserId(favoritesDTO.getUserId());
        favoritesEntity.setVendingMachineId(favoritesDTO.getVendingMachineId());
        favoritesEntity.setLocationName(favoritesDTO.getLocationName());
        log.info("favorites Entity: ", favoritesEntity);
        favoritesRepository.save(favoritesEntity);

        return new ResponseEntity<>(favoritesEntity, HttpStatus.OK);

    }

    @DeleteMapping("/favorites/removeFavorites/{vendingMachineId}")
    public Integer deleteFavorite( @PathVariable List<String> vendingMachineId ){
        return favoritesService.deleteFavorite(vendingMachineId);
    }

    @GetMapping("/favorites/checkFavorite/{userId}/{vendingMachineId}")
     public Optional<FavoritesEntity> checkfavorite(@PathVariable Integer userId, @PathVariable String vendingMachineId)
    {
        Optional<FavoritesEntity> checkFavorite =  favoritesRepository.findByUserIdAndVendingMachineId(userId,vendingMachineId);
        return checkFavorite;
    }

    

}