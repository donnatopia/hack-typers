import React, { useState , useEffect } from 'react';

const Prompt = ({ characters, setStartTime, characterIndex, setCharacterIndex }) => {

  const setColor = (index) => {
    return index < characterIndex ? 'valid' : null;
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (characterIndex === 0) {
        console.log('start')
        const start = new Date();
        setStartTime(start.getTime());
      }

      if (e.key === characters[characterIndex]) {
        setCharacterIndex(characterIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [characterIndex, characters]);

  const displayLetter = (letter, index) => {
    letter === ' ' ? letter = (<span>&nbsp;</span>) : letter;

    return (
      <p id='letter' key={ letter + index }>
        { index === characterIndex ? <span id='blinking-cursor'>|</span> : null }
        <span id={ setColor(index) }>{ letter }</span>
      </p>
    )
  };

  return (
    <div id='prompt'>
      { characters.map((letter, index) => displayLetter(letter, index))}
    </div>
  )
}

export default Prompt;