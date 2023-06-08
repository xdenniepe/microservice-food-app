import React, { useState } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { FaPaypal } from "react-icons/fa";
import { HiCreditCard } from "react-icons/hi";

const ProcessPayment = () => {
  const [card, setCard] = useState("creditCard");

  const onChangeHandler = (e) => {
    setCard(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-[80vh] relative">
      <header>
        <h2 className="text-secondary font-bold m-5 text-md">Payment Method</h2>
      </header>
      <div className="flex flex-col relative">
        <RadioGroup
          name="use-radio-group"
          defaultValue="creditCard"
          onChange={(e) => onChangeHandler(e)}
        >
          <label
            htmlFor="chk1"
            className={`flex flex-row text-center rounded-xl my-2 ${
              card === "creditCard" && "border-secondary"
            } border-2 p-2 w-11/12 mx-auto relative`}
          >
            <HiCreditCard className="w-10 h-10 opacity-70" />
            <h1 className="my-auto mx-2 text-sm font-medium opacity-80">
              Credit or Debit Card
            </h1>
            <FormControlLabel
              className="absolute right-[1rem]"
              value="creditCard"
              control={<Radio id="chk1" style={{ color: "#751132" }} />}
            />
          </label>
          <label
            className={`flex flex-row text-center rounded-xl my-2 ${
              card === "payPal" && "border-secondary"
            } border-2 p-2 w-11/12 mx-auto relative`}
          >
            <FaPaypal className="w-10 h-10 opacity-70" />
            <h1 className="my-auto mx-2 font-medium text-sm opacity-80">
              Paypal
            </h1>
            <FormControlLabel
              className="absolute right-[1rem]"
              value="payPal"
              control={
                <Radio
                  id="chk2"
                  style={{ color: "#751132" }}
                />
              }
            />
          </label>
        </RadioGroup>
      </div>
      <div className="flex w-full absolute bottom-0">
        <button className="mx-auto bg-secondary w-11/12 h-10 rounded-2xl text-primary text-center font-medium ">
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ProcessPayment;
