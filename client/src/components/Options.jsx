import React from 'react';
import { FaRedoAlt, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Options = ({ setCharacterIndex, setStartTime, setPrompt, prompt, total }) => {

  // previous button
  const handlePrevious = (e) => {
    setCharacterIndex(0);
    setStartTime(0);
    setPrompt(prompt - 1);
  }

  // redo button
  const handleRedo = (e) => {
    setCharacterIndex(0);
    setStartTime(0);
  }

  // next button
  const handleNext = (e) => {
    setCharacterIndex(0);
    setStartTime(0);
    setPrompt(prompt + 1);
  }

  return (
    <div id='options'>
      { prompt > 1
        ? <FaArrowLeft className='option' onClick={e => handlePrevious(e)} />
        : <span></span>
      }
      <FaRedoAlt className='option' onClick={e => handleRedo(e)} />
      { prompt < total
        ? <FaArrowRight className='option' onClick={e => handleNext(e)} />
        : <span></span>
      }
    </div>
  )
}

export default Options;