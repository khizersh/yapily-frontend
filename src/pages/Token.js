import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { BASE_URL, ERROR_IMAGE } from "../service/utility";

const Token = () => {
  const router = useHistory();
  const [tokenVerified, setTokenVerified] = useState(true);
  const [changeUser, setChangeUser] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();

  useEffect(() => {
    let token = query.get("token");
    if (token) {
      verifyToken(token);
    }
    let email = localStorage.getItem("user-email");
    console.log("user-email ", email);
  }, [query.get("token")]);

  const onChange = (e) => {
    setChangeUser({ ...changeUser, [e.target.name]: e.target.value });
  };

  const verifyToken = async (token) => {
    const response = await fetch(BASE_URL + "/token/validate", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    if (data && data.status == "0000") {
      setTokenVerified(true);
      localStorage.setItem("user-email", data.data.email);
      setEmail(data.data.email);
    } else if (data && data.status == "9999") {
      swal("Error!", data.message, ERROR_IMAGE).then((m) => {
        router.push("/signin");
      });
    } else {
      swal("Error!", "Something went wrong!", ERROR_IMAGE).then((m) => {
        router.push("/signin");
      });
    }
  };

  const onClickChangePassword = () => {
    const localEmail = JSON.parse(localStorage.getItem("user"));

    if (changeUser.newPassword == changeUser.confirmPassword) {
      let request = {
        email: email ? email : JSON.parse(localStorage.getItem("user")),
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
  };

  return (
    <div className="container-fluid min-height min-height-100 ">
      <div className="row">
        <div className="col-12 ">
          {tokenVerified ? (
            <div className="reset-password shadow">
              <h5 className="modal-heading  text-black text-center weight-500 mb-5">
                Reset Password
              </h5>
              <div>
                <div className="form-group mt-3">
                  <div class="form-group m-0">
                    <p className="text-black m-0">New Password</p>
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
                    <p className="text-black m-0">Confirm Password</p>
                    <input
                      type={`${showConfirmPassword ? "text" : "password"}`}
                      name="confirmPassword"
                      className="form-control"
                      onChange={(e) => onChange(e)}
                      id="your_pass"
                      placeholder="enter new password"
                    />
                    <img
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                      class="btn purple-bg text-white w-100 mb-2"
                      onClick={onClickChangePassword}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h3 className="text-white">Authenticating Please Wait...</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Token;
