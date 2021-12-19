import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import startMusic from "../assets/start_sound.mp3";
import { QuizContext } from "../context/Context";

const Home = ({
  setCountdown,
  setQuestionNum,
  setFinishVisible,
  setStopTimer,
  setPointsComp1,
  setPointsComp2
}) => {

  const {player, setPlayer, playerScore, setPlayerScore} = useContext(QuizContext);


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
    setPlayer({...player, category: number});
  };

  //Function that handle play button
  const handlePlay = () => {
    startSound();
    setCountdown(15);
    setQuestionNum(1);
    setFinishVisible(false);
    setStopTimer(true);
    setPointsComp1(0);
    setPointsComp2(0);
    setPlayerScore({...playerScore, points: 0, totalTime: 0, correctAnswers: 0, wrongAnswers: 0})
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
            onChange={(e) => setPlayer({...player, name: e.target.value})}
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
            <span>NUMBER OF QUESTIONS {player.numberOfQuestions}</span>
            <i
              className={
                numberDropdown ? "fas fa-chevron-up" : "fas fa-chevron-down"
              }
            ></i>
          </div>

          <div  className={numberDropdown ? "q_num" : "q_num unvisible"}>
            <input
              onChange={(e) => setPlayer({...player, numberOfQuestions: e.target.value})}
              type="number"
              max="20"
              min="2"
              placeholder="Write number..."
            />
          </div>
        </div>
        <Link to="/quiz" onClick={handlePlay} className="play">
            PLAY
        </Link>
      </div>
    </div>
  );
};

export default Home;
