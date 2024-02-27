import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL, ERROR_IMAGE } from "../service/utility";

const Token = () => {
  const router = useHistory();
  const [request, setRequest] = useState(null);
  const [consent, setConsent] = useState(null);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  useEffect(() => {
    let token = query.get("consent");
    if (token) {
      const paymentData = JSON.parse(localStorage.getItem("tokenRequest"));
      setRequest(paymentData);

      setConsent(token);
      console.log("token :: ", token);
      console.log("paymentData :: ", paymentData);
    }
  }, []);

  const onClickAllow = async () => {
    if (consent) {
      const requestBody = { consent: consent, request: request.paymentRequest };

      const response = await fetch(BASE_URL + "/make-payment", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();

      if (data && data.status == "0000") {
        if (data.data?.data?.id) {
          let paymentId = data.data?.data?.id;
          await getPaymentDetail(consent, paymentId);
        }
      } else if (data && data.status == "9999") {
        swal("Error!", data.message, ERROR_IMAGE);
      } else {
        swal("Error!", "Something went wrong!", ERROR_IMAGE);
      }
    }
  };

  const getPaymentDetail = async (consent, paymentId) => {
    try {
      const requestBody = {
        consent: consent,
        paymentId: paymentId,
      };

      const response = await fetch(BASE_URL + "/get-payment-detail", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();

      if (data && data.status == "0000") {
        if (data.data?.data?.payments[0]?.status == "COMPLETED") {
          let finalData = request;
          finalData["paymentDetail"] = data.data?.data?.payments[0];
          localStorage.removeItem("tokenRequest");
          localStorage.setItem("tokenRequest", JSON.stringify(finalData));
          swal("Success!", "Payment initiated successfully!", "success").then(
            (res) => {
              router.push("/success");
            }
          );
        }
      } else if (data && data.status == "9999") {
        swal("Error!", data.message, ERROR_IMAGE);
      } else {
        swal("Error!", "Something went wrong!", ERROR_IMAGE);
      }
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="my-5 text-center">/ACCOUNT</h1>
        <div className="col-12 text-center mb-5">
          <div className="row">
            <div className="col-lg-2 col-0"></div>
            <div className="col-lg-8 col-12">
              <h3>
                We have partnered with Yapily Connect to securely initiate
                payment from your account at {request ? request.bankName : ""}
              </h3>
            </div>
            <div className="col-lg-2 col-0"></div>
          </div>
        </div>
        <div className="col-12 p-5 card">
          <div>
            <h2>Payment Total</h2>
            <p className="m-0">
              Amount: {request?.paymentRequest?.amount.amount}
            </p>
            <p className="m-0">
              Currency: {request?.paymentRequest?.amount.currency}
            </p>
          </div>
          <div className="mt-3">
            <h2>Payee Details</h2>
            <p className="m-0">
              Payee name: {request?.paymentRequest?.payee?.name}
            </p>
            <p className="m-0">
              Payee account identification:{" "}
              {
                request?.paymentRequest?.payee?.accountIdentifications[0]
                  ?.identification
              }
            </p>
            <p className="m-0">
              Payment Reference: {request?.paymentRequest?.reference}
            </p>
          </div>

          <div className="mt-5">
            <p className="m-0">
              By using the service, you agree to Yapily Connect initiating this
              payemnt and its Terms & Conditions and Privacy Notice{" "}
            </p>
          </div>
        </div>
        <div className="col-12 my-5">
          <div className="row text-center">
            <div className="col-6">
              <button className="btn black-transparent" onClick={onClickAllow}>
                Cancel
              </button>
            </div>
            <div className="col-6">
              <button className="btn black-btn-token" onClick={onClickAllow}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
