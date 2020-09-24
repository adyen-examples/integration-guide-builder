import React from "react";

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
  const [className, msg] = getAlertParams(type, error);
  return type ? (
    <div className="payment-res">
      <div className={`alert alert-${className}`} role="alert">
        {msg}
      </div>
    </div>
  ) : null;
}

export default PaymentResult;
