import React, { useEffect, useState } from "react";
import "../assets/css/slider.css";
import { Data } from "../service/utility";

const Slider = ({ data, onClick, onClickSubmit , count }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectBtn, setSelectBtn] = useState("");
  const [selectAnswer, setSelectAnswer] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: [],
  });
  useEffect(() => {
    setSelectAnswer("")
    showSlides(slideIndex);
    setCurrentQuestion(data);
  }, [data]);

  // Next/previous controls
  let slideCount = 0;
  function plusSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let slideLength = slides.length;

    if (slideCount == 0 && n < 0) {
      slideCount = slideLength - 1;
    } else {
      slideCount = slideCount + n;
      slideCount = slideCount % slideLength;
    }
    showSlides(slideCount);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    setSlideIndex(n);
    showSlides(n);
  }

  function showSlides(slideNumber) {
    // let i;

    // let slides = document.getElementsByClassName("mySlides");
    // let dots = document.getElementsByClassName("dot");
    // for (i = 0; i < slides.length; i++) {
    //   slides[i].style.display = "none";
    // }
    // slides[slideNumber].style.display = "block";
    // dots[slideNumber].className += " active";
  }

  function onClickAnswer(action, option) {
    onClick(action);
    setSelectAnswer(option);
  }
  return (
    <>
      <div className="slideshow-container">
        <div className="mySlides fadee">
          <div className="bg-green p-3 text-center">
            <h1 className="text-black weight-800 font-outfit">
              Record Your Symptoms and receive personalized tips!
            </h1>
            <img
              alt="Building"
              className="question-img"
              src={require("../assets/img/question.png")}
            />
            <p className="font-25 font-outfit text-black font-800">
            {count} - {currentQuestion?.question}
            </p>
            <div className="d-flex justify-content-around mt-4">
              {currentQuestion?.options?.length
                ? currentQuestion.options.map((btn) => (
                    <button
                      className={`btn ${
                        selectAnswer == btn.option ? "btn-danger" : "btn-light"
                      }`}
                      onClick={() => onClickAnswer(btn, btn.option)}
                    >
                      {btn.option}
                    </button>
                  ))
                : ""}

              {/* <button className={`btn ${selectBtn == 'no' ? "btn-danger" : "btn-light"}`} onClick={() => setSelectBtn('no')}>No</button> */}
            </div>
            <div>
              <button className="btn btn-success mt-5" onClick={() => onClickSubmit(selectAnswer)}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
        {/* 
        <div className="mySlides fadee">
          <div className="bg-green p-3">
            <h1 className="text-black weight-800 font-outfit">
              Record Your Symptoms and receive personalized tips!
            </h1>
            <img
              alt="Building"
              className=""
              src={require("../assets/img/question.png")}
            />
            <h2 className="text-black">
              2 - Have you been tested positive for COVID 19?
            </h2>
            <div className="d-flex">
              <buttonbtn className="btn btn-danger">Yes</buttonbtn>
              <buttonbtn className="btn btn-danger">No</buttonbtn>
            </div>
          </div>
        </div> */}

        {/* <div className="mySlides fadee">
          <div className="bg-green p-3">
            <h1 className="text-black weight-800 font-outfit">
              Record Your Symptoms and receive personalized tips!
            </h1>
            <img
              alt="Building"
              className=""
              src={require("../assets/img/question.png")}
            />
            <h2>3 - Have you been tested positive for COVID 19?</h2>
            <div className="d-flex">
              <buttonbtn className="btn btn-danger">Yes</buttonbtn>
              <buttonbtn className="btn btn-danger">No</buttonbtn>
            </div>
          </div>
        </div> */}
        {/* 
        <a className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a> */}
        {/* <a className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a> */}
      </div>
      <br />

      {/* <div className="text-center">
        <span className="dot" onClick={() => currentSlide(0)}></span>
        <span className="dot" onClick={() => currentSlide(1)}></span>
        <span className="dot" onClick={() => currentSlide(2)}></span>
      </div> */}
    </>
  );
};

export default Slider;
