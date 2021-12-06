import React, { useState, useEffect, useCallback } from "react";
import "./style/App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import QuizFinished from "./components/QuizFinished";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {

  const [player, setPlayer] = useState("HUMAN PLAYER");
  const [category, setCategory] = useState(26);
  const [questionNumbers, setQuestionNumbers] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [points, setPoints] = useState(0);
  const [countdown, setCountdown] = useState(20);
  

  //Function that fetch Api data
  const fetchQuestions = useCallback(async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${questionNumbers}&category=${category}&difficulty=medium&type=multiple`
    );
    const data = await res.json();
    console.log(data.results);
    setQuestions(data.results);
  }, [category, questionNumbers]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);


  //Countdown timer
  const handleCountdown = useCallback( () => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    } else {
      if (questionNum < questionNumbers) {
        setPoints(points - 10);
        setQuestionNum(questionNum + 1);
        setCountdown(15);
      } else {
        setPoints(points - 10);
        document.location.replace("/finish");
      }
    }
  }, [countdown, points, questionNum, questionNumbers]);

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
      localStorage.setItem("points", JSON.stringify({name: "HUMAN PLAYER", points: 0}));
    } else {
      const points = JSON.parse(localStorage.getItem("points"));
      setPoints(points.points);
      setPlayer(points.name);
    }
  }

  useEffect(() => {
    getPlayerValue();
  }, [])

  //Function that save favorite item to local storage
  const savePlayerValue = useCallback(() => {
    localStorage.setItem("points", JSON.stringify({name: player, points: points}));
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
                setQuestionNumbers={setQuestionNumbers}
                fetchQuestions={fetchQuestions}
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
              />
            }
          />
          <Route path="/finish" element={<QuizFinished points={points} player={player}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
