import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL, ERROR_IMAGE } from "../service/utility";
import "../assets/css/common.css";

const DesktopHeader = () => {
  const router = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selected, setSelected] = useState("halal-stock-search");
  const [page, setPage] = useState("");
  const [sidebar, setSidebar] = useState([]);
  const [isClose, setIsClose] = useState(true);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [changeUser, setChangeUser] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  function closeModal() {
    setIsOpen(false);
  }

  const onClickChangePassword = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData.email) {
      if (changeUser.newPassword == changeUser.confirmPassword) {
        let request = {
          email: userData.email,
          password: changeUser.newPassword,
        };
        fetch(BASE_URL + "/user/reset", {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.status == "0000") {
              localStorage.setItem("user", JSON.stringify(data.data));
              swal("Success!", "Password reset successfully!", "success").then(
                (m) => closeModal()
              );
            } else if (data && data.status == "9999") {
              swal("Error!", data.message, ERROR_IMAGE);
            } else {
              swal("Error!", "Something went wrong!", ERROR_IMAGE);
            }
          });
      } else {
        swal("Oops!", "Password not matched.", "warning");
      }
    } else {
      swal("Error!", "Login first!", ERROR_IMAGE);
    }
  };
  const onChange = (e) => {
    setChangeUser({ ...changeUser, [e.target.name]: e.target.value });
  };
  const onClickCalender = (e) => {
    if (userName) {
      window.location.replace("/dashboard/admin/my-calender");
    } else {
      // swal("Oops!", "you are not logged in!", ERROR_IMAGE);
      setErrorModal(true);
    }
  };

  useEffect(() => {
    // const userData = JSON.parse(localStorage.getItem("user"));
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user) {
        let name = user.lastName ? user.lastName : user.firstName;
        setUserName(name);
      }
    }
  }, [userName]);

  const onClickPopupBtn = (route) => {
    setErrorModal(false);
    router.push(route);
  };

  function logout() {
    let user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("user");
      swal("Success!", "Logout successfully!", "success").then((m) => {
        window.location.replace("/");
        // router.push("/");
      });
    }
  }

  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-4">
            <Link to={"/"} className="text-decoration-none font-17">
              Home
            </Link>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-2 text-center">
                {/* <Link to={"/"} className="text-decoration-none font-17">
                  who are we?
                </Link> */}
              </div>
              <div className="col-3 text-center ">
                <Link to={"/tracker"} className="text-decoration-none font-17">
                  Symptoms tracker
                </Link>
              </div>
              <div className="col-2 text-center">
                <a
                  className="text-decoration-none font-17 cursor-pointer"
                  onClick={() => onClickCalender()}
                >
                  my dashboard
                </a>
              </div>

              <div className="col-2 text-center">
                {/* <Link to={"/signin"} className="text-decoration-none font-17">login/signup</Link> */}
                {userName ? (
                  <div class="dropdown">
                    <button class="dropbtn">
                      {/* <i class="fa fa-user-circle-o" aria-hidden="true"></i> */}
                      <img
                        alt="Building"
                        className="user-img"
                        src={require("../assets/img/teamwork.png")}
                      />
                      <text className="text-decoration-none pl-1 font-15 text-white">
                        {userName}
                      </text>
                    </button>
                    <div class="dropdown-content border-radius-10 text-left p-2 text-black">
                      <p className="text-black border-bottom">
                        Username :{" "}
                        <text className="weight-600">{userName}</text>
                        {/* Username : <text className="weight-600">{userName}</text> */}
                      </p>
                      <p
                        className="cursor-pointer text-black onHoverGreen"
                        onClick={() => setIsOpen(true)}
                      >
                        <i class="fa fa-unlock-alt" aria-hidden="true"></i>{" "}
                        Change Password
                      </p>
                      <p
                        className="cursor-pointer text-black onHoverGreen"
                        onClick={() => logout()}
                      >
                        <i className="fa fa-sign-out"></i> Logout
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link to={"/signin"} className="text-decoration-none font-17">
                    login/signup
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 className="modal-heading text-center text-purple weight-500 mb-5">
          Change Password
        </h5>
        <div>
          <div className="form-group mt-3">
            {/* <div class="form-group m-0">
              <p  className="text-black">Current Password</p>
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                className="form-control"
                onChange={(e) => onChange(e)}
                id="your_pass"
                placeholder="enter new password"
              />
              <img
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon cursor-pointer"
                src={require(`../assets/img/${
                  showPassword ? "hide" : "eye"
                }.png`)}
                width="16px"
                alt="sing up image"
              />
            </div> */}
            <div class="form-group m-0">
              <p className="text-black">New Password</p>
              <input
                type={`${showNewPassword ? "text" : "password"}`}
                name="newPassword"
                className="form-control"
                onChange={(e) => onChange(e)}
                id="your_pass"
                placeholder="enter new password"
              />
              <img
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="eye-icon cursor-pointer"
                src={require(`../assets/img/${
                  showNewPassword ? "hide" : "eye"
                }.png`)}
                width="16px"
                alt="sing up image"
              />
            </div>
            <div class="form-group m-0">
              <p className="text-black">Confirm Password</p>
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                name="confirmPassword"
                className="form-control"
                onChange={(e) => onChange(e)}
                id="your_pass"
                placeholder="enter new password"
              />
              <img
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="eye-icon cursor-pointer"
                src={require(`../assets/img/${
                  showConfirmPassword ? "hide" : "eye"
                }.png`)}
                width="16px"
                alt="sing up image"
              />
            </div>
            <div className="form-group mt-3">
              <button
                type="button"
                className="btn purple-bg text-white w-100 mb-2"
                onClick={onClickChangePassword}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={errorModal}
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

export default DesktopHeader;
