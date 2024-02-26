import React, { useState, useEffect } from "react";
import "../assets/css/layout.css";
import "../assets/css/home1.css";
import "../assets/css/dashboard.css";
import { FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Modal from "react-modal";
import { BASE_URL, ERROR_IMAGE } from "../service/utility";
// import { getSymbols } from "utility";

export const DashboardLayout = (props) => {
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
  const router = useHistory();

  const [selected, setSelected] = useState("halal-stock-search");
  const [page, setPage] = useState("");
  const [userName, setUserName] = useState("");
  const [sidebar, setSidebar] = useState([]);
  const [isClose, setIsClose] = useState(true);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    freeUser: "",
  });

  const [changeUser, setChangeUser] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onClickChangePassword = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData.password === changeUser.password) {
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
                (m) => {
                  router.push("/");
                }
              );
            } else if (data && data.status == "9999") {
              swal("Error!", data.message, ERROR_IMAGE);
            } else {
              swal("Error!", "Something went wrong!", ERROR_IMAGE);
            }
          });
      } else {
        swal("Oops!", "Password not matched.", ERROR_IMAGE);
      }
    } else {
      swal("Error!", "Enter valid current password!.", ERROR_IMAGE);
    }
  };

  function getList() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role == "admin") {
        return [
          {
            key: "",
            url: "/",
            name: "Home",
            icon: "fa fa-home",
            active: true,
            hr: false,
            home: true,
          },
          {
            key: "user",
            url: "/dashboard/admin/user",
            name: "User List",
            icon: "fa fa-user",
            active: true,
            hr: false,
          },
          // {
          //   key: "my-calender",
          //   url: "/dashboard/admin/my-calender",
          //   name: "User Calender",
          //   icon: "fa fa-user",
          //   active: true,
          //   hr: false,
          // },
          {
            key: "logout",
            url: "/dashboard/logout",
            name: "Logout",
            icon: "fa fa-sign-out",
            active: false,
            hr: false,
            onClick: logout,
          },
        ];
      } else {
        return [
          {
            key: "",
            url: "/",
            name: "Home",
            icon: "fa fa-home",
            active: true,
            hr: false,
            home: true,
          },
          {
            key: "my-calender",
            url: "/dashboard/admin/my-calender",
            name: "User Calender",
            icon: "fa fa-user",
            active: true,
            hr: false,
          },
          {
            key: "logout",
            url: "/dashboard/logout",
            name: "Logout",
            icon: "fa fa-sign-out",
            active: false,
            hr: false,
            onClick: logout,
          },
        ];
      }
    } else {
      return [];
    }
  }

  function onClick(sidebar) {
    setSelected(sidebar.key);
    if (sidebar.onClick) {
      sidebar.onClick();
    }
    console.log("click : ", sidebar);
    setIsClose(true);
    if (sidebar.home) {
      window.location.replace("/");
    }
  }

  function getPageNameByKey(key) {
    let name = getList().find((m) => m.key == key);
    console.log("name : ", name);
    if (name) {
      return name.name;
    } else {
      return "";
    }
  }

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

  const [text, setText] = useState("");
  const [symbol, setSymbol] = useState("");

  const onClickSuggest = (data) => {
    setText(data);
    setSymbol("");
  };

  const onChangeText = (data) => {
    setText(data);
    setSymbol(data);
  };

  useEffect(() => {
    let user = localStorage.getItem("user");

    if (user) {
      let userData = JSON.parse(user);
      if (userData.email) {
        setSidebar(getList());
      } else {
        swal("Oops!", "You are not logged in!", ERROR_IMAGE).then((m) => {
          window.location.replace("/");
        });
      }
    } else {
      swal("Oops!", "You are not logged in!", ERROR_IMAGE).then((m) => {
        window.location.replace("/");
        // router.push("/");
      });
    }
    setPage(getPageNameByKey(selected));
  }, [selected]);

  const onClickClose = () => {
    setIsClose(!isClose);
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const onClickSearch = () => {
    if (search) {
      router.push("/dashboard/halal-stock-search?symbol=" + search);
    }
  };

  const onChange = (e) => {
    setChangeUser({ ...changeUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let url = window.location.href;
    let matchSidebar = getList().find((side) => url.includes(side.key));
    if (matchSidebar && matchSidebar.key) {
      setSelected(matchSidebar.key);
    }
  }, [window.location.href]);

  return (
    <>
      <header className="bg-white">
        {/* navbar */}
        <div className="container-fluid w-100 position-sticky bg-white shadow-sm">
          <div className="row">
            <div className="col-2 d-sm-none"></div>
            <div className="col-12 col-lg-12 h-50px pt-2">
              <div className="row">
                <div className="col-4 col-lg-4">
                  <p className="weight-700 mbl-font-13 text-black m-left-05 d-ml">
                    <span>
                      <i
                        class="fa fa-bars pr-2 d-lg-none"
                        onClick={onClickClose}
                      ></i>
                    </span>
                    {page.length > 10 ? page.slice(0, 11) + ".." : page}
                  </p>
                </div>
                <div className="col-8 col-lg-8 text-right ">
                  <div className="float-right">
                    <i className="fa fa-user"></i> Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* sidebar */}
        <nav
          id="sidebarMenu"
          className={`collapse ${
            isClose ? "d-none" : "d-block"
          } d-lg-block sidebar collapse  bg-sidebar`}
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush  mt-2">
              <div className="d-flex justify-content-between">
                <span>
                  <Link
                    to="/dashboard/halal-stock-search"
                    className="text-black"
                  >
                    {/* <img
                      className="pl-3 mb-4"
                      src={require("assets/img/brand/logo.png")}
                      width="150px"
                    /> */}
                  </Link>
                </span>
                <span className="cross" onClick={onClickClose}>
                  <i class="fa fa-close"></i>
                </span>
              </div>
              {sidebar.length > 0 ? (
                sidebar.map((side, ind) => {
                  return (
                    <>
                      <Link
                        className="text-black text-decoration-none"
                        to={side.url}
                      >
                        <div
                          onClick={() => onClick(side)}
                          className={`list-group-item list-group-item-action py-2 ripple ${
                            side.key == selected ? "active" : ""
                          } ${side.hr ? "border-bottom mt-3" : "border-none"} `}
                        >
                          <i
                            className={`${side.icon} pr-2`}
                            aria-hidden="true"
                          ></i>
                          <span className="pl-3">{side.name}</span>
                        </div>
                      </Link>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </nav>
      </header>

      <div style={{ marginTop: "58px"  }} className="container-fluid ">
        <div className="row">
          <div className="col-2 d-none-sm"></div>
          <div className="col-12 col-lg-10 ">{props.children}</div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 className="modal-heading text-center text-green weight-500 mb-5">
          Change Password
        </h5>
        <div>
          <div className="form-group mt-3">
            <div class="form-group m-0">
              <p for="your_name">Current Password</p>
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                className="p-0 "
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
            </div>
            <div class="form-group m-0">
              <p for="your_name">New Password</p>
              <input
                type={`${showNewPassword ? "text" : "password"}`}
                name="newPassword"
                className="p-0 "
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
              <p for="your_name">Confirm Password</p>
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                name="confirmPassword"
                className="p-0 "
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
                class="btn bg-green text-white w-100 mb-2"
                onClick={onClickChangePassword}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
