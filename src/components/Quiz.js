import React, { useState, useEffect, useCallback } from "react";
import Player from "./Player";
import Qnumber from "./Qnumber";
import Question from "./Question";
import Answers from "./Answers";
import ProgressBar from "./ProgressBar";
import QuizFinished from "./QuizFinished";

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
  finishVisible,
  setFinishVisible,
  setStopTimer
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
      setCountdown(15);
    } else {
      setPoints(points - 5);
      setStopTimer(false);
      setTimeout(() => {
        setFinishVisible(true);
      }, 1000);
    }
  };

  //Funtion that handle choosen answer
  const handleAnswer = (item) => {
    if (questionNum < questionNumbers) {
      setPoints(
        item === currentQuestion.correct_answer ? points + 10 : points - 5
      );
      setTimeout(() => {
        setQuestionNum(questionNum + 1);
        setCountdown(15);
      }, 1000);
    } else {
      setPoints(
        item === currentQuestion.correct_answer ? points + 10 : points - 5
      );
      setStopTimer(false);
      setTimeout(() => {
        setFinishVisible(true);
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
      {!finishVisible ? (
        <div className="quiz_questions">
          <div className="score">
            <Player points={points} player={player} />
          </div>
          <div className="timer">
            <i
              className={countdown < 6 ? "far fa-clock red" : "far fa-clock"}
            ></i>
            <span className={countdown < 6 ? "time red" : "time"}>
              {countdown}
            </span>
          </div>
          <div className="quiz_content">
            <Qnumber
              questionNum={questionNum}
              questionNumbers={questionNumbers}
            />
            <Question currentQuestion={currentQuestion} />
            <Answers answers={answers} handleAnswer={handleAnswer} />
          </div>
          <div onClick={handleSkip} className="skip">
            <span>SKIP</span>
          </div>
          <ProgressBar percentage={percentage} questionNum={questionNum} />
        </div>
      ) : (
        <QuizFinished points={points} player={player}/>
      )}
    </div>
  );
};

export default Quiz;
