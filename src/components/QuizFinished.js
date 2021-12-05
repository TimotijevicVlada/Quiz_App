import React from 'react'

const QuizFinished = ({points}) => {
    return (
        <div className="finish">
            <div className="finish_data">
                <div className="name">
                    <span>Vladimir Timotijevic</span>
                </div>
                <div className="finish_pts">
                    <span>Points: {points}</span>
                </div>
                <div className="finish_time">
                    <span>Time: 50 seconds</span>
                </div>
            </div>
        </div>
    )
}

export default QuizFinished;
