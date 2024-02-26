import React, { useState, useEffect } from "react";
import "../assets/css/login.css";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { BASE_URL, ERROR_IMAGE } from "../service/utility";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import Modal from "react-modal";

const Signin = () => {
  const router = useHistory();
  const [errorModal, setErrorModal] = useState(false);
  const [emailForget, setEmailForget] = useState(false);
  const [errorModalLogin, setErrorModalLogin] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    let userD = localStorage.getItem("user");
    if (userD) {
      setErrorModalLogin(true);
    }
  }, []);

  const onClickOk = () => {
    setErrorModalLogin(false);
    router.push("/");
  };

  var customStyles = {
    content: {
      padding: "30px",
      top: "48%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "373px",
      marginRight: "-50%",
      borderRadius: "10px",
      transform: "translate(-50%, -50%)",
      zIndex: "99999",
    },
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {}

  const onChange = (e) => {
    let value = e.target.value;

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClick = async () => {
    try {
      if (user.email && user.password) {
        const response = await fetch(BASE_URL + "/user/signin", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        const data = await response.json();

        if (data && data.status == "0000") {
          localStorage.setItem("user", JSON.stringify(data.data));
          swal("Success!", "User login successfully!", "success").then((m) => {
            window.location.replace("/");
          });
        } else if (data && data.status == "9999") {
          setErrorModal(true);
        } else {
          swal("Error!", "Something went wrong!", ERROR_IMAGE);
        }
      } else {
        swal("Error!", "Enter valid credential!", ERROR_IMAGE);
      }
    } catch (error) {}
  };

  const onSuccesGoogle = async (rep) => {
    const info = jwtDecode(rep.credential);

    let request = {
      email: info.email,
      firstName: info.given_name,
      lastName: info.family_name,
      role: "public",
    };

    const response = await fetch(BASE_URL + "/user/signin", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();

    if (data && data.status == "0000") {
      localStorage.setItem("user", JSON.stringify(data.data));
      swal("Success!", "User signin successfully!", "success").then((m) => {
        window.location.replace("/");
      });
    } else if (data && data.status == "9999") {
      swal("Error!", data.message, ERROR_IMAGE);
    } else {
      swal("Error!", "Something went wrong!", ERROR_IMAGE);
    }
  };

  const onClickForget = async () => {
    if (user.email && user.email.includes("@")) {
      const response = await fetch(BASE_URL + "/token/forget", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      if (data && data.status == "0000") {
        swal("Success!", "Email send successfully!", "success");
        setErrorModal(false);
      } else if (data && data.status == "9999") {
        swal("Error!", data.message, ERROR_IMAGE);
      } else {
        swal("Error!", "Something went wrong!", ERROR_IMAGE);
      }
    } else {
      swal("Error!", "Email not valid!", ERROR_IMAGE);
    }
  };

  const onClickForgetEmail = async () => {
    if (resetEmail && resetEmail.includes("@")) {
      const response = await fetch(BASE_URL + "/token/forget", {
        method: "POST",
        body: JSON.stringify({ email: resetEmail }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setResetEmail(false)
      const data = await response.json();
      if (data && data.status == "0000") {
        swal("Success!", "Email send successfully!", "success");
        setErrorModal(false);
      } else if (data && data.status == "9999") {
        swal("Error!", data.message, ERROR_IMAGE);
      } else {
        swal("Error!", "Something went wrong!", ERROR_IMAGE);
      }
    } else {
      swal("Error!", "Email not valid!", ERROR_IMAGE);
    }
  };

  const onClickPopupBtn = (route) => {
    setErrorModal(false);
    router.push(route);
  };

  const onChangeEmail = (email) => {
    setResetEmail(email);
  };

  return (
    <>
      <div className="container margin-top-100 min-height-100">
        <div className="row">
          <div className="col-12 col-lg-5 text-center">
            <img
              alt="Building"
              className="question-img"
              src={require("../assets/img/account.png")}
            />
            <div className="mt-3">
              <button className="purple-bg none-border ">
                {/* <img
                  alt="Building"
                  className=""
                  width={"23px"}
                  src={require("../assets/img/google.png")}
                  />{" "}
                <text>sign up with Google</text> */}
                <GoogleLogin
                  className="bg-green"
                  text="Sign in with Google"
                  onSuccess={(data) => onSuccesGoogle(data)}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                ></GoogleLogin>
              </button>
            </div>
            <div className="text-center ">
              <p className="text-green font-25 weight-900 m-0">
                Secure password tips!
              </p>
              <p className="font-25 weight-900 m-0">
                1. Dont personal information.
              </p>
              <p className=" font-25 weight-900 m-0">
                2. include a combination of letters, numbers, and characters.
              </p>
              <p className=" font-25 weight-900 m-0">
                3. Prioritize password length.{" "}
              </p>
              <p className="font-25 weight-900 m-0">4. Never repeat password</p>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <h1 className="text-black text-center bg-green font-outfit weight-800 py-2 mb-3">
              Sign in
            </h1>
            <div className="p-5 bg-green">
              <div className="p-3 border-black">
                <div className="form-group mt-4">
                  <text className="text-black weight-600">email: </text>
                  <input
                    type={"email"}
                    className="form-control"
                    name="email"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group mt-4">
                  <text className="text-black weight-600">password: </text>
                  <input
                    type={"password"}
                    className="form-control"
                    name="password"
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="text-left mt-5">
                  <button className="btn btn-danger w-50" onClick={onClick}>
                    Sign in
                  </button>
                  <p className="text-black">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-black">
                      Sign up
                    </a>
                    {" | "}
                    <a
                      // onClick={onClickForget}
                      onClick={() => setEmailForget(true)}
                      className="cursor-pointer text-black"
                    >
                      Forget Password?
                    </a>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        Signin
      </div>
      <Modal
        isOpen={errorModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 className="weight-700 font-outfit modal-heading text-center text-black">
          Oops... Invalid Credentials
        </h3>
        <div className="text-center">
          <img src={require("../assets/img/must.png")} width="150px" />
        </div>
        <h3 className="weight-700 my-2 font-outfit modal-heading text-center text-black weight-700 font-20">
          Your login details are wrong
        </h3>
        <h3 className="weight-700  font-outfit modal-heading text-center text-black weight-700 mb-5 font-20">
          If you have forgotten login details, you can reset your password
        </h3>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn bg-green text-black  mb-2"
            onClick={() => onClickForget()}
          >
            Reset pass
          </button>
          <button
            type="button"
            className="btn bg-green  text-black  mb-2"
            onClick={() => setErrorModal(false)}
          >
            Retry
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={errorModalLogin}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 className="weight-700 font-outfit modal-heading text-center text-black">
          Looks like we have a wizard among us!
        </h3>
        <div className="text-center">
          <img src={require("../assets/img/wizard.png")} width="150px" />
        </div>
        <h3 className="weight-700 my-2 font-outfit modal-heading text-center text-black weight-700 font-20">
          You are already logged in.
        </h3>

        <div className="text-right">
          <button
            type="button"
            className="btn bg-green  text-black  mb-2"
            onClick={() => onClickOk()}
          >
            OK
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={emailForget}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <h5 className="modal-heading  text-black text-center weight-500 mb-5">
            Reset Password
          </h5>
          <div>
            <div className="form-group mt-3">
              <div class="form-group m-0">
                <p className="text-black m-0">Enter email</p>
                <input
                  type={"email"}
                  name="confirmPassword"
                  className="form-control"
                  onChange={(e) => onChangeEmail(e.target.value)}
                  id="your_pass"
                  placeholder="Enter your email to reset."
                />
              </div>
              <div className="form-group mt-3">
                <button
                  type="button"
                  class="btn purple-bg text-white w-100 mb-2"
                  onClick={onClickForgetEmail}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Signin;
