import React, { useState, useEffect, useCallback } from "react";
import "./style/App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import QuizFinished from "./components/QuizFinished";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {

  const [player, setPlayer] = useState("HUMAN PLAYER");
  const [category, setCategory] = useState(26);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionNum, setQuestionNum] = useState(1);
  const [points, setPoints] = useState(0);
  const [countdown, setCountdown] = useState(20);

  //Function that fetch Api data
  const fetchQuestions = useCallback(async () => {
    setAnswers([]);
    const res = await fetch(
      `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=medium&type=multiple`
    );
    const data = await res.json();
    console.log(data.results);
    setQuestions(data.results);
    const incorectAnsw = data.results[0].incorrect_answers;
    const correctAnsw = data.results[0].correct_answer;
    const allAnsw = [...incorectAnsw, correctAnsw];
    shuffleAnsw(allAnsw);
  }, [category]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  //Countdown timer
  const handleCountdown = () => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    } else {
      if (questionNum < 10) {
        setPoints(points - 5);
        fetchQuestions();
        setQuestionNum(questionNum + 1);
        setCountdown(20);
      } else {
        document.location.replace("/finish");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleCountdown();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdown]);

  //Function that shuffle the given array of answers
  const shuffleAnsw = (an) => {
    for (let i = 0; i < an.length; i++) {
      let randomNum = Math.floor(Math.random() * an.length);
      let tempAnsw = "";
      let currentAnsw = an[i];
      let randomAnsw = an[randomNum];
      //swap answers
      tempAnsw = currentAnsw;
      an[i] = randomAnsw;
      an[randomNum] = tempAnsw;
    }
    //setAnswers(an);
    setAnswers([
      {order: "A", answ: an[0]},
      {order: "B", answ: an[1]},
      {order: "C", answ: an[2]},
      {order: "D", answ: an[3]}
    ])
  };

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
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <Quiz
                answers={answers}
                questions={questions}
                fetchQuestions={fetchQuestions}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                points={points}
                setPoints={setPoints}
                countdown={countdown}
                setCountdown={setCountdown}
                player={player}
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
