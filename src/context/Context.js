import { createContext, useState, useEffect, useCallback} from "react";

export const QuizContext = createContext();

export const ContextProvider = ({children}) => {

const [player, setPlayer] = useState("HUMAN PLAYER");
const [questionNumbers, setQuestionNumbers] = useState(5);
const [category, setCategory] = useState(26);
const [questions, setQuestions] = useState([]);

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
  

  return (
    <QuizContext.Provider
      value={{questionNumbers, setQuestionNumbers, category, setCategory, questions, setQuestions, fetchQuestions, player, setPlayer}}
    >
      {children}
    </QuizContext.Provider>
  );
};