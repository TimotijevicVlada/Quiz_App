import React, { useState} from "react";
import { Link } from "react-router-dom";

const Home = ({setCategory, setCountdown, setPoints, setPlayer, setQuestionNum, setQuestionNumbers, fetchQuestions}) => {
  const [dropdown, setDropdown] = useState(false);
  const [numberDropdown, setNumberDropdown] = useState(false);


  //Function that handle button to choose categories
  const handleButtons = (number) => {
      setDropdown(false);
      setCategory(number);
  }

  //Function that handle play button
  const handlePlay = () => {
    setCountdown(15);
    setPoints(0);
    setQuestionNum(1);
    fetchQuestions();
  }

  return (
    <div className="home">
      <div className="logo">
        <span className="logo_name">Quiz</span>
        <span className="logo_rectangle"></span>
      </div>
      
      <div className="menu">
        <div className="username">
          <input onChange={(e) => setPlayer(e.target.value)} type="text" placeholder="ENTER USERNAME"/>
      </div>
        <div onClick={() => setDropdown(!dropdown)} className="category">
          <span >SELECT CATEGORY</span>
          <i
            className={dropdown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          ></i>
          {dropdown && (
            <div className="dropdown">
                <div onClick={() => handleButtons(26)} className="celebrities">
                    CELEBRITIES
                </div >
                <div onClick={() => handleButtons(23)} className="history">
                    HISTORY
                </div>
                <div onClick={() => handleButtons(25)} className="art">
                    ART
                </div>
            </div>
          )}
        </div>
        <div className="q_numbers">
          <span onClick={() => setNumberDropdown(!numberDropdown)}>NUMBER OF QUESTIONS</span>
          <i onClick={() => setNumberDropdown(!numberDropdown)} className={numberDropdown ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
          <div className={numberDropdown ? "q_num" : "q_num unvisible"}>
            <input onChange={(e) => setQuestionNumbers(e.target.value)} type="number" max="20" min="2" placeholder="SET NUMBER"/>
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
