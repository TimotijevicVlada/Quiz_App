import React, { useState, useEffect, useCallback, useContext } from "react";
import Player from "./Player";
import Qnumber from "./Qnumber";
import Question from "./Question";
import Answers from "./Answers";
import ProgressBar from "./ProgressBar";
import QuizFinished from "./QuizFinished";
import useSound from "use-sound";
import correct from "../assets/correct_answer.mp3";
import wrong from "../assets/wrong_answer.mp3";
import skip from "../assets/skip.wav";
import { QuizContext } from "../context/Context";

const Quiz = ({
  answers,
  setAnswers,
  setQuestionNum,
  questionNum,
  countdown,
  setCountdown,
  finishVisible,
  setFinishVisible,
  setStopTimer,
  setPointsComp1,
  setPointsComp2,
  pointsComp1,
  pointsComp2
}) => {

  const {player, playerScore, setPlayerScore} = useContext(QuizContext);

  const [percentage, setPercentage] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [correctSound] = useSound(correct);
  const [wrongSound] = useSound(wrong);
  const [skipSound] = useSound(skip);


  //Setting the current question
  useEffect(() => {
    setCurrentQuestion(player.questions[questionNum - 1]);
  }, [player.questions, questionNum]);

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
    if (questionNum < player.numberOfQuestions) {
      setQuestionNum(questionNum + 1);
      setPlayerScore({...playerScore, points: playerScore.points - 5, wrongAnswers: playerScore.wrongAnswers + 1});
      setCountdown(15);
      setPointsComp1(pointsComp1 - 5);
      setPointsComp2(pointsComp2 - 5);
      skipSound();
    } else {
      setPlayerScore({...playerScore, points: playerScore.points - 5, wrongAnswers: playerScore.wrongAnswers + 1});
      setStopTimer(false);
      setPointsComp1(pointsComp1 - 5);
      setPointsComp2(pointsComp2 - 5);
      skipSound();
      setTimeout(() => {
        setFinishVisible(true);
      }, 1000);
    }
  };

  
  //Funtion that handle choosen answer
  const handleAnswer = (item) => {
    if (questionNum < player.numberOfQuestions) {
      //Handle comp1 players answers
      if(answers[Math.floor(Math.random() * 4)].answ === currentQuestion.correct_answer) {
        setPointsComp1(pointsComp1 + 10);
      } else {
        setPointsComp1(pointsComp1 - 5);
      }
      //Handle comp2 players answers
      if(answers[Math.floor(Math.random() * 4)].answ === currentQuestion.correct_answer) {
        setPointsComp2(pointsComp2 + 10);
      } else {
        setPointsComp2(pointsComp2 - 5);
      }
      //Handle human player answer
      if (item === currentQuestion.correct_answer) {
        correctSound();
        setPlayerScore({...playerScore, points: playerScore.points + 10, correctAnswers: playerScore.correctAnswers + 1});
      } else {
        wrongSound();
        setPlayerScore({...playerScore, points: playerScore.points - 5, wrongAnswers: playerScore.wrongAnswers + 1});
      }
      setTimeout(() => {
        setQuestionNum(questionNum + 1);
        setCountdown(15);
      }, 1000);
    } else {
      if (item === currentQuestion.correct_answer) {
        setPlayerScore({...playerScore, points: playerScore.points + 10, correctAnswers: playerScore.correctAnswers + 1});
        correctSound();
      } else {
        setPlayerScore({...playerScore, points: playerScore.points - 5, wrongAnswers: playerScore.wrongAnswers + 1});
        wrongSound();
      }
      setStopTimer(false);
      setTimeout(() => {
        setFinishVisible(true);
      }, 1000);
    }
  };

  //Function that handle percentage of progress bar on the bottom of the page
  const handlePercentage = useCallback(() => {
    let percent = 100 / player.numberOfQuestions;
    setPercentage(percent);
  }, [player.numberOfQuestions]);

  useEffect(() => {
    handlePercentage();
  }, [handlePercentage]);

  return (
    <div className="quiz">
      {!finishVisible ? (
        <div className="quiz_questions">
          <div className="score">
            <Player pointsComp1={pointsComp1} pointsComp2={pointsComp2}/>
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
        <QuizFinished
          pointsComp1={pointsComp1}
          pointsComp2={pointsComp2}
        />
      )}
    </div>
  );
};

export default Quiz;
