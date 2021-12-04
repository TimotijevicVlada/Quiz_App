import React, { useState} from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [dropdown, setDropdown] = useState(false);

  

  return (
    <div className="home">
      <div className="logo">
        <span className="logo_name">Quiz</span>
        <span className="logo_rectangle"></span>
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
                onClick={() => setDropdown(false)}
                className="celebrities"
              >
                CELEBRITIES
              </Link>
              <Link
                to="/quiz"
                onClick={() => setDropdown(false)}
                className="history"
              >
                HISTORY
              </Link>
              <Link
                to="/quiz"
                onClick={() => setDropdown(false)}
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
