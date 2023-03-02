import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);
    login(emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((err) => {
        setError('Incorrect Login Information');
        console.log(err);
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center">Login</h2>
          { error && <Alert variant="danger">{error}</Alert> }
          <Form onSubmit={ handleSubmit }>
            <Form.Group className='padding-top' id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group className='padding-top' id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group className='padding-top'>
              <Button disabled={loading} type="submit">
                Login
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 disclaimer">
        Need an Account? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  )
};

export default Login;