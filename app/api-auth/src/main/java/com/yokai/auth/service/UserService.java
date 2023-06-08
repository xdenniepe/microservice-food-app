package com.yokai.auth.service;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;
import java.util.Random;
import java.util.List;
import java.util.Date;

import com.yokai.auth.dto.EmailVerificationDTO;
import com.yokai.auth.dto.NewPasswordDTO;
import com.yokai.auth.entity.User;
import com.yokai.auth.entity.Verification;
import com.yokai.auth.repository.UserRepository;
import com.yokai.auth.utility.Constants;
import com.yokai.core.dto.UserDTO;
import com.yokai.core.dto.ExternalLoginDTO;
import com.yokai.auth.entity.ExternalLogin;
import com.yokai.auth.repository.ExternalLoginRepository;
import com.yokai.auth.repository.VerificationRepository;

import com.yokai.core.utility.Utility;
import org.dozer.DozerBeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.core.userdetails.UserDetailsResourceFactoryBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.EnableScheduling;

import lombok.extern.slf4j.Slf4j;

import javax.mail.MessagingException;

@Service
@EnableScheduling
@Slf4j
public class UserService {

	@Autowired
	private UserRepository userRepository;
    @Autowired
	private VerificationRepository verificationRepository;
    @Autowired
    private ExternalLoginRepository externalLoginRepository;
    @Autowired
    private TwilioService twilioService;
    @Autowired
    private EmailService emailService;
    @Autowired
    VerificationService verificationService;
    @Autowired
    private BCryptPasswordEncoder encryptPassword;
    private Long unixTime = Instant.now().getEpochSecond();
    private int now = unixTime.intValue();
    private LocalDateTime expiration = LocalDateTime.now().plusMinutes(5);

  private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final DozerBeanMapper dozer;

	@Autowired
	public UserService() {
		this.dozer = new DozerBeanMapper();
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
	}

  public User register(UserDTO dto) {
      Optional<User> userExists = userRepository.findByEmail(dto.getEmail());

      if (userExists.isPresent()) {
          User user = dozer.map(userExists.get(), User.class);

          if ("ACT".equals(userExists.get().getStatus())) {
              log.error("Email Already Exists: {}", dto.getEmail());
              throw new IllegalStateException("Email Already Exists!");

          } 
          
          if ("INA".equals(userExists.get().getStatus())){

            user.setFirstName(dto.getFirstName());
            user.setLastName(dto.getLastName());
            user.setBirthday(dto.getBirthday());
            user.setGender(dto.getGender());
            user.setPhoneNumber(dto.getPhoneNumber());
            user.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
            user.setStatus("INA");
          }

              return userRepository.save(user);

      } else {
          User user = dozer.map(dto, User.class);
          user.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
          user.setStatus("INA");

          return userRepository.save(user);
      }
  }

	public User updateUser(User user) {
		return userRepository.save(user);
	}

    public ExternalLogin updateExternal(ExternalLogin externalLogin) {
		return externalLoginRepository.save(externalLogin);
	}


	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public Optional<User> findByUserId(Integer userId) {
		return userRepository.findByUserId(userId);
	}

