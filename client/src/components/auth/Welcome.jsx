import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleNavigate = (e, path) => {
    e.preventDefault();
    navigate(path);
  }

  return (
    <div>
      <h1 id='title'>Hack Typers</h1>
      <div>
        <Button variant='info' onClick={ e => handleNavigate(e, '/signup') }>
          Sign Up
        </Button>{' '}
        <Button variant='primary' onClick={ e => handleNavigate(e, '/signup') }>
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Welcome;