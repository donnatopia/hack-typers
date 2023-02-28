import React, { useState } from 'react';
import Prompt from './Prompt.jsx';

const GameInterface = ({ words }) => {
  const [input, setInput] = useState('');
  const [inputIndex, setInputIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if( input === words[inputIndex]) {
      setInputIndex(inputIndex + 1);
      setInput('');
    }
  }

  return (
    <div id='game-interface'>
      <Prompt words={ words } inputIndex={ inputIndex }/>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          value={ input }
          onChange={e => setInput(e.target.value)}
        />
        <button type='submit'>Enter</button>
      </form>
    </div>
  );
}

export default GameInterface;