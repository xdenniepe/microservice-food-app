package com.yokai.auth.service;

import java.io.IOException;
import java.text.DecimalFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Locale;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.yokai.auth.entity.User;
import com.yokai.core.dto.ReceiptDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    @Qualifier("email")
    @Autowired
    private TemplateEngine htmlTemplateEngine;

    @Value("${mail.server.from}")
    private String serverFrom;

    private String receiptDetails = "";

    public ResponseEntity<Object> sendForgotPasswordEmail(User user, Locale locale, String homeURL, String redirectURL, String code) throws MessagingException, IOException {
        log.info("SEND FORGOT PASSWORD EMAIL () BEGIN -- {}", serverFrom);
        log.info("Locale Variable: {}, User: {} [{}], HomeURL: {}, RedirectURL: {}, Code: {}", locale, user, user.getEmail(), homeURL, redirectURL, code);

        final Context context                 = new Context(locale);
        final MimeMessage mimeMessage         = this.mailSender.createMimeMessage();
        final MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
        final String emailSubject             = "Password Reset Request";

        context.setVariable("homeURL", homeURL);
        context.setVariable("title", emailSubject);
        context.setVariable("firstName", user.getFirstName());
        context.setVariable("lastName", user.getLastName());
        context.setVariable("contentBody1", "We have recently received a request for a password reset. Click the button below to continue.");
        context.setVariable("contentBody2", "If you didn't initiate this request, please ignore this email and password will not be changed.");
        context.setVariable("donotreply", "**Do not reply to this message. This is a system generated email.**");
        context.setVariable("redirectURL", (redirectURL + code + "?resendRequest=false"));
        context.setVariable("buttonLabel", "Click to Continue");
        context.setVariable("brand", "YokaiExpress");

        messageHelper.setSubject(emailSubject);
        messageHelper.setFrom(serverFrom);
        messageHelper.setTo(user.getEmail());

        log.info("SET HTML CONTENT");
        final String htmlContent = this.htmlTemplateEngine.process("templates/forgot-password", context);
        messageHelper.setText(htmlContent, true /* is HTML */);

        // SEND EMAIL
        HttpStatus status = null;
        try {
            log.info("SENDING EMAIL...");
            this.mailSender.send(mimeMessage);
            status = HttpStatus.OK;
            log.info("EMAIL SENT SUCCESSFULLY");
        } catch (Exception ex) {
            log.info("FAILED TO SEND EMAIL " + ex.getMessage());
            log.info("{}", ex);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        log.info("SEND FORGOT PASSWORD EMAIL () END");
        return new ResponseEntity<>(status);
    }

    public ResponseEntity<Object> sendForgotPasswordEmailJp(User user, Locale locale, String homeURL, String redirectURL, String code) throws MessagingException, IOException {
        log.info("SEND FORGOT PASSWORD EMAIL () BEGIN -- {}", serverFrom);
        log.info("Locale Variable: {}, User: {} [{}], HomeURL: {}, RedirectURL: {}, Code: {}", locale, user, user.getEmail(), homeURL, redirectURL, code);

        final Context context                 = new Context(locale);
        final MimeMessage mimeMessage         = this.mailSender.createMimeMessage();
        final MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
        final String emailSubject             = "パスワード再設定リクエスト";

        context.setVariable("homeURL", homeURL);
        context.setVariable("title", emailSubject);
        context.setVariable("firstName", user.getFirstName());
        context.setVariable("lastName", user.getLastName());
        context.setVariable("contentBody1", "最近、パスワードの再設定依頼がありました。以下のボタンをクリックして、次に進んでください。");
        context.setVariable("contentBody2", "もし、あなたがこの要求を開始しなかった場合、このメールを無視してください、パスワードは変更されません。");
        context.setVariable("donotreply", "**このメッセージには返信しないでください。このメールはシステムで生成されたものです。**");
        context.setVariable("redirectURL", (redirectURL + code + "?resendRequest=false"));
        context.setVariable("buttonLabel", "クリックで続行");
        context.setVariable("brand", "YokaiExpress");

        messageHelper.setSubject(emailSubject);
        messageHelper.setFrom(serverFrom);
        messageHelper.setTo(user.getEmail());

        log.info("SET HTML CONTENT");
        final String htmlContent = this.htmlTemplateEngine.process("templates/forgot-password", context);
        messageHelper.setText(htmlContent, true /* is HTML */);

        // SEND EMAIL
        HttpStatus status = null;
        try {
            log.info("SENDING EMAIL...");
            this.mailSender.send(mimeMessage);
            status = HttpStatus.OK;
            log.info("EMAIL SENT SUCCESSFULLY");
        } catch (Exception ex) {
            log.info("FAILED TO SEND EMAIL " + ex.getMessage());
            log.info("{}", ex);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        log.info("SEND FORGOT PASSWORD EMAIL () END");
        return new ResponseEntity<>(status);
    }

    public ResponseEntity<Object> sendEmailVerificationEmail(User user, Locale locale, String homeURL, String redirectURL, String code) throws MessagingException, IOException {
        log.info("SEND EMAIL VERIFICATION EMAIL () BEGIN -- {}", serverFrom);
        log.info("Locale Variable: {}, User: {} [{}], HomeURL: {}, RedirectURL: {}, Code: {}", locale, user, user.getEmail(), homeURL, redirectURL, code);

        final Context context                 = new Context(locale);
        final MimeMessage mimeMessage         = this.mailSender.createMimeMessage();
        final MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
        final String emailSubject             = "Email Confirmation";

        context.setVariable("homeURL", homeURL);
        context.setVariable("hi", "hi");
        context.setVariable("title", emailSubject);
        context.setVariable("firstName", user.getFirstName());
        context.setVariable("lastName", user.getLastName());
        context.setVariable("contentBody1", "In order to start using your Yo-Kai Express account, please confirm your email address by clicking on the button below.");
        context.setVariable("redirectURL", (redirectURL + code));
        context.setVariable("buttonLabel", "Verify Email Address");
        context.setVariable("brand", "YokaiExpress");
        context.setVariable("donotreply", "**Do not reply to this message. This is a system generated email.**");

        messageHelper.setSubject(emailSubject);
        messageHelper.setFrom(serverFrom);
        messageHelper.setTo(user.getEmail());

        log.info("SET HTML CONTENT");
        final String htmlContent = this.htmlTemplateEngine.process("templates/email-verification", context);
        messageHelper.setText(htmlContent, true /* is HTML */);

        // SEND EMAIL
        HttpStatus status = null;
        try {
            log.info("SENDING EMAIL...");
            this.mailSender.send(mimeMessage);
            status = HttpStatus.OK;
            log.info("EMAIL SENT SUCCESSFULLY");
        } catch (Exception ex) {
            log.info("FAILED TO SEND EMAIL " + ex.getMessage());
            log.info("{}", ex);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        log.info("SEND EMAIL VERIFICATION EMAIL () END");
        return new ResponseEntity<>(status);
    }

    public ResponseEntity<Object> sendEmailVerificationEmailJp(User user, Locale locale, String homeURL, String redirectURL, String code) throws MessagingException, IOException {
        log.info("SEND EMAIL VERIFICATION EMAIL () BEGIN -- {}", serverFrom);
        log.info("Locale Variable: {}, User: {} [{}], HomeURL: {}, RedirectURL: {}, Code: {}", locale, user, user.getEmail(), homeURL, redirectURL, code);

        final Context context                 = new Context(locale);
        final MimeMessage mimeMessage         = this.mailSender.createMimeMessage();
        final MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
        final String emailSubject             = "確認メール";

        context.setVariable("homeURL", homeURL);
        context.setVariable("hi", "やほー");
        context.setVariable("title", emailSubject);
        context.setVariable("firstName", user.getFirstName());
        context.setVariable("lastName", user.getLastName());
        context.setVariable("contentBody1", "Yo-Kai Expressアカウントの利用を開始するために、以下のボタンからメールアドレスの確認をお願いします。");
        context.setVariable("redirectURL", (redirectURL + code));
        context.setVariable("buttonLabel", "メールアドレスの確認");
        context.setVariable("brand", "YokaiExpress");
        context.setVariable("donotreply", "**このメッセージには返信しないでください。このメールはシステムで生成されたものです。**");


        messageHelper.setSubject(emailSubject);
        messageHelper.setFrom(serverFrom);
        messageHelper.setTo(user.getEmail());

        log.info("SET HTML CONTENT");
        final String htmlContent = this.htmlTemplateEngine.process("templates/email-verification", context);
        messageHelper.setText(htmlContent, true /* is HTML */);

        // SEND EMAIL
        HttpStatus status = null;
        try {
            log.info("SENDING EMAIL...");
            this.mailSender.send(mimeMessage);
            status = HttpStatus.OK;
            log.info("EMAIL SENT SUCCESSFULLY");
        } catch (Exception ex) {
            log.info("FAILED TO SEND EMAIL " + ex.getMessage());
            log.info("{}", ex);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        log.info("SEND EMAIL VERIFICATION EMAIL () END");
        return new ResponseEntity<>(status);
    }

    public ResponseEntity<Object> sendReceiptEmail(User user, Locale locale, ReceiptDTO receipt) throws MessagingException, IOException, NullPointerException{
        log.info("SEND RECEIPT EMAIL () BEGIN -- {}", serverFrom);
        log.info("Locale Variable: {}, User: {} [{}]", locale, user, user.getEmail());

        final Context context                 = new Context(locale);
        final MimeMessage mimeMessage         = this.mailSender.createMimeMessage();
        final MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
        final String accountType              = receipt.getInvoicePdf().getPaymentInfo().getPiAccountType().replace("_", " ");
        final String emailSubject             = "Enjoy your meal!";
        final DecimalFormat df                = new DecimalFormat("0.00");
        
        receiptDetails = "";
        
        receipt.getInvoicePdf().getItems().stream().forEach(item -> {
            log.info("this is the item: {}", item);
            receiptDetails = receiptDetails + addItem(item.getName(), df.format(item.getSubtotal()), item.getQuantity(), item.getDescription());
        });
      
        context.setVariable("date1", receipt.getInvoicePdf().getTransactionDate());
        context.setVariable("title", emailSubject);
        context.setVariable("firstName", user.getFirstName());
        context.setVariable("lastName", user.getLastName());
        context.setVariable("orderNo", receipt.getOrderId());
        context.setVariable("subtotal", receipt.getSubtotal());
        context.setVariable("brand", "YokaiExpress");
        context.setVariable("htmlReceiptDetails", receiptDetails);
        context.setVariable("accountType", accountType.substring(0, 1).toUpperCase() + accountType.substring(1));
        context.setVariable("receiptTaxes", df.format(receipt.getFees()));
        context.setVariable("receiptSubTotal", df.format(receipt.getSubtotal()));
        context.setVariable("receiptTotal", df.format(receipt.getTotal()));
        context.setVariable("hi", "Hi");
        context.setVariable("thanksfororder", "Thanks for your order through our app! Please review your payment details below.");
        context.setVariable("receipt1", "RECEIPT");
        context.setVariable("order", "Order");
        context.setVariable("orderdetail", "Order Detail");
        context.setVariable("ssubtotal", "SUBTOTAL");
        context.setVariable("taxes", "Taxes & Fees");
        context.setVariable("tootal", "TOTAL");
        context.setVariable("paid", "Paid with");
        context.setVariable("donotreply", "**Do not reply to this message. This is a system generated email.**");



        if (receipt.getInvoicePdf().getDiscount() != 0.0) {
            context.setVariable("receiptDiscount", addFinalItem(receipt.getInvoicePdf().getCoupon(), df.format(receipt.getInvoicePdf().getDiscount())));
            context.setVariable("receiptTotal", df.format(receipt.getTotal() - receipt.getInvoicePdf().getDiscount()));
        }
        
        // names.forEach(name -> System.out.println(name));

        log.info("attachment: {}", receipt.getInvoicePdf());

        messageHelper.setSubject(emailSubject);
        messageHelper.setFrom(serverFrom);
        messageHelper.setTo(user.getEmail());

        log.info("SET HTML CONTENT");
        final String htmlContent = this.htmlTemplateEngine.process("templates/invoice", context);
        messageHelper.setText(htmlContent, true /* is HTML */);

        // SEND EMAIL
        HttpStatus status = null;
        try {
            log.info("SENDING EMAIL...");
            this.mailSender.send(mimeMessage);
            status = HttpStatus.OK;
            log.info("EMAIL SENT SUCCESSFULLY");
        } catch (Exception ex) {
            log.info("FAILED TO SEND EMAIL " + ex.getMessage());
            log.info("{}", ex);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        log.info("SEND RECEIPT EMAIL () END");
        return new ResponseEntity<>(status);
    }

    public ResponseEntity<Object> sendReceiptEmailJp(User user, Locale locale, ReceiptDTO receipt) throws MessagingException, IOException, NullPointerException{
        log.info("SEND RECEIPT EMAIL () BEGIN -- {}", serverFrom);
        log.info("Locale Variable: {}, User: {} [{}]", locale, user, user.getEmail());

        final Context context                 = new Context(locale);
        final MimeMessage mimeMessage         = this.mailSender.createMimeMessage();
        final MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
        final String accountType              = receipt.getInvoicePdf().getPaymentInfo().getPiAccountType().replace("_", " ");
        final String emailSubject             = "お食事をお楽しみください。";
        final DecimalFormat df                = new DecimalFormat("0.00");
        
        receiptDetails = "";
        
        receipt.getInvoicePdf().getItems().stream().forEach(item -> {
            log.info("this is the item: {}", item);
            receiptDetails = receiptDetails + addItem(item.getName(), df.format(item.getSubtotal()), item.getQuantity(), item.getDescription());
        });
      
        context.setVariable("date1", receipt.getInvoicePdf().getTransactionDate());
        context.setVariable("title", emailSubject);
        context.setVariable("hi", "こんにちは。");
        context.setVariable("firstName", user.getFirstName());
        context.setVariable("thanksfororder", "この度は弊社アプリからご注文いただきありがとうございます。お支払いの詳細は下記をご確認ください。");
        context.setVariable("lastName", user.getLastName());
        context.setVariable("orderNo", receipt.getOrderId());
        context.setVariable("subtotal", receipt.getSubtotal());
        context.setVariable("brand", "YokaiExpress");
        context.setVariable("htmlReceiptDetails", receiptDetails);
        context.setVariable("accountType", accountType.substring(0, 1).toUpperCase() + accountType.substring(1));
        context.setVariable("receiptTaxes", df.format(receipt.getFees()));
        context.setVariable("receiptSubTotal", df.format(receipt.getSubtotal()));
        context.setVariable("receiptTotal", df.format(receipt.getTotal()));
        context.setVariable("receipt1", "レセプト");
        context.setVariable("order", "ご注文");
        context.setVariable("orderdetail", "注文詳細");
        context.setVariable("ssubtotal", "小計");
        context.setVariable("taxes", "税金と手数料");
        context.setVariable("tootal", "合計");
        context.setVariable("paid", "で支払われる。");
        context.setVariable("donotreply", "**このメッセージには返信しないでください。これはシステムで生成されたメールです。**");



        if (receipt.getInvoicePdf().getDiscount() != 0.0) {
            context.setVariable("receiptDiscount", addFinalItem(receipt.getInvoicePdf().getCoupon(), df.format(receipt.getInvoicePdf().getDiscount())));
            context.setVariable("receiptTotal", df.format(receipt.getTotal() - receipt.getInvoicePdf().getDiscount()));
        }
        
        // names.forEach(name -> System.out.println(name));

        log.info("attachment: {}", receipt.getInvoicePdf());

        messageHelper.setSubject(emailSubject);
        messageHelper.setFrom(serverFrom);
        messageHelper.setTo(user.getEmail());

        log.info("SET HTML CONTENT");
        final String htmlContent = this.htmlTemplateEngine.process("templates/invoice", context);
        messageHelper.setText(htmlContent, true /* is HTML */);

        // SEND EMAIL
        HttpStatus status = null;
        try {
            log.info("SENDING EMAIL...");
            this.mailSender.send(mimeMessage);
            status = HttpStatus.OK;
            log.info("EMAIL SENT SUCCESSFULLY");
        } catch (Exception ex) {
            log.info("FAILED TO SEND EMAIL " + ex.getMessage());
            log.info("{}", ex);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        log.info("SEND RECEIPT EMAIL () END");
        return new ResponseEntity<>(status);
    }
    

    public String addItem(String product, String string, Integer quantity, String description) {
        return new StringBuilder()
            .append("<tr style='font-size: 12px;line-height:15px;' class='item'>")
            .append("<td style='width: 75%;opacity: 0.6;padding-left: 10px;'>")
            .append("<span style='font-weight: 800; padding-right: 4px;'>")
            .append(quantity)
            .append("</span>")
            .append(product)
            .append("<br /><span style='padding-left: 15px;'> (")
            .append(description)
            .append(") </td>")
            .append("<td style='width: 25%; text-align: right; font-weight:400;'>")
            .append(string)
            .append(" USD</td>")
            .append("</tr>")
        .toString();

        // <tr class="item">
        //     <td style="width: 75%; text-align: left;">
        //         <span style="font-weight: 400px; padding-right: 4px;">1</span>
        //         Korean Seafood Jjampong <br />
        //         <span style="padding-left: 15px;">(Pork Bone Broth)</span>
        //     </td>
        //     <td style="width: 25%; text-align: right;">$14.00</td>
        // </tr>
    }


    public String addFinalItem(String discount, String price) {
        return new StringBuilder()
            .append("<tr style='font-size: 12px;'>")
            .append("<td style='width: 75%;opacity: 0.6;padding-left: 10px;'>")
            .append(discount)
            .append("</td>")
            .append("<td style='width: 25%; text-align: right;font-weight:400;'> -")
            .append(price)
            .append(" USD</td>")
            .append("</tr>")
        .toString();
    }
    public ResponseEntity<Object> sendTwoFactorAuthCode(User user, Locale locale) throws MessagingException, IOException {
        log.info("SEND EMAIL VERIFICATION EMAIL () BEGIN -- {}", serverFrom);
        log.info("Locale Variable: {}, User: {} [{}]", locale, user.getEmail());

        final Context context                 = new Context(locale);
        final MimeMessage mimeMessage         = this.mailSender.createMimeMessage();
        final MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
        final String emailSubject             = "Yo-Kai Sign In Account Verification";

        Long timestamp = user.getOtpRequestTime();

        String date =
                Instant.ofEpochSecond(Long.valueOf(timestamp)).atZone(ZoneId.systemDefault())
                .format(DateTimeFormatter.ofPattern("MMMM dd YYYY, HH:mm:ss"));

        context.setVariable("title", emailSubject);
        context.setVariable("contentHeader", "Hi Valued Customer,");
        context.setVariable("otp", user.getOneTimePassword());
        context.setVariable("date_requested", date);
        context.setVariable("contentBody1", "If you did not attempt to login your account, please ignore this message.");
        context.setVariable("header1", "Please see your verification code requested  last");
        context.setVariable("header2", "below. Do not share it with anyone.");
        context.setVariable("donotreply", "**Do not reply to this message. This is a system generated email.**");

        messageHelper.setSubject(emailSubject);
        messageHelper.setFrom(serverFrom);
        messageHelper.setTo(user.getEmail());

        log.info("SET HTML CONTENT");
        final String htmlContent = this.htmlTemplateEngine.process("templates/two-factor", context);
        messageHelper.setText(htmlContent, true );

        
        HttpStatus status = null;
        try {
            log.info("SENDING EMAIL...");
            this.mailSender.send(mimeMessage);
            status = HttpStatus.OK;
            log.info("EMAIL SENT SUCCESSFULLY");
        } catch (Exception ex) {
            log.info("FAILED TO SEND EMAIL " + ex.getMessage());
            log.info("{}", ex);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        log.info("SEND EMAIL VERIFICATION EMAIL () END");
        return new ResponseEntity<>(status);
    }

    public ResponseEntity<Object> sendTwoFactorAuthCodeJp(User user, Locale locale) throws MessagingException, IOException {
        log.info("SEND EMAIL VERIFICATION EMAIL () BEGIN -- {}", serverFrom);
        log.info("Locale Variable: {}, User: {} [{}]", locale, user.getEmail());

        final Context context                 = new Context(locale);
        final MimeMessage mimeMessage         = this.mailSender.createMimeMessage();
        final MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
        final String emailSubject             = "妖怪サインイン アカウント認証";

        Long timestamp = user.getOtpRequestTime();

        String date =
                Instant.ofEpochSecond(Long.valueOf(timestamp)).atZone(ZoneId.systemDefault())
                .format(DateTimeFormatter.ofPattern("MMMM dd YYYY, HH:mm:ss"));

        context.setVariable("title", emailSubject);
        context.setVariable("contentHeader", "大切なお客様へ,");
        context.setVariable("otp", user.getOneTimePassword());
        context.setVariable("date_requested", date);
        context.setVariable("contentBody1", "アカウントにログインしようとしなかった場合、このメッセージは無視してください。");
        context.setVariable("header1", "最後に要求された認証コードをご覧ください。");
        context.setVariable("header2", "の下にあります。誰にも教えないでください。");
        context.setVariable("donotreply", "**このメッセージには返信しないでください。このメールはシステムで生成されたものです。**");




        messageHelper.setSubject(emailSubject);
        messageHelper.setFrom(serverFrom);
        messageHelper.setTo(user.getEmail());

        log.info("SET HTML CONTENT");
        final String htmlContent = this.htmlTemplateEngine.process("templates/two-factor", context);
        messageHelper.setText(htmlContent, true );

        
        HttpStatus status = null;
        try {
            log.info("SENDING EMAIL...");
            this.mailSender.send(mimeMessage);
            status = HttpStatus.OK;
            log.info("EMAIL SENT SUCCESSFULLY");
        } catch (Exception ex) {
            log.info("FAILED TO SEND EMAIL " + ex.getMessage());
            log.info("{}", ex);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        log.info("SEND EMAIL VERIFICATION EMAIL () END");
        return new ResponseEntity<>(status);
    }
}