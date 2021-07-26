import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginFormGuest() {
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: "guest",
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_GUEST_ERROR' });
    }
  };

  return (
    <Form onSubmit={login} className="mt-3">

      {errors.loginMessage && (
        <h3 className="alert text-center" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Form.Group>
        <Form.Control
        className="my-4 text-center"
          placeholder="Password"
          type="text"
          name="Password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <div className="d-flex justify-content-center mb-3">
        <Button variant="info" type="submit" name="submit">View Photos</Button>
      </div>

    </Form>
  );
}

export default LoginFormGuest;
