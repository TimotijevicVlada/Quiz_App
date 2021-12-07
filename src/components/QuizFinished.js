import React from "react";
import { Link } from "react-router-dom";

const QuizFinished = ({ points, player, totalTime }) => {

  
  return (
    <div className="finish">
      <div className="finish_data">
        <div className="name">
          <span>{player}</span>
        </div>
        <div className="finish_pts">
          <span>Points: {points}</span>
        </div>
        <div className="finish_time">
          <span>Total seconds: {totalTime}</span>
        </div>
        <Link to="/" className="finish_link">
          <div className="finish_time">
            <span>Play again</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuizFinished;
