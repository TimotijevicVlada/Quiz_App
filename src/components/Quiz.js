import React, { useState, useEffect, useCallback } from "react";

const Quiz = ({
  answers,
  setAnswers,
  questions,
  setQuestionNum,
  questionNum,
  setPoints,
  points,
  countdown,
  setCountdown,
  player,
  questionNumbers,
}) => {
  const [percentage, setPercentage] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  //Setting the current question
  useEffect(() => {
    setCurrentQuestion(questions[questionNum - 1]);
  }, [questions, questionNum]);


  //Funtion that handle current answer and shuffle it
  const handleCurrentAnswers = useCallback(() => {
    if (currentQuestion) {
      const incorrectAnsw = currentQuestion.incorrect_answers;
      const correctAnsw = currentQuestion.correct_answer;
      const allAnsw = [...incorrectAnsw, correctAnsw];
      //Shuffle answers
      for (let i = 0; i < allAnsw.length; i++) {
        let randomNum = Math.floor(Math.random() * allAnsw.length);
        let tempAnsw = "";
        let currentAnsw = allAnsw[i];
        let randomAnsw = allAnsw[randomNum];
        //swap answers
        tempAnsw = currentAnsw;
        allAnsw[i] = randomAnsw;
        allAnsw[randomNum] = tempAnsw;
      }
      //setAnswers
      setAnswers([
        { order: "A", answ: allAnsw[0] },
        { order: "B", answ: allAnsw[1] },
        { order: "C", answ: allAnsw[2] },
        { order: "D", answ: allAnsw[3] },
      ]);
    }
  }, [currentQuestion, setAnswers]);

  useEffect(() => {
    handleCurrentAnswers();
  }, [handleCurrentAnswers]);

  //Function that handle the skip button
  const handleSkip = () => {
    if (questionNum < questionNumbers) {
      setQuestionNum(questionNum + 1);
      setPoints(points - 5);
      setCountdown(20);
    } else {
      setTimeout(() => {
        document.location.replace("/finish");
      }, 1000);
    }
  };

  //Funtion that handle choosen answer
  const handleAnswer = (item) => {
    if (questionNum < questionNumbers) {
      setPoints(item === currentQuestion.correct_answer ? points + 10 : points - 5);
      setTimeout(() => {
        setQuestionNum(questionNum + 1);
        setCountdown(20);
      }, 1000);
    } else {
      setPoints(item === currentQuestion.correct_answer ? points + 10 : points - 5);
      setTimeout(() => {
        document.location.replace("/finish");
      }, 1000);
    }
  };

  //Function that handle percentage of progress bar on the bottom of the page
  const handlePercentage = useCallback(() => {
    let percent = 100 / questionNumbers;
    setPercentage(percent);
  }, [questionNumbers]);

  useEffect(() => {
    handlePercentage();
  }, [handlePercentage]);

  return (
    <div className="quiz">
      <div className="score">
        <div className="human_player">
          <span className="pts">{points} pts</span>
          <span className="player_name">{player}</span>
        </div>
      </div>
      <div className="timer">
        <i className={countdown < 6 ? "far fa-clock red" : "far fa-clock"}></i>
        <span className={countdown < 6 ? "time red" : "time"}>{countdown}</span>
      </div>
      <div className="quiz_content">
        <div className="q_number">
          <span>
            QUESTION {questionNum}/{questionNumbers}
          </span>
        </div>
        <div className="question">
          <span>{currentQuestion?.question}</span>
        </div>
        <div className="buttons">
          {answers?.map((item) => (
            <div onClick={() => handleAnswer(item.answ)} key={item.answ}>
              <span className="order_btn">{item.order}</span>
              <span className="answer">{item.answ}</span>
            </div>
          ))}
        </div>
      </div>
      <div onClick={handleSkip} className="skip">
        <span>SKIP</span>
      </div>
      <div className="progress_bar">
        <div
          className="percentage"
          style={{ width: `${percentage * questionNum}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Quiz;
