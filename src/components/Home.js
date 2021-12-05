import React, { useState} from "react";
import { Link } from "react-router-dom";

const Home = ({setCategory, setCountdown, setPoints, setPlayer}) => {
  const [dropdown, setDropdown] = useState(false);


  //Function that handle button to choose categories
  const handleButtons = (number) => {
      setDropdown(false);
      setCategory(number);
      setCountdown(20);
      setPoints(0);
  }

  return (
    <div className="home">
      <div className="logo">
        <span className="logo_name">Quiz</span>
        <span className="logo_rectangle"></span>
      </div>
      <div className="username">
          <input onChange={(e) => setPlayer(e.target.value)} type="text" placeholder="ENTER USERNAME"/>
      </div>
      <div className="menu">
        <div onClick={() => setDropdown(!dropdown)} className="category">
          <span >SELECT CATEGORY</span>
          <i
            className={dropdown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          ></i>
          {dropdown && (
            <div className="dropdown">
              <Link
                to="/quiz"
                onClick={() => handleButtons(26)}
                className="celebrities"
              >
                CELEBRITIES
              </Link>
              <Link
                to="/quiz"
                onClick={() => handleButtons(23)}
                className="history"
              >
                HISTORY
              </Link>
              <Link
                to="/quiz"
                onClick={() => handleButtons(25)}
                className="art"
              >
                ART
              </Link>
            </div>
          )}
        </div>
        <div className="q_numbers">
          <span>NUMBER OF QUESTIONS</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </div>
  );
};

export default Home;
