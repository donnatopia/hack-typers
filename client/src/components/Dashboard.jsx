import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stats from './Stats.jsx';
import Options from './Options.jsx';
import Prompt from './Prompt.jsx';
import { SERVER_URL } from '../../../config.js';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // set user
  const user = 'Donna';

  // timer states
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // prompt states
  const [characterIndex, setCharacterIndex] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [words, setWords] = useState([]);

  const [prompt, setPrompt] = useState(1);
  const [total, setTotal] = useState(0);

  // get number of prompts
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/prompts/total`)
      .then(({ data }) => {
        setTotal(data);
      })
      .catch((err) => {
        console.log('Error retrieving number of prompts', err);
      });

  }, []);

  // get prompt
  useEffect(() => {
    axios
      .get (`${SERVER_URL}/prompts/${prompt}`)
      .then(({ data }) => {
        setCharacters(data.text.split(''));
        setWords(data.text.split(' '));
        setPrompt(data.id);
      })
      .catch((err) => {
        console.log('Error retrieving initial prompt', err);
      });

  }, [prompt]);

  return (
    <div id='app'>
      <Link to='/signup'>Sign Up</Link>
      <Link to='/login'>Log In</Link>
      <h1 id='title'>Hack Typers</h1>
      { characterIndex === characters.length
        ? <Stats
            user={ user }
            prompt={ prompt }
            words={ words }
            wpm={ wpm }
            timeElapsed={ timeElapsed }
          />
        : <Prompt
            characters={ characters }
            words={ words }
            startTime={ startTime }
            setStartTime={ setStartTime }
            characterIndex={ characterIndex }
            setCharacterIndex={ setCharacterIndex }
            setTimeElapsed={ setTimeElapsed }
            setWpm={ setWpm }
          />
      }
      <Options
        setCharacterIndex={ setCharacterIndex }
        setStartTime={ setStartTime }
        setPrompt={ setPrompt }
        prompt={ prompt }
        total={ total }
      />
    </div>
  );
};

export default Dashboard;