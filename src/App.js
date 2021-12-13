import React, { useState, useEffect, useCallback } from "react";
import "./style/App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  const [player, setPlayer] = useState("HUMAN PLAYER");
  const [category, setCategory] = useState(26);
  const [questionNumbers, setQuestionNumbers] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [points, setPoints] = useState(0);
  const [pointsComp1, setPointsComp1] = useState(0);
  const [pointsComp2, setPointsComp2] = useState(0);
  const [countdown, setCountdown] = useState(15);
  const [finishVisible, setFinishVisible] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [correctAnswerNumber, setCorrectAnswerNumber] = useState(0);
  const [wrongAnswerNumber, setWrongAnswerNumber] = useState(0);

  


  //Function that fetch Api data
  const fetchQuestions = useCallback(async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${questionNumbers}&category=${category}&difficulty=medium&type=multiple`
    );
    const data = await res.json();
    //console.log(data.results);
    setQuestions(data.results);
  }, [category, questionNumbers]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  //Countdown timer
  const handleCountdown = useCallback(() => {
    if (stopTimer) {
      if (countdown > 0) {
        setCountdown(countdown - 1);
        setTotalTime(totalTime + 1);
      } else {
        if (questionNum < questionNumbers) {
          setPoints(points - 10);
          setQuestionNum(questionNum + 1);
          setCountdown(15);
          setWrongAnswerNumber(wrongAnswerNumber + 1);
          setPointsComp1(pointsComp1 - 5);
          setPointsComp2(pointsComp2 - 5);
        } else {
          setPoints(points - 10);
          setWrongAnswerNumber(wrongAnswerNumber + 1);
          setStopTimer(false);
          setFinishVisible(true);
          setPointsComp1(pointsComp1 - 5);
          setPointsComp2(pointsComp2 - 5);
        }
      }
    }
  }, [countdown, points, questionNum, questionNumbers, stopTimer, totalTime, wrongAnswerNumber]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleCountdown();
    }, 1000);
    return () => clearInterval(interval);
  }, [handleCountdown]);

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
  }, [savePlayerValue]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setCategory={setCategory}
                setCountdown={setCountdown}
                setPoints={setPoints}
                setPlayer={setPlayer}
                setQuestionNum={setQuestionNum}
                questionNumbers={questionNumbers}
                setQuestionNumbers={setQuestionNumbers}
                fetchQuestions={fetchQuestions}
                setFinishVisible={setFinishVisible}
                setStopTimer={setStopTimer}
                setTotalTime={setTotalTime}
                setCorrectAnswerNumber={setCorrectAnswerNumber}
                setWrongAnswerNumber={setWrongAnswerNumber}
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
                questions={questions}
                fetchQuestions={fetchQuestions}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                points={points}
                setPoints={setPoints}
                countdown={countdown}
                setCountdown={setCountdown}
                player={player}
                questionNumbers={questionNumbers}
                finishVisible={finishVisible}
                setFinishVisible={setFinishVisible}
                setStopTimer={setStopTimer}
                totalTime={totalTime}
                correctAnswerNumber={correctAnswerNumber}
                wrongAnswerNumber={wrongAnswerNumber}
                setCorrectAnswerNumber={setCorrectAnswerNumber}
                setWrongAnswerNumber={setWrongAnswerNumber}
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
