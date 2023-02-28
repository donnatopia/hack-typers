import React from 'react';

const Prompt = ({ words, wordIndex }) => {
  const setColor = (index) => {
    return index < wordIndex ? 'valid' : null
  }

  return (
    <div id='prompt'>
      { words.map((word, index) => (
        <p key={ index } className='word' id={ setColor(index) }>{ word }</p>
      ))}
    </div>
  )
}

export default Prompt;