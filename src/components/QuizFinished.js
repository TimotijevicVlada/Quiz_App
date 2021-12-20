import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {QuizContext} from "../context/Context";

const QuizFinished = ({ points, totalTime, correctAnswerNumber, wrongAnswerNumber, pointsComp1, pointsComp2 }) => {

const {player} = useContext(QuizContext);
  
  return (
    <div className="finish">
      <div className="finish_data">
        <div className="name">
          <span>{player}</span>
        </div>
        <div className="finish_pts">
          <span>Points: {points}</span>
        </div>
        <div className="correct_answer">
          <span>Correct answers: {correctAnswerNumber}</span>
        </div>
        <div className="wrong_answer">
          <span>Wrong answers: {wrongAnswerNumber}</span>
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
      <div className="comps_results">
        <div>Computer 1</div>
        <div>Points: {pointsComp1}</div>
      </div>
      <div className="comps_results">
        <div>Computer 2</div>
        <div>Points: {pointsComp2}</div>
      </div>

    </div>
  );
};

export default QuizFinished;

