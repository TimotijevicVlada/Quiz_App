import React from 'react'

const Quiz = () => {
    return (
        <div className="quiz">
            <div className="score">
                <div className="human_player">
                    <span className="pts">226 pts</span>
                    <span className="player_name">HUMAN PLAYER</span>
                </div>
            </div>
            <div className="timer">
                <i class="far fa-clock"></i>
                <span className="time">20</span>
            </div>
            <div className="quiz_content">
                <div className="q_number">
                    <span>QUESTION 1</span>
                </div>
                <div className="question">
                    <span>Kako se zvala zena Dzona Lenona?</span>
                </div>
                <div className="buttons">
                    <div>
                        <span className="order_btn">A</span>
                        <span className="answer">OVO ONO</span>
                    </div>
                    <div>
                        <span className="order_btn">B</span>
                        <span className="answer">JOKO ONO</span>
                    </div>
                    <div>
                        <span className="order_btn">C</span>
                        <span className="answer">ONO OVO</span>
                    </div>
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
