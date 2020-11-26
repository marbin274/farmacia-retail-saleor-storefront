import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";

import { useCart, useCheckout, useUserDetails } from "@sdk/react";

import * as S from "./styles";
import { IProps } from "./types";
import ReactSVG from "react-svg";
import { CHECKOUT_STEPS, PROVIDERS, URL_WEB } from "@temp/core/config";
import { useHistory } from "react-router";
import { ICardData } from "@temp/@next/types/ICardData";


// TODO: We need to make this using params/env variables/something like that
const environment = {
  channel: "web",
  currency: "PEN",
  endPointAuthorization: "https://apitestenv.vnforapps.com/api.authorization/v3/authorization/ecommerce/",
  endPointJS: "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true",
  endPointSecurity: "https://apitestenv.vnforapps.com/api.security/v1/security",
  endPointSession: "https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/",
  merchantId: "342062522",
  production: false,
  pwd: "d5e7nk$M",
  user: "integraciones.visanet@necomplus.com",
}

const transaction = {
  amount: "1",
  channel: environment.channel,
  isLoading: false,
  merchantId: environment.merchantId,
  purchaseNumber: (Math.floor(Math.random() * 999999999999) + 1).toString(),
  urlJS: environment.endPointJS,
}

const AunaPaymentGateway: React.FC<IProps> = ({
   config,
   processPayment,
   formRef,
   formId,
   errors = [],
   checkoutBillingAddress,
 }: IProps) => {
  
  const history = useHistory();
  // const location: Record<string, any> = useLocation();

  // @ts-ignore
  const [ token, setToken ] = useState("");
  
  // @ts-ignore
  const [ sessionKey, setSessionKey ] = useState(""); 

  const { checkout, createPayment, setBillingAddress } = useCheckout();
  const { data: user } = useUserDetails();
  const { totalPrice } = useCart()
  

  const generateToken = () => {
    const endpoint = environment.endPointSecurity;
    const user = environment.user;
    const password = environment.pwd

    const requestOptions: AxiosRequestConfig = {
      headers: { 
        "Authorization": "Basic " + btoa(user + ":" + password),
        "Content-Type": "application/json",
       },
    };

    return axios.get(endpoint, requestOptions)
      .then(res => res.data)
      .then(data => {
        setToken(data);
        
        return data;
      });
  }

  const generateSession = (token: string, amount: any) => {

    const endpoint = environment.endPointSession;
    const merchantId = environment.merchantId;
    const channel = environment.channel;

    const data = { "amount": amount, "antifraud": null, "channel": channel};

    const requestOptions: AxiosRequestConfig = {
      headers: { 
        "Authorization": token,
        "Content-Type": "application/json",
       },
    };


    return axios.post(endpoint + merchantId, data, requestOptions)
      .then(res => res.data)
      .then(data => data.sessionKey)
      .then(data => {
        setSessionKey(data);
        return data;
      });
  }

  async function setBillingAddressSync(shippingAddress: any, email: string) {
    const { dataError } = await setBillingAddress(shippingAddress, email);

    return dataError?.error;
  }

  async function createPaymentSync(gateway: string, token: string){
    const dummyCardData: ICardData = {
      brand: 'visa',
      expMonth: 11,
      expYear: 22,
      firstDigits: '4242',
      lastDigits: '4242',
    };

    const { dataError } = await createPayment(gateway, token, dummyCardData);

    return dataError;
  }




  useEffect(() => {
    const pathname = window.location.pathname;
    const pathElements = pathname.split('/');

    if (pathElements.length <= 3){
      let amount: string = "";

      if (totalPrice?.gross.amount && totalPrice?.gross.amount > 0){
        amount = totalPrice.gross.amount.toString();
      }

      
      generateToken()
        .then((token) => generateSession(token, amount))
        .then((sessionKey) => {

          const form = document.createElement("form");
          form.setAttribute('method', "POST");
          form.setAttribute('action',
            "https://ck4z7oarn5.execute-api.us-east-2.amazonaws.com/main/niubiz/transaction?purchase="
            +transaction.purchaseNumber+"&amount="+amount);
          form.setAttribute('id', "boton_pago");

          document.getElementById("btnpago")!.appendChild(form);


          const scriptGateway = document.createElement('script');
          scriptGateway.setAttribute('src', transaction.urlJS);
          scriptGateway.setAttribute('data-sessiontoken', sessionKey);
          scriptGateway.setAttribute('data-merchantid', transaction.merchantId);
          scriptGateway.setAttribute('data-purchasenumber', transaction.purchaseNumber);
          scriptGateway.setAttribute('data-merchantlogo', `${URL_WEB}src/images/logo-tempo.png`);
          scriptGateway.setAttribute('data-channel', transaction.channel);
          scriptGateway.setAttribute('data-amount', amount);
          scriptGateway.setAttribute('data-timeouturl', URL_WEB); // where do we go if we finish the payment session

          document.getElementById("boton_pago")!.appendChild(scriptGateway);

        })
    }

    onComponentDidMount().then(r => true);
  }, []);

  // TODO: we need to merge these two methods
  const onComponentDidMount = async () => {

    const checkoutShippingAddress = checkout?.shippingAddress
      ? {
        ...checkout?.shippingAddress,
        phone: checkout?.shippingAddress?.phone || undefined,
      }
      : undefined;

    const pathname = window.location.pathname;
    const pathElements = pathname.split('/');
    let paymentToken = "";

    if (pathElements.length > 3){
      paymentToken = pathElements[3];

      const shippingEmail = user?.email || "";
      const updateResult = setBillingAddressSync(checkoutShippingAddress, shippingEmail);

      updateResult.then(r => {
        if (r){
          // console.log('error en setBillingAddressSync');

        }else{
          // console.info('continuar con createPaymentSync');
          const dataErrorPayment = createPaymentSync(PROVIDERS.AUNA.id, paymentToken);
          
          // @ts-ignore
          const errors = dataErrorPayment?.error;

          if (errors) {
            // setGatewayErrors(errors);
            console.error(errors);
          } else {
            console.info('no errors at payment create')
            // setGatewayErrors([]);
            history.push(CHECKOUT_STEPS[2].nextStepLink);
          }

        }
      });

    }
  }

  return (
    <S.Wrapper>
      <div id="btnpago"></div>
      <S.PoweredBy>
        <span>powered by:</span> <ReactSVG path={S.paymentGatewayLogo}/>
      </S.PoweredBy>
    </S.Wrapper>
  );
};



export { AunaPaymentGateway };
