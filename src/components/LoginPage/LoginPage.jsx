import React from 'react';
import {useEffect} from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import './LoginPage.css';

function LoginPage() {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'LOG_OUT' })
  }, []);

  return (
    <Container id={"landing-page"}>
      <div className="col-md-8 offset-md-2 mt-5 ">
      <div className="col-lg-8 offset-lg-2 border rounded bg-light">
      <div className="d-flex justify-content-center mt-3 ">
      <img src="../../zips200x2002.png" height="200px" width="200px" alt="logo"/>
      </div>
      <LoginForm />
      </div>
      </div>
    </Container>
  );
}

export default LoginPage;
