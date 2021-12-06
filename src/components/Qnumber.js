import React from 'react';

const Qnumber = ({questionNum, questionNumbers}) => {
    return (
        <div className="q_number">
          <span>
            QUESTION {questionNum}/{questionNumbers}
          </span>
        </div>
    )
}

export default Qnumber;
