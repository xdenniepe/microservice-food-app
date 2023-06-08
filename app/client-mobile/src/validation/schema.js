import * as Yup from 'yup';
import { allRegex, phoneRegex, INVALID_CODE, INVALID_EMAIL, INVALID_PASSWORD, PASSWORD_NOT_MATCH, REQUIRED_FIELD, INVALID_PHONE, INVALID_CCNAME, INVALID_CCNUMBER, INVALID_EXPIRYDATE, INVALID_CVV, EXPIRED_CARD } from '../utility/constants';
import valid from 'card-validator';

export const authSchema = Yup.object({
        email: Yup.string()
                .email(INVALID_EMAIL)
                .required(REQUIRED_FIELD),
        password: Yup.string()
                .required(REQUIRED_FIELD),
});

export const signupSchema = Yup.object({
        firstName: Yup.string()
                .trim()
                .matches(/^\s*\S[\s\S]*$/, 'First name cannot be only spaces') 
                .required(REQUIRED_FIELD),
        lastName: Yup.string()
                .trim()
                .matches(/^\s*\S[\s\S]*$/, 'Last name cannot be only spaces') 
                .required(REQUIRED_FIELD),
        email: Yup.string()
                .email(INVALID_EMAIL)
                .required(REQUIRED_FIELD),
        password: Yup.string()
                .matches(allRegex, INVALID_PASSWORD)
                .required(REQUIRED_FIELD),
        confirmPassword: Yup.string()
                .when("password", {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                                [Yup.ref("password")],
                                PASSWORD_NOT_MATCH
                        ),
                })
                .required(REQUIRED_FIELD),
        refCode: Yup.string()
});

export const forgotPasswordSchema = Yup.object({
        email: Yup.string()
                .email(INVALID_EMAIL)
                .required(REQUIRED_FIELD),
        phone: Yup.string()
                .matches(phoneRegex, INVALID_PHONE)
                .nullable(),
});

export const resetSchema = Yup.object({
        password: Yup.string()
                .matches(allRegex, INVALID_PASSWORD)
                .required(REQUIRED_FIELD),
        confirmPassword: Yup.string()
                .when("password", {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                                [Yup.ref("password")],
                                PASSWORD_NOT_MATCH
                        ),
                })
                .required(REQUIRED_FIELD)
});

export const resetCodeSchema = Yup.object({
        code: Yup.number().test(
                "code",
                INVALID_CODE,
                (number) => String(number).length === 7
        )
});

export const editProfileSchema = Yup.object({
        firstName: Yup.string()
                .matches(/^\s*\S[\s\S]*$/, 'First name cannot be only spaces') 
                .trim()
                .required(REQUIRED_FIELD),
        lastName: Yup.string()
                .matches(/^\s*\S[\s\S]*$/, 'Last name cannot be only spaces')                
                .trim()
                .required(REQUIRED_FIELD),
        password: Yup.string()
                .matches(allRegex, INVALID_PASSWORD),
        confirmPassword: Yup.string()
                .when("password", {
                        is: (val) => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                                [Yup.ref("password")],
                                PASSWORD_NOT_MATCH
                        ),
                }),
})

export const creditCardSchema = Yup.object({
        // TODO: UPDATE CREDIT CARD SCHEMA
        ccName: Yup.string()
                .required(REQUIRED_FIELD)
                .matches(
                        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                        INVALID_CCNAME
                        ),
        ccNumber: Yup.string()
                .required(REQUIRED_FIELD)
                .test('test-cvv', 
                        INVALID_CCNUMBER, 
                        value => valid.number(value).isValid), 
        ccExpirationDate: Yup.string()
                .required(REQUIRED_FIELD)
                .test(
                        'test-credit-card-expiration-date',
                        EXPIRED_CARD,
                        expirationDate => {
                          if (!expirationDate) {
                            return false
                          }
                    
                          const today = new Date()
                          const monthToday = today.getMonth() + 1
                          const yearToday = today
                            .getFullYear()
                            .toString()
                            .substr(-2)
                    
                          const [expMonth, expYear] = expirationDate.split('/')
                    
                          if (Number(expYear) < Number(yearToday)) {
                            return false
                          } else if (
                            Number(expMonth) < monthToday &&
                            Number(expYear) <= Number(yearToday)
                          ) {
                            return false
                          }
                    
                          return true
                        }
                      )
                      .test('test-cvv', 
                        INVALID_EXPIRYDATE, 
                        value => valid.expirationDate(value).isValid) ,
        ccCVV: Yup.string()
                .required(REQUIRED_FIELD)
                .test('test-cvv', 
                        INVALID_CVV, 
                        value => valid.cvv(value).isValid) 
})

export const accountDeletionFeedbackSchema = Yup.object({
        name: Yup.string(),
                // .required(REQUIRED_FIELD),
        email: Yup.string()
                .email(INVALID_EMAIL)
                .required(REQUIRED_FIELD),
        description: Yup.string()
                .max(250)
                .trim(),
        reason: Yup.string()
                .required(REQUIRED_FIELD),
        
})