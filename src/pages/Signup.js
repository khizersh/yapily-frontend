import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import "../assets/css/login.css";
import { BASE_URL, ERROR_IMAGE, GOOGLE_CLIENT_ID } from "../service/utility";
// import GoogleLogin from "react-google-login";
import { useGoogleLogin, hasGrantedAnyScopeGoogle } from "@react-oauth/google";
import { hasGrantedAllScopesGoogle } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import Modal from "react-modal";

const Signup = () => {
  const router = useHistory();
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "public",
  });
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    let userD = localStorage.getItem("user");
    if (userD) {
      setErrorModal(true);
    }
  }, []);

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

  const [passwordCount, setPasswordCount] = useState(0);

  const responseGoogle = (response) => {
    if (response[ERROR_IMAGE]) {
      console.log("response error : ", response);
    } else {
      console.log("response Success : ", response);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("tokenResponse : ", tokenResponse);
      const hasAccess = hasGrantedAllScopesGoogle(
        tokenResponse,
        "email",
        "profile"
      );
      console.log("hasAccess : ", hasAccess);
    },
    onError: (error) => {
      console.log("error : ", error);
    },
    scope:
      "email profile https://www.googleapis.com/auth/cloud-platform openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-platform.read-only",
  });

  const onSuccesGoogle = async (rep) => {
    const info = jwtDecode(rep.credential);

    let request = {
      email: info.email,
      firstName: info.given_name,
      lastName: info.family_name,
      role: "public",
    };

    const response = await fetch(BASE_URL + "/user/signup-google", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    console.log("data : ", data);

    if (data && data.status == "0000") {
      localStorage.setItem("user", JSON.stringify(data.data));
      swal("Success!", "User registered successfully!", "success").then((m) => {
        router.push("/");
      });
    } else if (data && data.status == "9999") {
      swal("Error!", data.message, ERROR_IMAGE);
    } else {
      swal("Error!", "Something went wrong!", ERROR_IMAGE);
    }
  };

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "firstName" || name == "lastName") {
      var letters = /^[A-Za-z]+$/;
      if (value.match(letters)) {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const onClick = async () => {
    try {
      let userLocal = null;
      userLocal = localStorage.getItem("user");

      if (!userLocal) {
        if (passwordCount > 1) {
          const response = await fetch(BASE_URL + "/user/signup", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });

          const data = await response.json();

          if (data && data.status == "0000") {
            swal("Success!", "User register successfully!", "success").then(
              (m) => {
                router.push("/signin");
              }
            );
          } else if (data && data.status == "9999") {
            swal("Error!", data.message, ERROR_IMAGE);
          } else {
            swal("Error!", "Something went wrong!", ERROR_IMAGE);
          }
        } else {
          swal("Warning!", "Password is not secure!", "warning");
        }
      } else {
        setErrorModal(true);
      }
    } catch (error) {}
  };

  function isGood(password) {
    var password_strength = document.getElementById("password-text");
    setUser({ ...user, password: password });

    if (password.length == 0) {
      password_strength.innerHTML = "";
      return;
    }

    var regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*`#?&]"); //Special Character.

    var passed = 0;

    for (var i = 0; i < regex.length; i++) {
      if (new RegExp(regex[i]).test(password)) {
        passed++;
      }
    }

    var strength = "";
    switch (passed) {
      case 0:
        setPasswordCount(2);
        break;
      case 1:
        setPasswordCount(1);
        break;
      case 2:
        setPasswordCount(2);
        strength =
          "<small class='progress-bar bg-danger text-white' style='width: 40%'>Weak</small>";
        break;
      case 3:
        setPasswordCount(3);
        strength =
          "<small class='progress-bar bg-warning text-white' style='width: 60%'>Medium</small>";
        break;
      case 4:
        setPasswordCount(4);
        strength =
          "<small class='progress-bar bg-success text-white' style='width: 100%'>Strong</small>";
        break;
    }
    password_strength.innerHTML = strength;
  }

  const onClickOk = () => {
    setErrorModal(false);
    router.push("/");
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
                  text="Sign up with Google"
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
              create an account
            </h1>
            <div className="p-5 bg-green">
              <div className="p-3 border-black">
                <div className="form-group mt-4">
                  <text className="text-black weight-600">first name: </text>
                  <input
                    type={"text"}
                    name="firstName"
                    value={user.firstName}
                    onChange={(e) => onChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="form-group mt-4">
                  <text className="text-black weight-600">last name: </text>
                  <input
                    type={"text"}
                    className="form-control"
                    name="lastName"
                    value={user.lastName}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group mt-4">
                  <text className="text-black weight-600">email: </text>
                  <input
                    type={"email"}
                    className="form-control"
                    name="email"
                    value={user.email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="form-group mt-4">
                  <text className="text-black weight-600">password: </text>
                  <input
                    id="password"
                    type="password"
                    value={user.password}
                    name="password"
                    className="form-control"
                    onChange={(e) => isGood(e.target.value)}
                  />
                  <small class="help-block" id="password-text"></small>
                </div>
                <div>
                  <ul>
                    <li>Uppercase Letters</li>
                    <li>Lowercase Letters</li>
                    <li>Numbers</li>
                    <li>Special Character</li>
                  </ul>
                </div>

                <div className="text-left mt-5">
                  <button className="btn btn-danger w-50" onClick={onClick}>
                    Sign up
                  </button>
                  <p className="text-black">
                    Have an account?{" "}
                    <a href="/signin" className="text-black">
                      Sign in
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
    </>
  );
};

export default Signup;