    public Optional<User> findByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber);
    }

    public Optional<ExternalLogin> findBySub(String sub) {
		return externalLoginRepository.findBySub(sub);
	}

    public Optional<Verification> findByVerificationUserId(Integer userId) {
		return verificationRepository.findByUserId(userId);
	}

    public Optional<ExternalLogin> findByExternalUserId(Integer userId) {
		return externalLoginRepository.findByUserId(userId);
	}

    public Optional<Verification> findByCode(String code) {
		return verificationRepository.findByCode(code);
	}

    public User updateUserProfile(UserDTO userData) {
        User existingUser = userRepository.findByEmail(userData.getEmail()).get();
        User user = dozer.map(existingUser, User.class);
    
        user.setFirstName(userData.getFirstName());
        user.setLastName(userData.getLastName());
        user.setPhoneNumber(userData.getPhoneNumber());
        user.setBirthday(userData.getBirthday());
        user.setGender(userData.getGender());
        
        try {
            if (!userData.getPassword().isBlank()) {
                user.setPassword(bCryptPasswordEncoder.encode(userData.getPassword()));
            }
        } catch (Exception e) {
            log.info("Error : {}", e);
        }
        
		return userRepository.save(user);
    }

    public ResponseEntity<User> verifyGuestUser (User request) {
        User user = findByUserId(request.getUserId()).orElse(null); 

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setStatus("ACT");
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setCheckPass(request.getCheckPass());
        log.info("Creating guest user with {}", request);

        updateUser(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    public ResponseEntity<String> verifyUser (EmailVerificationDTO request)
                                            throws MessagingException, IOException {
        log.info("Sending Email Confirmation {}", request.getEmail());

        String     [] baseURL  = request.getBaseUrl().split("/");
        boolean    isLocal     = baseURL[2].contains(Constants.LOCALHOST);
        String     homeURL     = (isLocal ? Constants.URL_PROTOCOL_UNSECURED : Constants.URL_PROTOCOL_SECURED) + baseURL[2];
        String     redirectURL = (isLocal ? Constants.URL_PROTOCOL_UNSECURED : Constants.URL_PROTOCOL_SECURED) + baseURL[2] + Constants.EMAIL_VERIFIED_URI;
        Locale locale      = new Locale.Builder().setLanguage("en").setRegion("US").build();
        User       yokaiUser      = findByEmail(request.getEmail()).get();
        String     code        = generateCode(yokaiUser.getUserId(), Constants.EMAIL_VERIFICATION_REQUEST, "email");

        log.info("Sending to EmailService: {}, {}, {}, {}, {}", request.getEmail());
        emailService.sendEmailVerificationEmail(yokaiUser, locale, homeURL, redirectURL, code);

        

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<String> verifyUserJp (EmailVerificationDTO request)
                                            throws MessagingException, IOException {
        log.info("Sending Email Confirmation {}", request.getEmail());

        String     [] baseURL  = request.getBaseUrl().split("/");
        boolean    isLocal     = baseURL[2].contains(Constants.LOCALHOST);
        String     homeURL     = (isLocal ? Constants.URL_PROTOCOL_UNSECURED : Constants.URL_PROTOCOL_SECURED) + baseURL[2];
        String     redirectURL = (isLocal ? Constants.URL_PROTOCOL_UNSECURED : Constants.URL_PROTOCOL_SECURED) + baseURL[2] + Constants.EMAIL_VERIFIED_URI;
        Locale locale      = new Locale.Builder().setLanguage("en").setRegion("US").build();
        User       yokaiUser      = findByEmail(request.getEmail()).get();
        String     code        = generateCode(yokaiUser.getUserId(), Constants.EMAIL_VERIFICATION_REQUEST, "email");

        log.info("Sending to EmailService: {}, {}, {}, {}, {}", request.getEmail());
        emailService.sendEmailVerificationEmailJp(yokaiUser, locale, homeURL, redirectURL, code);

        return new ResponseEntity<>(HttpStatus.OK);
    }



    public ResponseEntity<String> verifyCode (String code) {
        HttpStatus status = null;
        Long unixTime = Instant.now().getEpochSecond();
        int now_current = unixTime.intValue();
        if (verificationService.findByCode(code).isPresent()) {
            Verification verification = verificationService.findByCode(code).get();
            User user = findByUserId(verification.getUserId()).get();
            User tmpUser = findByUserId(verification.getUserId()).get();

            if(verification.getStatus().equals(Constants.INACTIVE_CODE)) {
                log.info("INACTIVE CODE");
                if (now_current < verification.getExpiration()) {
                    status = HttpStatus.NOT_FOUND;
                } else {
                    status = HttpStatus.BAD_REQUEST;
                }
            }
            else {
                if (now_current >= verification.getExpiration()) {
                    status = HttpStatus.BAD_REQUEST;
                } else {
                    verification.setStatus(Constants.INACTIVE_CODE);
                    verification.setWhoUpdated(user.getUserId());
                    user.setWhoUpdated(user.getUserId());
                    user.setStatus("ACT");

                    verificationService.setVerification(verification);
                    updateUser(user);

                    log.info("USER: ", tmpUser);
                        log.info("USER EMAIL : ",tmpUser.getEmail());
                        log.info("USE STATUS : ", tmpUser.getStatus());
                        log.info("userRepository.findEmailFromWeb(tmpUser.getEmail()) : ".toUpperCase(),userRepository.findEmailFromWeb(tmpUser.getEmail()));
                    if(user.getStatus().equals("ACT"))
                    {
                        if(userRepository.findEmailFromWeb(tmpUser.getEmail()) > 0){
                            
                            log.info("EMAIL EXIST IN WEB");
                            userRepository.updateUserInfoWeb(tmpUser.getEmail(),tmpUser.getPassword(), tmpUser.getFirstName(), tmpUser.getLastName());
                            log.info("USER UPDATED!");
                        }
                        else
                        {
                            log.info("INSERTING RECORD TO WEB");
                            userRepository.insertUserToWeb(tmpUser.getEmail(), tmpUser.getPassword(), tmpUser.getFirstName(), tmpUser.getLastName(), "ACT");
                        }
                    }
    
                    status = HttpStatus.OK;
                }
            }
        } else {

            log.info("CODE DOES NOT EXISTS");
            status = HttpStatus.NOT_FOUND;

        }

        return new ResponseEntity<>(status);
    }

    public HttpStatus forgotPasswordRequest (EmailVerificationDTO request) throws MessagingException, IOException {
        String[] baseURL = request.getBaseUrl().split("/");
        log.info("Email: {}", request.getEmail());
        log.info("Phone Number: {}", request.getPhoneNumber());
        log.info("BaseURL: {}", baseURL[2]);
        
        Optional<User> emailUser = findByEmail(request.getEmail());
        Optional<User> phoneUser = Optional.empty(); // userService.findByPhoneNumber(request.getPhoneNumber());
        HttpStatus status = null;
        boolean isValidDNS = false;

        if (baseURL[2].equals(Constants.LOCAL_BASE_URL)) {
            isValidDNS = true;
            log.info("This is valid DNS");
        }

        if (emailUser.isPresent()) {
            log.info("emailUser is present");
            // TODO: Remove this Host Address for TST (in Prod Env)
            boolean isLocal = baseURL[2].contains(Constants.LOCALHOST) || baseURL[2].contains("tappyokai.hoolisoftware.com");
            String homeURL = (isLocal ? Constants.URL_PROTOCOL_UNSECURED : Constants.URL_PROTOCOL_SECURED)
                    + baseURL[2];
            String redirectURL = (isLocal ? Constants.URL_PROTOCOL_UNSECURED : Constants.URL_PROTOCOL_SECURED)
                    + baseURL[2] + Constants.NEW_PASSWORD_URI;
            Locale locale = new Locale.Builder().setLanguage("en").setRegion("US").build();
            User yokaiUser = emailUser.get();
            String code = generateCode(yokaiUser.getUserId(), Constants.FORGOT_PASSWORD_REQUEST, "email");

            log.info("Sending to EmailService: {}, {}, {}, {}, {}", yokaiUser, locale, homeURL, redirectURL, code);
            emailService.sendForgotPasswordEmail(yokaiUser, locale, homeURL, redirectURL, code);

            status = HttpStatus.OK;

        } else if (phoneUser.isPresent()) {
            User yokaiUser = phoneUser.get();
            String code = generateCode(yokaiUser.getUserId(), Constants.FORGOT_PASSWORD_REQUEST, "phone");

            status = sendForgotPasswordSMS(code, phoneUser);

        } else {
            status = HttpStatus.BAD_REQUEST;
        }

        log.info("email user - status: {}", status);

        return status;

    }

    public HttpStatus forgotPasswordRequestJp (EmailVerificationDTO request) throws MessagingException, IOException {
        String[] baseURL = request.getBaseUrl().split("/");
        log.info("Email: {}", request.getEmail());
        log.info("Phone Number: {}", request.getPhoneNumber());
        log.info("BaseURL: {}", baseURL[2]);
        
        Optional<User> emailUser = findByEmail(request.getEmail());
        Optional<User> phoneUser = Optional.empty(); // userService.findByPhoneNumber(request.getPhoneNumber());
        HttpStatus status = null;
        boolean isValidDNS = false;

        if (baseURL[2].equals(Constants.LOCAL_BASE_URL)) {
            isValidDNS = true;
            log.info("This is valid DNS");
        }

        if (emailUser.isPresent()) {
            log.info("emailUser is present");
            // TODO: Remove this Host Address for TST (in Prod Env)
            boolean isLocal = baseURL[2].contains(Constants.LOCALHOST) || baseURL[2].contains("tappyokai.hoolisoftware.com");
            String homeURL = (isLocal ? Constants.URL_PROTOCOL_UNSECURED : Constants.URL_PROTOCOL_SECURED)
                    + baseURL[2];
            String redirectURL = (isLocal ? Constants.URL_PROTOCOL_UNSECURED : Constants.URL_PROTOCOL_SECURED)
                    + baseURL[2] + Constants.NEW_PASSWORD_URI;
            Locale locale = new Locale.Builder().setLanguage("en").setRegion("US").build();
            User yokaiUser = emailUser.get();
            String code = generateCode(yokaiUser.getUserId(), Constants.FORGOT_PASSWORD_REQUEST, "email");

            log.info("Sending to EmailService: {}, {}, {}, {}, {}", yokaiUser, locale, homeURL, redirectURL, code);
            emailService.sendForgotPasswordEmailJp(yokaiUser, locale, homeURL, redirectURL, code);

            status = HttpStatus.OK;

        } else if (phoneUser.isPresent()) {
            User yokaiUser = phoneUser.get();
            String code = generateCode(yokaiUser.getUserId(), Constants.FORGOT_PASSWORD_REQUEST, "phone");

            status = sendForgotPasswordSMS(code, phoneUser);

        } else {
            status = HttpStatus.BAD_REQUEST;
        }

        log.info("email user - status: {}", status);

        return status;

    }
    private HttpStatus sendForgotPasswordSMS(String code, Optional<User> user) {

        try {
            log.info("Sending to TwilioService : To - {}, code - {}", user.get().getPhoneNumber(), code);
            twilioService.sendTextMessage("Verification Code is " + code, "+" + user.get().getPhoneNumber());
            return HttpStatus.OK;
        } catch (Exception e) {
            log.info("Error : {}", e);
            return HttpStatus.BAD_REQUEST;
        }

    }

    public HttpStatus updateUserPassword (NewPasswordDTO request) {
        log.info("updateUserPassword() begin");

        HttpStatus status = null;

        if (verificationService.findByCode(request.getCode()).isPresent()) {
            log.info("Verification Code: " + request.getCode());

            Verification verification = verificationService.findByCode(request.getCode()).get();
            User user = findByUserId(verification.getUserId()).get();

            verification.setStatus(Constants.INACTIVE_CODE);
            verification.setWhoUpdated(user.getUserId());
            user.setPassword(encryptPassword.encode(request.getNewPassword()));

            verificationService.setVerification(verification);
            updateUser(user);

            status = HttpStatus.OK;

        } else {
            status = HttpStatus.BAD_REQUEST;
        }

        log.info("updateUserPassword() end");

        return status;

    }

    public HttpStatus createNewPassword (String code, boolean resendRequest) {

        HttpStatus status = null;
        Long unixTime = Instant.now().getEpochSecond();
        int now_current = unixTime.intValue();

        if (verificationService.findByCode(code).isPresent()) {
            Verification verification = verificationService.findByCode(code).get();

            log.info("Code: " + verification.getCode());
            log.info("Resend Request: " + resendRequest);
            log.info("STATUS: " + verification.getStatus());

            if (resendRequest) {
                log.info("RESEND REQUEST: true");
                Optional<User> optUser = findByUserId(verification.getUserId());
                if (optUser.isPresent()) {
                    User user = optUser.get();
                    log.info("PHONE NUMBER: " + user.getPhoneNumber());
                    if (verification.getStatus().equals(Constants.ACTIVE_CODE)) {
                        verification.setStatus(Constants.INACTIVE_CODE);
                        verificationService.setVerification(verification);
                    }
                    String newCode = generateCode(user.getUserId(), Constants.FORGOT_PASSWORD_REQUEST, "phone");
                    status = sendForgotPasswordSMS(newCode, optUser);

                } else {
                    log.info("USER DOES NOT EXISTS");
                    status = HttpStatus.NOT_FOUND;
                }
            } else {
                if (verification.getStatus().equals(Constants.INACTIVE_CODE)) {
                    log.info("INACTIVE CODE");
                    if (now_current < verification.getExpiration()) {
                        status = HttpStatus.NOT_FOUND;
                    } else {
                        status = HttpStatus.BAD_REQUEST;
                    }
                } else {
                    if (now_current >= verification.getExpiration()) {
                        status = HttpStatus.BAD_REQUEST;
                    } else {
                        status = HttpStatus.OK;
                    }
                }
            }
        } else {

            log.info("CODE DOES NOT EXISTS");
            status = HttpStatus.NOT_FOUND;

        }

        return status;
    }

    public String generateCode(Integer userId, String requestType, String method) {
        Long unixTime = Instant.now().getEpochSecond();
        Long expirationForVerfication = unixTime + 1800;
        int now_current = unixTime.intValue();
        Verification verification = new Verification();
        String code = "";


        Optional<Verification> user = verificationService.findByUserIdAndStatus(userId, Constants.ACTIVE_CODE);

        if (user.isPresent()) {
            verification = user.get();
            verification.setType(requestType);
            verification.setWhoUpdated(userId);
            if (user.get().getExpiration() < now_current) {
                verification.setExpiration(expirationForVerfication);
                verification.setStatus(Constants.ACTIVE_CODE);

                if ("phone".equals(method)) {
                    verification.setCode(getRandomNumberString());
                } else {
                    verification.setCode(Utility.generateUUID());
                }

                verificationService.setVerification(verification);
            } else {
                verification.setStatus(Constants.INACTIVE_CODE);
                verificationService.setVerification(verification);
                addVerification(verification, expirationForVerfication, requestType, userId, method);
            }
        } else {
            addVerification(verification, expirationForVerfication, requestType, userId, method);
        }

        code = verification.getCode();
        return code;

    }

    private void addVerification(Verification verification, Long expirationForVerfication, String requestType,
                                 Integer userId, String method) {

        verification.setExpiration(expirationForVerfication);
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

    public User updateOtp(UserDTO userData) {
        Long unixTime   = Instant.now().getEpochSecond();
        User existingUser = userRepository.findByEmail(userData.getEmail()).get();
        User user = dozer.map(existingUser, User.class);


            user.setOneTimePassword(getRandomNumberString());
            user.setOtpRequestTime(unixTime);
            log.info("OTP SENT");



        return userRepository.save(user);
    }

    public User clearOtp(UserDTO userData) {
        User existingUser = userRepository.findByEmail(userData.getEmail()).get();
        User user = dozer.map(existingUser, User.class);

        user.setOneTimePassword(null);
        user.setOtpRequestTime(null);
        log.info("OTP CLEARED");

        return userRepository.save(user);
    }



    public static String getRandomNumberString() {
        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        return String.format("%06d", number);
    }

    public ResponseEntity<User> deleteUser (User request) {
        User user = findByUserId(request.getUserId()).orElse(null);
        Long unixTime = Instant.now().getEpochSecond();
        Integer SixMonthsToSeconds = 15552000;
        Long expirationForUpdate = unixTime + SixMonthsToSeconds;

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setStatus(request.getStatus());
        user.setDateDeleted(expirationForUpdate);
        log.info("Creating guest user with {}", request);

        updateUser(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    public ExternalLogin updateExternalUser(ExternalLoginDTO externalDto) {
        ExternalLogin existingUser = externalLoginRepository.findByUserId(externalDto.getUserId()).get();
        ExternalLogin externalLogin = dozer.map(existingUser, ExternalLogin.class);
    
        externalLogin.setStatus(externalDto.getStatus());
        
		return externalLoginRepository.save(externalLogin);
    }
 
    public int updateExternalState(String status,Long dateDeleted, List<Integer> userId){
        return externalLoginRepository.updateExternalUsers(status, dateDeleted, userId);
    }

    public int updateVerificationState(Long dateDeleted, List<Integer> userId){
        return verificationRepository.updateVerificationUsers(dateDeleted, userId);
    }

    @Scheduled(fixedRate=60*60*1000)
    public void myMethod() {
        Long unixTimeForDelete = Instant.now().getEpochSecond();
        userRepository.deleteByDateDeleted(unixTimeForDelete);
        externalLoginRepository.deleteByDateDeletedInExternal(unixTimeForDelete);
        verificationRepository.deleteByDateDeletedInVerification(unixTimeForDelete);    
    }

    

}
