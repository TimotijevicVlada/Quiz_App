import React, {useContext} from 'react';
import {QuizContext} from "../context/Context";

const Qnumber = ({questionNum}) => {

  const {questionNumbers} = useContext(QuizContext);

    return (
        <div className="q_number">
          <span>
            QUESTION {questionNum}/{questionNumbers}
          </span>
        </div>
    )
}

export default Qnumber;

