import React, {useState, useEffect, useCallback} from "react";
import "./style/App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {


  const [category, setCategory] = useState(26);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  


    const fetchQuestions = useCallback( async () =>{
        const res = await fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=medium&type=multiple`);
        const data = await res.json();
        console.log(data.results)
        setQuestions(data.results);
        const incorectAnsw = data.results[0].incorrect_answers;
        const correctAnsw = data.results[0].correct_answer;
        const allAnsw = [...incorectAnsw, correctAnsw];
        setAnswers(allAnsw);
        
    }, [category])

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions])





  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Home setCategory={setCategory}/>} />
          <Route path="/quiz" element={ <Quiz answers={answers} questions={questions}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
