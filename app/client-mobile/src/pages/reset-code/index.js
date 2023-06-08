import React, { useEffect } from "react";
import { Button } from "../../components/common";
import { CLASSES } from "../../utility/classes";
import { Input } from "../../components/form";
import { Link } from "react-router-dom";
import { resetCodeSchema } from "../../validation/schema";
import { useFormik } from "formik";

const ResetCode = (props) =>  {
  const { setHasLoaded, renderSr } = props;

  const initialValues = {
    code: ''
  }

  useEffect(() => {
    setHasLoaded(true);
  }, [])
  
  const handleSubmit = (values) => {
    console.log(values);
  }

  const formik = useFormik({
    initialValues     : initialValues,
    validationSchema  : resetCodeSchema,
    onSubmit          : handleSubmit,
  });

    return (
        <div className={CLASSES.main}>
          <div className={CLASSES.container}>
              { renderSr() }
              <div className="mt-6">
              <h1 className={CLASSES.title}>Enter Authentication Code</h1>
                <h3 className="mt-1 py-7 px-4 text-md text-default">Please enter the seven-digit code we just sent your number <b>+X XXX XXX XX52.</b></h3>
              </div>
            <div className={CLASSES.formContainer}>
              <form className={CLASSES.form} onSubmit={formik.handleSubmit}>
                <Input id="code" name="code" type="number" label="Code" formik={formik} />  

                <div className="mt-2 text-sm">
                  <p className="text-white">
                    Didn't receive it?{' '}
                    <Link to="/resetcode" className="text-emphasis cursor-pointer">
                      Request another code
                    </Link>
                  </p>
                </div>           

                <div className={CLASSES.buttonContainer}>
                  <Button type="submit" label="VERIFY" disabled={!formik.isValid || formik.isSubmitting} />
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  }

  export default ResetCode;