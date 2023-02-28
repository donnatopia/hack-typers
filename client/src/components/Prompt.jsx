import React from 'react';

const Prompt = ({ words, inputIndex }) => {
  const setColor = (index) => {
    return index < inputIndex ? 'valid' : null
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