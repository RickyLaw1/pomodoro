import React from "react";

const Timer = ({ time, toggleTimer, toggleClass }) => {
  return (
    <React.Fragment>
      <h2>Timer</h2>
      <div className="timer">
        <div className="time">
          <span>{time.minutes}:</span>
          {time.seconds < 10 ? <span>0</span> : null}
          <span>{time.seconds}</span>
        </div>
      </div>
      {!time.start
        ? <button onClick={toggleTimer}>Start</button>
        : <button onClick={toggleTimer}>Pause</button>
      }
    </React.Fragment>
  );
} 

export default Timer;