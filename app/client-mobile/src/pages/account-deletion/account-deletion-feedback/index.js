import React, { useEffect, useRef, useState,useContext} from 'react'
import { CLASSES } from "../../../utility/classes";
import { autoCapitalize, getLocalStorageItem } from "../../../service/helper";
import { GET, POST, PUT } from "../../../utility/constants";
import { useFormik } from "formik";
import { Input, Textarea, SelectDropdown } from "../../../components/form";
import { Accountdeletionmodal } from "../../../components/modal";
import Checkbox from '@material-ui/core/Checkbox';
import api from "../../../service/api";
import { request } from "../../../service/request";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import SuccessDeletionModal from "../../../components/modal/success-deletion-modal";
import { accountDeletionFeedbackSchema } from "../../../validation/schema";
import { useTranslation } from "react-i18next";
import { Button } from '@material-ui/core';



const accountdeletionfeedback = (props) => {
    const { setHasLoaded, renderSr, toast} = props;
    const [isDialogHidden, setIsDialogHidden] = useState(true);
    const [delchecker, setDelChecker] = useState('');
    const { user }                             = useContext(AuthContext)?.state;
    const navigate                             = useNavigate();
    const userId = user.userId;
    const [checked, setChecked] = useState(false);
    const { t }= useTranslation(['deletion_feedback']);

    useEffect(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0)
    }, [])

    const initialValues = {
        name           : '',
        email          : '',
        reason         : '',
        description    : '',
        checkbox: false,
    }
 

    const handleChange = (e) => {

        // to find out if it's checked or not; returns true or false
        const isChecked = e.target.checked;
        setChecked(isChecked);
        
    }     

  
    const handleSubmit = (values) => {

            const date = new Date();
            const status = "DEL";
            const time = date.getTime();
            const datenow = parseInt(time/1000); // for user delete it already has + 180 days in backend
            const dateDeleted = datenow + (86400 * 180); // for verification and external it dont have + 180 days in backend 
        
            request({

                url: api.DELETE_BY_VERIFICATION + dateDeleted + '/' + userId,
                method: PUT,

            }).then(response => {
                
                request({
                    url: api.DELETE_BY_EXTERNAL + status + '/' + dateDeleted + '/' + userId,
                    method: PUT,
                    
                })

            }).then(response => {

                request({
                    url: api.DELETE_BY_USER,
                    method: POST,
                    data:
                    {
                        status: status,
                        dateDeleted: datenow,
                        userId: userId
                    }
                    
                })
            }).then(response => {

                request({
                    url: api.REGISTER_FEEDBACK,
                    method: POST,
                    data:
                    {
                        name: values.name,
                        email : values.email,
                        reason    : values.reason,
                        description : values.description
                    }
                
            }).then(response => {
                console.log("delete: ", response.status);
                setDelChecker(response.status);
            })
                
            
        }).then(response => {
            console.log("response status: ", response);
            
        }).catch(error => {
            console.log("error : ", error);
        }).finally(() => {
            // setSubmitting(false);
        })
    
    
}
    
    const showConfirmationDialog = () => {
        const reason = (document.getElementById("reason").value)
        const email = (document.getElementById("email").value)
        if(checked == false) {
            toast('Error', 'Please check consent to proceed.')
        }
        else if( reason == '' ){
            toast('Error', 'Please select a reason to proceed.')
        }
        else if( email == "" ){
            toast('Error', 'Please enter account email address.')
        }
        else if( email !== user.email ){
            toast('Error', 'Email address does not match.')
        }
        else {
            setIsDialogHidden(false);
        }
    }

    const hideConfirmationDialog = () => {
            setIsDialogHidden(true);
    }

    const formik = useFormik({
        initialValues,
        onSubmit: showConfirmationDialog,
        validationSchema: accountDeletionFeedbackSchema,
    })

   
    return (
        <div >
            { renderSr() }
            <div className={`${CLASSES.formContainer} xss:mt-2 `}>
          
            <form onSubmit={formik.handleSubmit} className={`${CLASSES.form}`}>
                <div className={`${CLASSES.formSpace} xss:space-y-12 xss:text-xss text-sm`}>
                  
                    <div>
                    <div className="mb-10">
                            <Input id="email" name="email" label={t("Account Email Address")} type="text" formik={formik}  aria-required={true}  />
                        </div>  
                        <div className="mb-8">
                            <Input id="name" name="name" label={t('Name')} type="text" value={`${user.firstName + " " + user.lastName}`} disabled formik={formik}  aria-required={true} />
                           
                        </div>
                        <div className="mb-5">
                            <h1 className="">{t('Reason')}</h1>
                            <SelectDropdown name="reason" id="reason" type="text"  label={t("Reasons")} formik={formik} aria-required={true} />
                        </div>
                        <div className=''>
                            <h1 className="">{t('Description')}</h1>
                            <Textarea type='text'  id="description" name="description"  formik={formik}  aria-required={true}  />
                            <div className='flex justify-end'>
                                <p>{formik.values.description.length}/250</p>
                            </div>
                        </div>
                      
                        <div className="my-5 px-4 flex justify-center">
                            <Checkbox style ={{color: '#751132'}} size="small" label="" name='checkbox' id="default-checkbox" type="checkbox" onChange={handleChange} className="mt-1 w-1 h-1 -translate-y-[1px]" />
                            <label className="ml-1 text-sm text-center font-medium text-gray-500 pointer-events-none" htmlFor="default-checkbox">{t('I agree and consent to delete my Yo-Kai Express Account')}</label>
                        </div>
                       
                     
            
                    </div>
                   
                 </div>

             
            <div className={CLASSES.container}>
                <div className={`${CLASSES.main}`}>
                    <div className="flex flex-col justify-center items-end space-y-8">
                    <div className={`${CLASSES.buttonDefault} flex justify-center items-center flex-col space-y-8`} role="button" onClick={showConfirmationDialog}>
                            <button className={`px-6 text-white font-semibold justify-center xss:h-16 xss:w-full xss:text-mdss xss:rounded-xl xss:p-1`} type='submit' aria-label="SUBMIT">
                            {t('Submit')}
                            </button>
                            </div>
                    </div>
                </div>
                
            </div>
            <Accountdeletionmodal isDialogHidden={isDialogHidden} handleSubmit={handleSubmit} hideConfirmationDialog={hideConfirmationDialog}/>      
            </form>
            
            {delchecker === 200 ? 
            <>
            <SuccessDeletionModal /> 
            </>
            : null }
        </div>

              

        </div>
    )

}

export default accountdeletionfeedback
