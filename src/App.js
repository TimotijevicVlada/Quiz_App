import React, { useState, useEffect, useCallback } from "react";
import "./style/App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [category, setCategory] = useState(26);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [questionNum, setQuestionNum] = useState(1);
  const [points, setPoints] = useState(0);
 
  

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
    //setAnswers(allAnsw);
    shuffleAnsw(allAnsw);
  }, [category]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  //Function that shuffle the given array of answers
  const shuffleAnsw = (an) => {
    for(let i = 0; i < an.length; i++) {
      let randomNum = Math.floor(Math.random() * an.length);
      let tempAnsw = "";
      let currentAnsw = an[i];
      let randomAnsw = an[randomNum];
      //swap answers
      tempAnsw = currentAnsw;
      an[i] = randomAnsw;
      an[randomNum] = tempAnsw;
    }
    setAnswers(an);
  }
 
  //Function that get question
  const getQuestionStorage = () => {
    if(localStorage.getItem("question") === null) {
      localStorage.setItem("question", JSON.stringify([]));
    } else {
      const questionLocalStorage = JSON.parse(localStorage.getItem("question"));
      setQuestions(questionLocalStorage);
    }
  }
  useEffect(() => {
    getQuestionStorage();
  }, [])

  //Function that save favorite item to local storage
  const saveQuestionStorage = useCallback( () => {
    localStorage.setItem("question", JSON.stringify(questions));
  }, [questions])

  useEffect(() => {
    saveQuestionStorage();
  }, [saveQuestionStorage])


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home setCategory={setCategory} />} />
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
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
