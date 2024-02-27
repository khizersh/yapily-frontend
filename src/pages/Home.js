import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL, ERROR_IMAGE } from "../service/utility";
import Modal from "react-modal";

const Home = () => {
  const router = useHistory();
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "public",
  });

  const [institutions, setInstitutions] = useState([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [institution, setInstitution] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    getInstitutions();
    setShowBtn(false);
  }, []);

  const onChange = (e) => {
    let value = e.target.value;
    const lowercaseKeyword = value.toLowerCase();
    const results = institutions.filter((obj) =>
      obj.fullName.toLowerCase().includes(lowercaseKeyword)
    );
    setFilteredInstitutions(results);
  };

  const getInstitutions = async () => {
    const response = await fetch(BASE_URL + "/getInstitutions", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    if (data && data.status == "0000") {
      setInstitutions(data.data.data);
    } else if (data && data.status == "9999") {
      swal("Error!", data.message, ERROR_IMAGE);
    } else {
      swal("Error!", "Something went wrong!", ERROR_IMAGE);
    }
  };

  const onClickCard = (data) => {
    setShowBtn(true);
    setInstitution(data);
  };

  const onClickAllow = async () => {
    try {
      const uniqueId = generateString(10);
      const requestBody = {
        bankName: institution.fullName,
        applicationUserId: "john.doe@company1.com",
        institutionId: institution.id,
        callback: window.location.origin + "/get-detail",
        paymentRequest: {
          paymentIdempotencyId: uniqueId,
          payer: {
            name: "John Doe",
            accountIdentifications: [
              {
                type: "IBAN",
                identification: "GB29NWBK60161331926819",
              },
            ],
          },
          amount: {
            amount: 1,
            currency: "EUR",
          },
          reference: "Bill Payment",
          type: "DOMESTIC_PAYMENT",
          payee: {
            name: "Jane Doe",
            address: {
              country: "BE",
            },
            accountIdentifications: [
              {
                type: "IBAN",
                identification: "GB29NWBK60161331926819",
              },
            ],
          },
        },
      };

      localStorage.setItem("tokenRequest", JSON.stringify(requestBody));

      console.log("requestBody :: ", requestBody);

      const response = await fetch(BASE_URL + "/payment-auth-request", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();

      if (data && data.status == "0000") {
        window.open(data?.data?.data?.authorisationUrl, "_blank");
      } else if (data && data.status == "9999") {
        swal("Error!", data.message, ERROR_IMAGE);
      } else {
        swal("Error!", "Something went wrong!", ERROR_IMAGE);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Select your bank</h1>
          </div>
          <div className="col-12">
            <div className="form-group mt-4">
              <input
                type={"text"}
                className="form-control"
                placeholder="Search"
                name="search"
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              {filteredInstitutions.length ? (
                filteredInstitutions.map((ins) => (
                  <div
                    className="col-lg-4 col-6 cursor-pointer"
                    onClick={() => onClickCard(ins)}
                  >
                    <div className="card card-size">
                      {ins?.media?.length
                        ? ins?.media.map((img) =>
                            img.type == "logo" ? (
                              <img src={img.source} width={"100px"} />
                            ) : (
                              ""
                            )
                          )
                        : ""}{" "}
                    </div>
                  </div>
                ))
              ) : institutions.length ? (
                institutions.map((ins) => (
                  <div
                    className="col-lg-4 col-6 cursor-pointer"
                    onClick={() => onClickCard(ins)}
                  >
                    <div className="card card-size">
                      {ins?.media?.length
                        ? ins?.media.map((img) =>
                            img.type == "logo" ? (
                              <img src={img.source} width={"100px"} />
                            ) : (
                              ""
                            )
                          )
                        : ""}{" "}
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
              {}
            </div>
          </div>
        </div>
      </div>
      {showBtn == true ? (
        <div className="overlay text-center">
          <p>
            Yapily Connnect <u>T&C</u> and <u>Privacy Policy</u>
          </p>
          <button className="btn black-btn" onClick={onClickAllow}>
            Allow
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
