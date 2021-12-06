import React from 'react';

const Player = ({points, player}) => {
    return (
        <div className="human_player">
          <span className="pts">{points} pts</span>
          <span className="player_name">{player}</span>
        </div>
    )
}

export default Player;
