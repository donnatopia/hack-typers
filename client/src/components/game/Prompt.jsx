import React, { useState , useEffect } from 'react';

const Prompt = ({ characters, setStartTime, characterIndex, setCharacterIndex, setTimeElapsed, setWpm, startTime, words }) => {

  const setColor = (index) => {
    return index < characterIndex ? 'valid' : null;
  }

  // creates key down function
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


  // end the timer when user finishes
  useEffect(() => {
    if (characterIndex + 1 === characters.length && startTime !== 0) {
      console.log('end');
      const end = new Date();
      const endTime = end.getTime();

      // udpates wpm and time elapsed
      let time = (endTime - startTime)/1000;
      setTimeElapsed(time);
      setWpm(Math.floor((words.length * 60) / time ));
    }
  }, [characterIndex]);

  // handles the cursor
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