import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Modal from "react-modal";
import { BASE_URL, ERROR_IMAGE } from "../../service/utility";

const UserList = () => {
  const [selected, setSelected] = useState("halal-stock-search");
  const [page, setPage] = useState("");
  const [userName, setUserName] = useState("");
  const [sidebar, setSidebar] = useState([]);
  const [isClose, setIsClose] = useState(true);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userList, setUserList] = useState([]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
  const router = useHistory();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onClickEdit = (data) => {
    console.log("data in update : ", data);
    setUser(data);
    setIsOpen(true);
  };

  const onClickUpdate = async () => {
    const response = await fetch(BASE_URL + "/user/update", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();

    if (data && data.status == "0000") {
      swal("Success!", "User updated successfully!", "success").then((m) => {
        window.location.reload();
      });
    } else if (data && data.status == "9999") {
      swal("Error!", data.message, ERROR_IMAGE);
    } else {
      swal("Error!", "Something went wrong!", ERROR_IMAGE);
    }
  };

  const onClickDelete = async (user) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        let request = {
          email: user.email,
        };

        const response = await fetch(BASE_URL + "/user/delete", {
          method: "POST",
          body: JSON.stringify(request),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        const data = await response.json();

        if (data && data.status == "0000") {
          swal("Success!", "User deleted successfully!", "success").then(
            (m) => {
              window.location.reload();
            }
          );
        } else if (data && data.status == "9999") {
          swal("Error!", data.message, ERROR_IMAGE);
        } else {
          swal("Error!", "Something went wrong!", ERROR_IMAGE);
        }
      }
    });
  };

  const getUserList = async () => {
    const response = await fetch(BASE_URL + "/user/getUsers", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();

    if (data && data.status == "0000") {
      setUserList(data.data);
    } else if (data && data.status == "9999") {
      swal("Error!", data.message, ERROR_IMAGE);
    } else {
      swal("Error!", "Something went wrong!", ERROR_IMAGE);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <div className="container bg-white">
        <div className="row">
          <div className="col-12">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.length ? (
                  userList.map((m, inde) => (
                    <tr>
                      <th scope="row">{inde++}</th>
                      <td>{m.firstName}</td>
                      <td>{m.lastName}</td>
                      <td>{m.email}</td>
                      <td>{m.role}</td>
                      <td>
                        <i
                          className="fa fa-edit cursor-pointer"
                          onClick={() => onClickEdit(m)}
                        ></i>{" "}
                        <span className="margin-left-edit">
                          <i
                            className="fa fa-remove cursor-pointer"
                            onClick={() => onClickDelete(m)}
                          ></i>
                        </span>{" "}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
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
        <h5 className="modal-heading text-center text-green weight-500 mb-5">
          Update User
        </h5>
        <div>
          <div class="form-group ">
            <label>First Name</label>
            <input
              type={`text`}
              name="firstName"
              value={user.firstName}
              className="form-control"
              onChange={(e) => onChange(e)}
              id="your_pass"
              placeholder="enter first name"
            />
          </div>
          <div class="form-group ">
            <label>Last Name</label>
            <input
              type={`text`}
              name="lastName"
              value={user.lastName}
              className="form-control"
              onChange={(e) => onChange(e)}
              id="your_pass"
              placeholder="enter last name"
            />
          </div>
          <div class="form-group ">
            <label>Email</label>
            <input
              type={`text`}
              name="email"
              value={user.email}
              className="form-control "
              onChange={(e) => onChange(e)}
              id="your_pass"
              placeholder="enter email"
            />
          </div>
          <div class="form-group ">
            <label>Password</label>
            <input
              type={`text`}
              name="password"
              value={user.password}
              className="form-control "
              onChange={(e) => onChange(e)}
              id="your_pass"
              placeholder="enter password"
            />
          </div>
          <div>
            <button className="btn bg-green text-white w-50" onClick={onClickUpdate}>Update</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserList;
