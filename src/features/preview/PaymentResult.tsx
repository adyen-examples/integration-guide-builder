import React from "react";
import Alert from "react-bootstrap/Alert";
import { useDispatch } from "react-redux";
import { paymentResult } from "./previewSlice";

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
      <Alert variant={className} onClose={() => dispatch(paymentResult(["", ""]))} dismissible>
        {msg}
      </Alert>
    </div>
  ) : null;
}

export default PaymentResult;
