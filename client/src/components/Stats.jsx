import React, { useState } from 'react';
import axios from 'axios';

const Stats = ({ startTime, endTime, words, prompt, user }) => {
  // toggling between adding and deleting attempt
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState({});

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
      .then(({ data }) => {
        console.log('added to database');
        setCurrentAttempt(data);
      })
      .catch((err) => {
        console.log('Error adding to database', err);
      })
  };

  // deleting from stats database
  const deleteAttempt = () => {
    const options = {
      method: 'DELETE',
      url: '/stats',
      data: currentAttempt
    };

    axios(options)
      .then(() => {
        console.log('delete from database');
      })
      .catch((err) => {
        console.log('Error deleting from database', err);
      })
  }

  // handle attempt
  const handleAttempt = (e) => {
    e.preventDefault();

    if (alreadyAdded) {
      deleteAttempt();
    } else {
      addAttempt();
    }

    setAlreadyAdded(!alreadyAdded);
  }

  return (
    <div id='stats'>
      <h2>Stats</h2>
      <h3>WPM</h3>
      <p>{ wpm }</p>
      <h3>Time Elapsed</h3>
      <p>{ timeElapsed } s</p>
      <button onClick={e => handleAttempt(e) }>
        { alreadyAdded ? 'Remove Attempt' : 'Add Attempt' }
      </button>
    </div>
  );
}

export default Stats;