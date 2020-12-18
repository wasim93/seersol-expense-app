import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
    localStorage.setItem('userInfo', JSON.stringify(data));
    history.push('/');
  };

  return (
    <div>
      <h1>Sign In</h1>
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

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      {/* <Row className='py-3'>
        <Col>
          New Customer? <Link to={'/register'}>Register</Link>
        </Col>
      </Row> */}
    </div>
  );
};

export default LoginScreen;
