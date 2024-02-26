import React, { useEffect , useState } from "react";
import "../assets/css/home.css";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { ERROR_IMAGE } from "../service/utility";
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
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalDashboard, setErrorModalDashboard] = useState(false);

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

  const onClickTracker = () => {
    router.push("/tracker");
  };

  
  const onClickOk = () => {
    setErrorModal(false);
  };

  const onClickDashboard = () => {
    let user = localStorage.getItem("user");
    if (user) {
      window.location.href = "/dashboard/admin/my-calender";
    } else {
      // swal("Error!", "Please login first!", ERROR_IMAGE);
      setErrorModalDashboard(true)
    }
  };
  const onClickSignup = () => {
    let user = localStorage.getItem("user");
    if (user) {
      // swal("Error!", "You are already login!", ERROR_IMAGE);
      setErrorModal(true)
    } else {
      router.push("/signup");
    }
  };

  const onClickPopupBtn = (route) => {
    setErrorModal(false);
    router.push(route);
  };

  useEffect(() => {}, [window.location]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 px-5 pt-5 text-center">
            <h1 className="font-96 font-mbl">
              Your health <br /> in your <br /> hands
            </h1>
          </div>
          <div className="col-12 col-lg-6 text-center">
            <img
              alt="Building"
              className="image-building "
              src={require("../assets/img/building.png")}
            />
          </div>
        </div>
        <div className="row margin-top-100">
          <div className="col-12 col-lg-6 text-center ">
            <img
              alt="Building"
              className="image-meter"
              src={require("../assets/img/two-meter.png")}
            />
          </div>
          <div className="col-12 col-lg-6 font-96 m-text-center m-mt-5">
            <h1 className="font-75 text-green">Have Symptoms?</h1>
            <h1 className="font-75">Stay Home</h1>
            <h1 className="font-75 text-green">Save Lives</h1>
          </div>
        </div>
        <div className="row  list-div m-text-center">
          <div className="col-12  d-px-5 ">
            <ul className="steps-list">
              <li className="text-green">How To Use Our Service?</li>
              <li>Step 1: Sign Up and Make an account</li>
              <li>Step 2: Login and go on “Symptom Tracker” </li>
              <li>
                Step 3: Answer the questions and get personalized health tips!
              </li>
              <li>
                Step 4: Go on “my dashboard” and review the progression of your
                symptoms on each day{" "}
              </li>
            </ul>
            <img
              alt="Building"
              className="mask-img"
              src={require("../assets/img/mask.png")}
            />
          </div>
          <div className=""></div>
          {/* <img
          alt="Building"
          className="mask-img"
          src={require("../assets/img/mask.png")}
        /> */}
        </div>
        <div className="row margin-top-100">
          <div className="col-12 col-lg-6 font-96 text-center">
            <img
              alt="Building"
              className="doctor-img"
              src={require("../assets/img/doctor.png")}
            />
          </div>
          <div className="col-12 col-lg-6 ">
            <ul className="steps-list doctor-list text-center">
              <li className="text-green">
                what can you do to stop the spread?
              </li>
              <li>
                there are many ways you could contribute and reduce the spread
                of the virus
              </li>
              <li>Some scientifically proven ways are:</li>
              <li>wearing a face mask .</li>
              <li>Keeping distance when outside .</li>
              <li>getting tested regularly .</li>
            </ul>
          </div>
        </div>
        <div className="row margin-top-100">
          <div className="col-12 col-lg-6 text-center">
            <p className="text-green mb-3 font-40">
              Your own personalized dashboard!
            </p>
            <img
              alt="Building"
              className="time-img"
              src={require("../assets/img/timetable.png")}
            />
            <div className="text-center mt-4">
              <button className="btn btn-danger" onClick={onClickDashboard}>
                dashboard
              </button>
            </div>
          </div>
          <div className="col-12 col-lg-6 text-center">
            <p className="text-green mb-3 font-40">Your own COVID Diary!</p>
            <img
              alt="Building"
              className="time-img"
              src={require("../assets/img/diary.png")}
            />
            <div className="text-center mt-4">
              <button className="btn btn-danger" onClick={onClickTracker}>
                tracker
              </button>
            </div>
          </div>
        </div>
        <div className="row margin-top-100">
          <div className="col-12 col-lg-6 text-center padding-top">
            <p className="text-green font-40">Dont Have A Account Yet?</p>
            <p className="font-40 mt-4">Sign up here in less than a minute</p>
            <div className="text-center mt-4">
              <button className="btn btn-danger" onClick={onClickSignup}>
                sign up
              </button>
            </div>
          </div>
          <div className="col-12 col-lg-6 text-center ">
            <img
              alt="Building"
              className="time-img"
              src={require("../assets/img/men.png")}
            />
          </div>
        </div>
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
      <Modal
        isOpen={errorModalDashboard}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 className="weight-700 font-outfit modal-heading text-center text-black">
          Oops!
        </h3>
        <div className="text-center">
          <img src={require("../assets/img/must.png")} width="150px" />
        </div>
        <h3 className="weight-700 my-2 font-outfit modal-heading text-center text-purple weight-500 mb-5">
          To use this page you must be signed in!
        </h3>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn bg-green text-black  mb-2"
            onClick={() => onClickPopupBtn("/signup")}
          >
            Sign up
          </button>
          <button
            type="button"
            className="btn bg-green text-black  mb-2"
            onClick={() => onClickPopupBtn("/signin")}
          >
            Login
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Home;
