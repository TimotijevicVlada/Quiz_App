import React from 'react';

const Quiz = ({answers, questions, fetchQuestions, setQuestionNum, questionNum, setPoints, points}) => {
   

    const handleSkip = () => {
        fetchQuestions();
        setQuestionNum(questionNum + 1);
        setPoints(points - 5);
    }

    const handleAnswer = (item) =>{
        if(item === questions[0].correct_answer) {
            setPoints(points + 10);
        } else {
            setPoints(points - 5);
        }
        setQuestionNum(questionNum + 1);
        fetchQuestions();
    }

    const handleOrderAnswer = (item) =>{
       if(item === 0) {
           return "A";
       } else if(item === 1) {
           return "B";
       } else if (item === 2) {
           return "C";
       } else {
           return "D";
       }
    }

    return (
        <div className="quiz">
            <div className="score">
                <div className="human_player">
                    <span className="pts">{points} pts</span>
                    <span className="player_name">HUMAN PLAYER</span>
                </div>
            </div>
            <div className="timer">
                <i className="far fa-clock"></i>
                <span className="time">20</span>
            </div>
            <div className="quiz_content">
                <div className="q_number">
                    <span>QUESTION {questionNum}</span>
                </div>
                <div className="question">
                    {questions.map(item => (
                        <span key={item.category}>{item.question}</span>
                    ))}
                </div>
                <div className="buttons">
                    {answers.map(item => (
                        <div onClick={() => handleAnswer(item)} key={item}>
                            <span className="order_btn">{handleOrderAnswer(points++)}</span>
                            <span className="answer">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div onClick={handleSkip}  className="skip">
                <span>SKIP</span>
            </div>
            <div className="progress_bar">
                <div className="percentage"></div>
            </div>
        </div>
    )
}

export default Quiz;
