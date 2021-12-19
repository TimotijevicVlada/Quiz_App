import { createContext, useState, useEffect, useCallback } from "react";

export const QuizContext = createContext();

export const ContextProvider = ({ children }) => {
  
//maiking the player object to change all unececery states
const [player, setPlayer] = useState({
  name: "Human Player",
  numberOfQuestions: 3,
  category: 26,
  questions: []
})

const [playerScore, setPlayerScore] = useState({
  correctAnswers: 0,
  wrongAnswers: 0,
  points: 0,
  totalTime: 0
})

  //Function that fetch Api data
  const fetchQuestions = useCallback(  async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${player.numberOfQuestions}&category=${player.category}&difficulty=medium&type=multiple`
    );
    const data = await res.json();
    //console.log(data.results);
    setPlayer({ ...player, questions: data.results });
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);


  return (
    <QuizContext.Provider
      value={{player, setPlayer, playerScore, setPlayerScore}}
    >
      {children}
    </QuizContext.Provider>
  );
};
