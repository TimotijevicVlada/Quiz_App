import React from 'react';

const Quiz = ({answers, questions}) => {

    



    return (
        <div className="quiz">
            <div className="score">
                <div className="human_player">
                    <span className="pts">226 pts</span>
                    <span className="player_name">HUMAN PLAYER</span>
                </div>
            </div>
            <div className="timer">
                <i className="far fa-clock"></i>
                <span className="time">20</span>
            </div>
            <div className="quiz_content">
                <div className="q_number">
                    <span>QUESTION 1</span>
                </div>
                <div className="question">
                    <span>{questions[0].question}</span>
                </div>
                <div className="buttons">
                    {answers.map(item => (
                        <div>
                            <span className="order_btn">A</span>
                            <span className="answer">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="skip">
                <span>SKIP</span>
            </div>
            <div className="progress_bar">
                <div className="percentage"></div>
            </div>
        </div>
    )
}

export default Quiz;
