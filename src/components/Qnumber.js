import React, {useContext} from 'react';
import { QuizContext } from '../context/Context';

const Qnumber = ({questionNum}) => {

  const {player} = useContext(QuizContext);

    return (
        <div className="q_number">
          <span>
            QUESTION {questionNum}/{player.numberOfQuestions}
          </span>
        </div>
    )
}

export default Qnumber;
