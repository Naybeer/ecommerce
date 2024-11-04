import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate
import "../stripe.css";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import { toast } from "react-toastify";

export default function CheckoutForm() {

  const token = useEcomStore((state) => state.token);
  const clearCart = useEcomStore((state) => state.clearCart);

 

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // เรียกใช้ useNavigate

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    console.log('payload',payload)
    if (payload.error) {
      setMessage(payload.error.message);
      console.log('error')
      toast.error(payload.error.message);
    } 
    
    else if(payload.paymentIntent.status === 'succeeded') {
      console.log('Ready to Save Order')
       // Create Order
      saveOrder(token, payload)
        .then((res) => {
          console.log(res);
          clearCart()
          toast.success("Payment successful!");
          navigate("/user/history");
        })
        .catch((err) => {
          console.log(err);
         
        });
    }
    else {
      console.log('something went wrong')
      toast.warning('something went wrong');
     
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="stripe-button"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
// final