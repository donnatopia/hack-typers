import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Link } from 'react-router-dom';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      console.log(passwordRef.current.value, passwordConfirmRef.current.value)
      return setError('Passwords do not match');
    }

    setError('');
    setLoading(true);
    signup(emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        setMessage('Successfully created account');
      })
      .catch((err) => {
        setError('Failed creating account');
        console.log(err);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          { message && <Alert variant='success'>{ message }</Alert> }
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={ handleSubmit }>
            <Form.Group className='padding-top' id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group className='padding-top' id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group className='padding-top' id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group className='padding-top'>
              <Button disabled={loading} type="submit">
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 disclaimer">
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  )
};

export default Signup;

