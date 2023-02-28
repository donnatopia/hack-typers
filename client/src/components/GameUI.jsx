import React, { useState, useEffect } from 'react';
import Prompt from './Prompt.jsx';

const GameInterface = ({ words }) => {
  const [input, setInput] = useState('');
  const [inputIndex, setInputIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(input === words[inputIndex]) {
      console.log('valid');
      setInputIndex(inputIndex + 1);
      setInput('');

      if (inputIndex + 1 === words.length) {
        alert('finished!');
      }
    }
  };

  const handleInput = (e) => {
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
      <Prompt words={ words } inputIndex={ inputIndex }/>
    </div>
  );
}

export default GameInterface;