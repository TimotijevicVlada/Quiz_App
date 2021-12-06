import React from "react";

const ProgressBar = ({ percentage, questionNum }) => {
  return (
    <div className="progress_bar">
      <div
        className="percentage"
        style={{ width: `${percentage * questionNum}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
