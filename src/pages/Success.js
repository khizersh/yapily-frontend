import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL, ERROR_IMAGE } from "../service/utility";

const Success = () => {
  const router = useHistory();
  const [request, setRequest] = useState(null);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  useEffect(() => {
    const paymentData = JSON.parse(localStorage.getItem("tokenRequest"));
    if (paymentData) {
      setRequest(paymentData);
      console.log("paymentData final :: ", paymentData);
    }
  }, []);

  const onClickAllow = async () => {
    router.push("/");
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
                Yapily Connect has successfully initiated the following payment
                order
              </h3>
            </div>
            <div className="col-lg-2 col-0"></div>
          </div>
        </div>
        <div className="col-12 p-5 card">
          <div>
            <h2>Payment Total</h2>
            <p className="m-0">
              Amount: {request?.paymentDetail?.amountDetails?.amount}
            </p>
            <p className="m-0">
              Currency: {request?.paymentDetail?.amountDetails?.currency}
            </p>
          </div>
          <div className="mt-3">
            <h2>Payee Details</h2>
            <p className="m-0">
              Payee name: {request?.paymentDetail?.payeeDetails?.name}
            </p>
            <p className="m-0">
              Payee account identification:{" "}
              {
                request?.paymentDetail?.payeeDetails?.accountIdentifications[0]
                  ?.identification
              }
            </p>
            <p className="m-0">
              Payment Reference: {request?.paymentDetail?.reference}
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
            <div className="col-12">
              <button className="btn black-btn-token w-50" onClick={onClickAllow}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
