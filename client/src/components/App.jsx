import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameInterface from './GameUI.jsx';

const App = () => {
  const [ words, setWords ] = useState([]);
  // const examplePrompt = "This scene feels like what I once saw on a screen. I searched aurora borealis green. I've never seen someone lit from within. Blurring out my periphery. My smile is like I won a contest. And to hide that would be so dishonest. And it's fine to fake it 'til you make it. Til you do, til it's true".split(' ');

  useEffect(() => {
    const options = {
      url: '/prompts/1',
    }

    axios(options)
      .then(({ data }) => {
        console.log(data);
        setWords(data.text.split(' '));
      })
      .catch((err) => {
        console.log('Error retrieving initial prompt', err);
      });

  }, []);

  return (
    <div>
      <h1 id='title'>Hack Typers</h1>
      <GameInterface words={ words }/>
    </div>
  );
};

export default App;