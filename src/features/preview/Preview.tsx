import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";

import { getPaymentMethods, initiatePayment, submitAdditionalDetails, setPaymentResult } from "./previewSlice";

import "./Preview.scss";
import { RootState } from "../../app/store";
import PaymentResult from "./PaymentResult";

function Preview() {
  return (
    <footer>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h5 className="h5 text-center heading">Preview</h5>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="preview-space">
              <ConnectedCheckoutContainer />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Preview;

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export interface ICheckoutContainerProp extends StateProps, DispatchProps {}

class CheckoutContainer extends React.Component<ICheckoutContainerProp> {
  private paymentContainer = React.createRef<any>();
  private paymentComponent: any;
  private checkout: any;

  componentDidMount() {
    this.props.getPaymentMethods();
  }

  componentDidUpdate(prevProps: ICheckoutContainerProp) {
    const { paymentMethodsRes: paymentMethodsResponse, config, paymentRes, paymentDetailsRes, error } = this.props.preview;
    if (error && error !== prevProps.preview.error) {
      this.props.setPaymentResult("Error", error);
      return;
    }
    if (
      paymentMethodsResponse &&
      config &&
      (paymentMethodsResponse !== prevProps.preview.paymentMethodsRes || config !== prevProps.preview.config)
    ) {
      this.checkout = new AdyenCheckout({
        ...config,
        paymentMethodsResponse,
        onAdditionalDetails: this.onAdditionalDetails,
        onSubmit: this.onSubmit,
      });

      if (this.checkout) {
        this.checkout.create(this.props.preview.componentType).mount(this.paymentContainer.current);
      }
    }
    if (paymentRes && paymentRes !== prevProps.preview.paymentRes) {
      this.processPaymentResponse(paymentRes);
    }
    if (paymentRes && paymentDetailsRes !== prevProps.preview.paymentDetailsRes) {
      this.processPaymentResponse(paymentDetailsRes);
    }
  }

  processPaymentResponse = (paymentRes: any) => {
    if (paymentRes.action) {
      this.paymentComponent.handleAction(paymentRes.action);
    } else {
      this.props.setPaymentResult(paymentRes.resultCode);
    }
  };

  onSubmit = (state: any, component: any) => {
    if (state.isValid) {
      const currency = findCurrency(state.data.paymentMethod.type);
      const orderRef = uuidv4();
      this.props.initiatePayment({
        amount: { currency, value: 1000 }, // value is 10€ in minor units
        channel: "Web",
        additionalData: {
          allow3DS2: true,
        },
        reference: orderRef,

        returnUrl: `http://localhost:8080/api/handleShopperRedirect?orderRef=${orderRef}`,
        origin: window.location.origin,
        ...state.data,
      });
      this.paymentComponent = component;
    }
  };

  onAdditionalDetails = (state: any, component: any) => {
    this.props.submitAdditionalDetails(state.data);
    this.paymentComponent = component;
  };

  render() {
    return (
      <div className="payment-container">
        <PaymentResult type={this.props.preview.paymentResult} error={this.props.preview.error} />
        <div ref={this.paymentContainer} className="payment"></div>
      </div>
    );
  }
}

const mapStateToProps = ({ preview }: RootState) => ({
  preview,
});

const mapDispatchToProps = {
  getPaymentMethods,
  initiatePayment,
  submitAdditionalDetails,
  setPaymentResult,
};

export const ConnectedCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);

function findCurrency(type: string) {
  switch (type) {
    case "wechatpayqr":
    case "alipay":
      return "CNY";
    case "dotpay":
      return "PLN";
    case "boletobancario":
      return "BRL";
    default:
      return "EUR";
  }
}
