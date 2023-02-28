import React from 'react';

const Stats = ({ startTime, endTime, words }) => {
  const timeElapsed = (endTime - startTime)/1000;
  const wpm = Math.floor((words.length * 60) / timeElapsed);

  return (
    <div>
      <h2>Stats</h2>
      <h3>WPM</h3>
      <p>{ wpm }</p>
      <h3>Time Elapsed</h3>
      <p>{ timeElapsed } s</p>
    </div>
  );
}

export default Stats;