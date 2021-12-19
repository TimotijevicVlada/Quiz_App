import React, { useState, useEffect, useCallback, useContext } from "react";
import "./style/App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {QuizContext} from "./context/Context";


const App = () => {

  //Distructure object from Context Api
  const {player, playerScore, setPlayerScore} = useContext(QuizContext);

  const [answers, setAnswers] = useState(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [pointsComp1, setPointsComp1] = useState(0);
  const [pointsComp2, setPointsComp2] = useState(0);
  const [countdown, setCountdown] = useState(15);
  const [finishVisible, setFinishVisible] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);



  //Countdown timer
  const handleCountdown = useCallback(() => {
    if (stopTimer) {
      if (countdown > 0) {
        setCountdown(countdown - 1);
        setPlayerScore({...playerScore, totalTime: playerScore.totalTime + 1});
      } else {
        if (questionNum < player.numberOfQuestions) {
          setPlayerScore({...playerScore, points: playerScore.points - 10, wrongAnswers: playerScore.wrongAnswers + 1});
          setQuestionNum(questionNum + 1);
          setCountdown(15);
          setPointsComp1(pointsComp1 - 5);
          setPointsComp2(pointsComp2 - 5);
        } else {
          setPlayerScore({...playerScore, points: playerScore.points - 10, wrongAnswers: playerScore.wrongAnswers + 1});
          setStopTimer(false);
          setFinishVisible(true);
          setPointsComp1(pointsComp1 - 5);
          setPointsComp2(pointsComp2 - 5);
        }
      }
    }
  }, [player.numberOfQuestions, countdown, playerScore, setPlayerScore, questionNum, stopTimer, pointsComp1, pointsComp2]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleCountdown();
    }, 1000);
    return () => clearInterval(interval);
  }, [handleCountdown]);


  /*
  //Function that get question
  const getQuestionStorage = () => {
    if (localStorage.getItem("question") === null) {
      localStorage.setItem("question", JSON.stringify([]));
    } else {
      const questionLocalStorage = JSON.parse(localStorage.getItem("question"));
      setQuestions(questionLocalStorage);
    }
  };
  useEffect(() => {
    getQuestionStorage();
  }, []);

  //Function that save favorite item to local storage
  const saveQuestionStorage = useCallback(() => {
    localStorage.setItem("question", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    saveQuestionStorage();
  }, [saveQuestionStorage]);

  //Save points to the local storage
  const getPlayerValue = () => {
    if (localStorage.getItem("points") === null) {
      localStorage.setItem(
        "points",
        JSON.stringify({ name: "HUMAN PLAYER", points: 0 })
      );
    } else {
      const points = JSON.parse(localStorage.getItem("points"));
      setPoints(points.points);
      setPlayer(points.name);
    }
  };

  useEffect(() => {
    getPlayerValue();
  }, []);

  //Function that save favorite item to local storage
  const savePlayerValue = useCallback(() => {
    localStorage.setItem(
      "points",
      JSON.stringify({ name: player, points: points })
    );
  }, [points, player]);

  useEffect(() => {
    savePlayerValue();
  }, [savePlayerValue]);*/

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setCountdown={setCountdown}
                setQuestionNum={setQuestionNum}
                setFinishVisible={setFinishVisible}
                setStopTimer={setStopTimer}
                setPointsComp1={setPointsComp1}
                setPointsComp2={setPointsComp2}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <Quiz
                answers={answers}
                setAnswers={setAnswers}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                countdown={countdown}
                setCountdown={setCountdown}
                finishVisible={finishVisible}
                setFinishVisible={setFinishVisible}
                setStopTimer={setStopTimer}
                setPointsComp1={setPointsComp1}
                setPointsComp2={setPointsComp2}
                pointsComp1={pointsComp1}
                pointsComp2={pointsComp2}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
