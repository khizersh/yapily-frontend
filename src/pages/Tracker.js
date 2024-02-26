import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Slider from "../component/Slider";
import TreatmentList from "../component/TreatmentList";
import { BASE_URL, Data, ERROR_IMAGE } from "../service/utility";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Modal from "react-modal";

const Tracker = () => {
  const router = useHistory();
  const [currentQuestion, setCurrentQuestion] = useState(Data["1"]);
  const [action, setAction] = useState("");
  const [user, setUser] = useState({});
  const [end, setEnd] = useState(false);
  const [count, setCount] = useState(1);
  const [errorModal, setErrorModal] = useState(false);

  const [list, setList] = useState([]);
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {}, [currentQuestion]);

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

  const onClickAnswer = (btn) => {
    setAction(btn.action);
    setCurrentList(btn.list);
  };

  const onClickPopupBtn = (route) => {
    setErrorModal(false);
    router.push(route);
  };
  const onClickSubmit = async (selectedOption) => {
    // console.log("option : ", selectedOption, action);
    let userString = localStorage.getItem("user");
    let user = null;
    if (userString != null) {
      user = JSON.parse(userString);
    }
    if (user != null) {
      let request = {
        email: user.email,
        date: moment(new Date()).format("DD-MM-YYYY"),
        infoList: [
          {
            question: currentQuestion.question,
            answer: selectedOption,
            treatment: currentList,
          },
        ],
      };

      const response = await fetch(BASE_URL + "/info/save", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();

      if (data && data.status == "0000") {
        let currentCount = count + 1;
        setCount(currentCount);
      } else if (data && data.status == "9999") {
        swal("Error!", data.message, ERROR_IMAGE);
      } else {
        swal("Error!", "Something went wrong!", ERROR_IMAGE);
      }
      if (action != "end") {
        setCurrentQuestion(Data[action]);
        let option = Data[action].options.find(
          (opt) => opt.option == selectedOption
        );
        if (currentList?.length) {
          // let oldList = list;
          // currentList.forEach((element) => {
          //   oldList.push(element);
          // });
          setList(currentList);
        }
        // if (option?.list?.length) {
        //   let oldList = list;
        //   option.list.forEach((element) => {
        //     oldList.push(element);
        //   });
        //   setList(oldList);
        // }
      } else {
        setEnd(true);
      }
    } else {
      // swal("Error!", "Please login first!", ERROR_IMAGE).then((r) =>
      //   router.push("/signin")
      // );
      setErrorModal(true);
    }
  };

  return (
    <>
      <div className="min-height min-height-100">
        {end === false ? (
          <Slider
            data={currentQuestion}
            onClick={onClickAnswer}
            onClickSubmit={onClickSubmit}
            count={count}
          />
        ) : (
          <div className="slideshow-container thanks">
            <h3 className="weight-700 font-outfit modal-heading text-center text-black">
              Thank you for completing the questions.
            </h3>
            <div className="text-center">
              <img src={require("../assets/img/complete.png")} width="150px" />
            </div>
            <h3 className="weight-700 my-2 font-outfit modal-heading text-center text-black weight-700 mb-5">
              If you wish to view your dashboard click below
            </h3>
            <div className="text-center">
              <button
                type="button"
                className="btn bg-green text-black  mb-2"
                onClick={() =>
                  window.location.replace("/dashboard/admin/my-calender")
                }
              >
                Dashboard
              </button>
            </div>
          </div>
        )}

        <div className="list">
          {list.length ? <TreatmentList list={list} /> : <></>}
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

export default Tracker;
