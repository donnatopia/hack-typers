import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameInterface from './GameUI.jsx';
import Stats from './Stats.jsx';
import Options from './Options.jsx';

const App = () => {
  // timer states
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  // prompt states
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [prompt, setPrompt] = useState(1);
  const [total, setTotal] = useState(0);

  // get number of prompts
  useEffect(() => {
    axios
      .get('/prompts/total')
      .then(({ data }) => {
        console.log(data);
        setTotal(data);
      })
      .catch((err) => {
        console.log('Error retrieving number of prompts', err);
      });

  }, []);

  // get prompt
  useEffect(() => {
    axios
      .get (`/prompts/${prompt}`)
      .then(({ data }) => {
        setWords(data.text.split(' '));
        setPrompt(data.id);
      })
      .catch((err) => {
        console.log('Error retrieving initial prompt', err);
      });

  }, [prompt]);

  // end the timer when user finishes
  useEffect(() => {
    if (wordIndex === words.length) {
      const end = new Date();
      setEndTime(end.getTime());
    }
  }, [wordIndex])

  return (
    <div>
      <h1 id='title'>Hack Typers</h1>
      { wordIndex === words.length
        ? <Stats
            words={ words }
            startTime={ startTime }
            endTime={ endTime }
          />
        : <GameInterface
            words={ words }
            wordIndex={ wordIndex }
            setWordIndex={ setWordIndex }
            startTime={ startTime }
            setStartTime={ setStartTime }
          />
      }
      <Options
        setWordIndex={ setWordIndex }
        setStartTime={ setStartTime }
        setPrompt={ setPrompt }
        prompt={ prompt }
        total={ total }
      />
    </div>
  );
};

export default App;