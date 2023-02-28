import React, { useState } from 'react';
import axios from 'axios';

const Stats = ({ startTime, endTime, words, prompt, user }) => {
  const [added, setAdded] = useState(false);

  // stats
  const timeElapsed = (endTime - startTime)/1000;
  const wpm = Math.floor((words.length * 60) / timeElapsed);

  // adding to stats database
  const addAttempt = () => {
    const options = {
      method: 'POST',
      url: '/stats',
      data: { user, wpm, prompt }
    }

    axios(options)
      .then(() => {
        console.log('added to database');
      })
      .catch((err) => {
        console.log('Error adding to database', err);
      })
  };

  // handle attempt
  const handleAttempt = (e) => {
    e.preventDefault();

    if (!added) {
      // method for deleting attempt
    } else {
      addAttempt();
    }

    setAdded(!added);
  }

  return (
    <div id='stats'>
      <h2>Stats</h2>
      <h3>WPM</h3>
      <p>{ wpm }</p>
      <h3>Time Elapsed</h3>
      <p>{ timeElapsed } s</p>
      <button onClick={e => handleAttempt(e) }>
        { added ? 'Remove Attempt' : 'Add Attempt' }
      </button>
    </div>
  );
}

export default Stats;