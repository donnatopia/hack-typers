import React from 'react';
import { FaRedoAlt, FaArrowRight } from 'react-icons/fa';

const Options = ({ setWordIndex, setStartTime, setPrompt, prompt, total }) => {

  // redo button
  const handleRedo = (e) => {
    setWordIndex(0);
    setStartTime(0);
  }

  // next button
  const handleNext = (e) => {
    setPrompt(prompt + 1);
  }

  return (
    <div id='options'>
      <FaRedoAlt className='option' onClick={e => handleRedo(e)} />
      { prompt < total
        ? <FaArrowRight className='option' onClick={e => handleNext(e)} />
        : null
      }
    </div>
  )
}

export default Options;