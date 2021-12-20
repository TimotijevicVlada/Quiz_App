import React from 'react'

const Question = ({currentQuestion}) => {
    return (
        <div className="question">
          <span>{currentQuestion?.question}</span>
        </div>
    )
}

export default Question;