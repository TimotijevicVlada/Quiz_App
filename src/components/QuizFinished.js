import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { QuizContext } from "../context/Context";

const QuizFinished = ({ pointsComp1, pointsComp2 }) => {

  const {player, playerScore} = useContext(QuizContext);
  
  return (
    <div className="finish">
      <div className="finish_data">
        <div className="name">
          <span>{player.name}</span>
        </div>
        <div className="finish_pts">
          <span>Points: {playerScore.points}</span>
        </div>
        <div className="correct_answer">
          <span>Correct answers: {playerScore.correctAnswers}</span>
        </div>
        <div className="wrong_answer">
          <span>Wrong answers: {playerScore.wrongAnswers}</span>
        </div>
        <div className="finish_time">
          <span>Total seconds: {playerScore.totalTime}</span>
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
