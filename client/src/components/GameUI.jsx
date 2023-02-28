import React, { useState, useEffect } from 'react';
import Prompt from './Prompt.jsx';

const GameInterface = ({ words, wordIndex, setWordIndex, setStartTime, startTime }) => {
  const [input, setInput] = useState('');

  // submits each word
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input === words[wordIndex]) {
      setWordIndex(wordIndex + 1);
      setInput('');
    }
  };

  // handle user typing
  const handleInput = (e) => {
    // starts the timer when user types first letter
    if (wordIndex === 0 && startTime === 0) {
      const start = new Date();
      setStartTime(start.getTime());
    }

    // submits the input on space bar
    if (e.target.value[e.target.value.length - 1] === ' ') {
      document.forms['form'].requestSubmit();
      return;
    }
    setInput(e.target.value);
  }

  return (
    <div id='game-interface'>
      <form id='form' onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          value={ input }
          onChange={e => handleInput(e)}
        />
      </form>
      <Prompt words={ words } wordIndex={ wordIndex }/>
    </div>
  );
}

export default GameInterface;