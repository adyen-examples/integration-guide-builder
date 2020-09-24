import React from "react";
import { useDispatch } from "react-redux";
import { paymentResult } from "./PreviewSlice";

function getAlertParams(type: string, err: string) {
  switch (type) {
    case "Authorised":
      return ["success", "Payment completed successfully"];
    case "Pending":
      return ["warning", "Payment pending"];
    case "Refused":
      return ["danger", "Payment refused"];
    default:
      return ["danger", `payment failed: ${err}`];
  }
}

function PaymentResult({ type, error }: { type: string; error: string }) {
  const dispatch = useDispatch();
  const [className, msg] = getAlertParams(type, error);
  return type ? (
    <div className="payment-res">
      <div
        className={`alert alert-${className} alert-dismissible fade show`}
        role="alert"
      >
        {msg}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => dispatch(paymentResult(["", ""]))}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  ) : null;
}

export default PaymentResult;
