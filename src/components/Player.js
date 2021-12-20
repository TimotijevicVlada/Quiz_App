import React, {useContext} from 'react';
import {QuizContext} from "../context/Context";

const Player = ({points, pointsComp1, pointsComp2}) => {

  const {player} = useContext(QuizContext);

    return (
        <div className="human_player">
          <div className='human'>
            <span className="pts">{points} pts</span>
            <span className="player_name">{player}</span>
          </div>
          <div className='comp1'>
            <span className="pts">{pointsComp1} pts</span>
            <span className="player_name">Comp 1</span>
          </div>
          <div className='comp2'>
            <span className="pts">{pointsComp2} pts</span>
            <span className="player_name">Comp 2</span>
          </div>
        </div>
    )
}

export default Player;

