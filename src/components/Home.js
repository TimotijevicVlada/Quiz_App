import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import startMusic from "../assets/start_sound.mp3";

const Home = ({
  setCategory,
  setCountdown,
  setPoints,
  setPlayer,
  setQuestionNum,
  setQuestionNumbers,
  fetchQuestions,
  setFinishVisible,
  setStopTimer,
  setTotalTime,
  questionNumbers,
  setCorrectAnswerNumber,
  setWrongAnswerNumber,
  setPointsComp1,
  setPointsComp2
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [numberDropdown, setNumberDropdown] = useState(false);
  const [selectCategory, setSelectCategory] = useState("SELECT CATEGORY");

  const [startSound] = useSound(startMusic);

  const numRef = useRef();
  const categoryRef = useRef();

  //Function that handle button to choose categories
  const handleButtons = (number) => {
    if(number === 26) {
      setSelectCategory("CELEBRITIES"); 
    } else if(number === 23) {
      setSelectCategory("HISTORY"); 
    } else {
      setSelectCategory("ART"); 
    }
    setDropdown(false);
    setCategory(number);
  };

  //Function that handle play button
  const handlePlay = () => {
    startSound();
    setCountdown(15);
    setPoints(0);
    setQuestionNum(1);
    fetchQuestions();
    setFinishVisible(false);
    setStopTimer(true);
    setTotalTime(0);
    setCorrectAnswerNumber(0);
    setWrongAnswerNumber(0);
    setPointsComp1(0);
    setPointsComp2(0);
  };

   //Function that exit the form number on click out
   const handleExit = (e) => {
    if(!numRef.current.contains(e.target) && !categoryRef.current.contains(e.target)) {
      setNumberDropdown(false);
      setDropdown(false);
    }
  }

  return (
    <div onClick={handleExit} className="home">
      <div className="logo">
        <span className="logo_name">Quiz</span>
        <span className="logo_rectangle"></span>
      </div>

      <div className="menu">
        <div className="username">
          <input
            onChange={(e) => setPlayer(e.target.value)}
            type="text"
            placeholder="ENTER USERNAME"
          />
        </div>
        <div ref={categoryRef} onClick={() => setDropdown(!dropdown)} className="category">
          <span>{selectCategory}</span>
          <i
            className={dropdown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          ></i>
          {dropdown && (
            <div  className="dropdown">
              <div onClick={() => handleButtons(26)} className="celebrities">
                CELEBRITIES
              </div>
              <div onClick={() => handleButtons(23)} className="history">
                HISTORY
              </div>
              <div onClick={() => handleButtons(25)} className="art">
                ART
              </div>
            </div>
          )}
        </div>
        <div ref={numRef} className="q_numbers">
          <div
            onClick={() => setNumberDropdown(!numberDropdown)}
            className="q_numbers_wrapper"
          >
            <span>NUMBER OF QUESTIONS {questionNumbers}</span>
            <i
              className={
                numberDropdown ? "fas fa-chevron-up" : "fas fa-chevron-down"
              }
            ></i>
          </div>

          <div  className={numberDropdown ? "q_num" : "q_num unvisible"}>
            <input
              onChange={(e) => setQuestionNumbers(e.target.value)}
              type="number"
              max="20"
              min="2"
              placeholder="Write number..."
            />
          </div>
        </div>
        <Link to="/quiz" onClick={handlePlay} className="play">
          <button>PLAY</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
