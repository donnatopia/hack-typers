import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stats from './Stats.jsx';
import Options from './Options.jsx';
import Prompt from './Prompt.jsx';

const App = () => {
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
      .get('/prompts/total')
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
      .get (`/prompts/${prompt}`)
      .then(({ data }) => {
        setCharacters(data.text.split(''));
        setWords(data.text.split(' '));
        setPrompt(data.id);
      })
      .catch((err) => {
        console.log('Error retrieving initial prompt', err);
      });

  }, [prompt]);

  // end the timer when user finishes
  useEffect(() => {
    if (characterIndex === characters.length && startTime !== 0) {
      console.log('end');
      const end = new Date();
      const endTimer = end.getTime();

      // udpates wpm and time elapsed
      let time = (endTimer - startTime)/1000;
      setTimeElapsed(time);
      setWpm(Math.floor((words.length * 60) / time ));
    }
  }, [characterIndex]);

  return (
    <div id='app'>
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
            setStartTime={ setStartTime }
            characterIndex={ characterIndex }
            setCharacterIndex={ setCharacterIndex }
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

export default App;