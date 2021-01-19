import React, { useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import { Form, Button } from 'react-bootstrap';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      history.push('/');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className='login-screen'>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className='login-btn' type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default LoginScreen;
