import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { errorConstants, loginConstants } from '../../_constants';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: loginConstants.LOGIN,
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: errorConstants.INPUT });
    }
  };

  return (
    <Form onSubmit={login} className="mt-3">

      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Form.Group>
        <Form.Control
          className="my-3 text-center"
          placeholder="Username"
          type="text"
          name="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Form.Control
        className="my-3 text-center"
          placeholder="Password"
          type="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <div className="d-flex justify-content-center mb-3">
        <Button variant="info" type="submit" name="submit">Log In</Button>
      </div>

    </Form>
  );
}

export default LoginForm;
