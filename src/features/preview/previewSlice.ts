import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentMethodsResponseObject } from "@adyen/adyen-web/dist/types/core/ProcessResponse/PaymentMethodsResponse/types";
import { Locales } from "@adyen/adyen-web/dist/types/language/types";
import { AppThunk } from "../../app/store";

const DEFAULT_COMPONENT = "dropin";

const initialState = {
  componentType: DEFAULT_COMPONENT,
  error: "",
  paymentMethodsRes: (null as unknown) as PaymentMethodsResponseObject,
  paymentRes: null,
  paymentDetailsRes: null,
  paymentResult: "",
  config: {
    clientKey: "test_S5LWLBCRBNBERHGKQMFVNOPJEIYCKQY5",
    environment: "test",
    paymentMethodsConfiguration: {
      ideal: {
        showImage: true,
      },
      card: {
        hasHolderName: true,
        holderNameRequired: true,
        name: "Credit or debit card",
        amount: {
          value: 1000, // 10€ in minor units
          currency: "EUR",
        },
      },
    },
    locale: "en-EN" as Locales,
    showPayButton: true,
  },
};

type PreviewState = typeof initialState;

export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    paymentMethods: (state, action: PayloadAction<[any, number]>) => {
      const [res, status] = action.payload;
      if (status >= 300) {
        state.error = res;
      } else {
        res.paymentMethods = res.paymentMethods.filter((it: { type: string }) =>
          [
            //TODO adjust the filter
            "scheme",
            "bcmc",
            "eps",
            "dotpay",
            "giropay",
            "ideal",
            "directEbanking",
            "paysafecard",
          ].includes(it.type)
        );
        state.paymentMethodsRes = res;
      }
    },
    payments: (state, action: PayloadAction<[any, number]>) => {
      const [res, status] = action.payload;
      if (status >= 300) {
        state.error = res;
      } else {
        state.paymentRes = res;
      }
    },
    paymentDetails: (state, action: PayloadAction<[any, number]>) => {
      const [res, status] = action.payload;
      if (status >= 300) {
        state.error = res;
      } else {
        state.paymentDetailsRes = res;
      }
    },
    paymentResult: (state, action: PayloadAction<[string, string]>) => {
      const [res, err] = action.payload;
      state.paymentResult = res;
      state.error = err;
    },
  },
});

export const { paymentMethods, payments, paymentDetails, paymentResult } = previewSlice.actions;

// let SERVER_URL = "https://docs.adyen.com/api-explorer/api/checkout/v64";
let SERVER_URL = "http://localhost:8080/api"; // TODO

if (process.env.NODE_ENV !== "production") {
  SERVER_URL = "http://localhost:8080/api";
}

export const getPaymentMethods = (): AppThunk<any> => async (dispatch) => {
  const response = await fetch(`${SERVER_URL}/paymentMethods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //   origin: "docs.adyen.com",
    },
  });
  dispatch(paymentMethods([await response.json(), response.status]));
};

export const initiatePayment = (data: any): AppThunk<any> => async (dispatch) => {
  const response = await fetch(`${SERVER_URL}/payments`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(payments([await response.json(), response.status]));
};

export const submitAdditionalDetails = (data: any): AppThunk<any> => async (dispatch) => {
  const response = await fetch(`${SERVER_URL}/payments/details`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(paymentDetails([await response.json(), response.status]));
};

export const setPaymentResult = (res: string, err = ""): AppThunk<any> => (dispatch) => {
  dispatch(paymentResult([res, err]));
};

export default previewSlice.reducer;
