import React from 'react';
import GameInterface from './GameUI.jsx';

const App = () => {
  const examplePrompt = "This scene feels like what I once saw on a screen. I searched aurora borealis green. I've never seen someone live from within. Blurring out my periphery. My smile is like I won a contest. And to hide that would be so dishonest. And it's fine to fake it 'til you make it. Til you do, til it's true".split(' ');

  return (
    <div>
      <h1 id='title'>Hack Typers</h1>
      <GameInterface words={ examplePrompt }/>
    </div>
  );
};

export default App;