import React, {useState, useEffect, useCallback} from 'react';

const Quiz = ({answers, questions, fetchQuestions, setQuestionNum, questionNum, setPoints, points}) => {
   

    const [percentage, setPercentage] = useState(0);

    //Function that handle the skip button 
    const handleSkip = () => {
        fetchQuestions();
        setQuestionNum(questionNum + 1);
        setPoints(points - 5);
    }

    //Funtion that handle choosen answer
    const handleAnswer = (item) =>{
        if(item === questions[0].correct_answer) {
            setPoints(points + 10);
        } else {
            setPoints(points - 5);
        }
        setQuestionNum(questionNum + 1);
        fetchQuestions();
    }

    //Function that handle percentage of progress bar on the bottom of the page
    const handlePercentage = useCallback( () => {
        let percent = 0;
        if(questionNum === 1) {
            percent = 10;
        } else if(questionNum === 2) {
            percent = 20;
        }else if(questionNum === 3) {
            percent = 30;
        }else if(questionNum === 4) {
            percent = 40;
        }else if(questionNum === 5) {
            percent = 50;
        }else if(questionNum === 6) {
            percent = 60;
        }else if(questionNum === 7) {
            percent = 70;
        }else if(questionNum === 8) {
            percent = 80;
        }else if(questionNum === 9) {
            percent = 90;
        }else {
            percent = 100;
        } 
        setPercentage(percent);
    }, [questionNum])

    useEffect(() => {
        handlePercentage();
    }, [handlePercentage])

    

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
                            <span className="order_btn">A</span>
                            <span className="answer">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div onClick={handleSkip}  className="skip">
                <span>SKIP</span>
            </div>
            <div className="progress_bar">
                <div className="percentage" style={{width: `${percentage}%`}}></div>
            </div>
        </div>
    )
}

export default Quiz;
