import React from 'react';

const Answers = ({answers, handleAnswer}) => {



    return (
        <div className="buttons">
          {answers?.map((item) => (
            <div className="answers" onClick={() => handleAnswer(item.answ)} key={item.answ}>
              <span className="order_btn">{item.order}</span>
              <span className="answer">{item.answ}</span>
            </div>
          ))}
        </div>
    )
}

export default Answers;
