import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameInterface from './GameUI.jsx';
import Stats from './Stats.jsx';

const App = () => {
  const [words, setWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    const options = {
      url: '/prompts/1',
    }

    axios(options)
      .then(({ data }) => {
        setWords(data.text.split(' '));
      })
      .catch((err) => {
        console.log('Error retrieving initial prompt', err);
      });

  }, []);

  useEffect(() => {
    if (wordIndex === words.length) {
      // end the timer when user finishes
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
    </div>
  );
};

export default App;