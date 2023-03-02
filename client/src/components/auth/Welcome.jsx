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
      <div className='text-center'>
        <Button variant='dark' onClick={ e => handleNavigate(e, '/signup') }>
          Sign Up
        </Button>{' '}
        <Button variant='light' onClick={ e => handleNavigate(e, '/login') }>
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Welcome;