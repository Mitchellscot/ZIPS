import React from 'react';
import {useEffect, useState} from 'react';
import LoginForm from '../LoginForm/LoginForm';
import LoginFormGuest from '../LoginFormGuest/LoginFormGuest';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const LandingOptions = 'landing-options';
  const GuestLogin = 'guest-login';
  const AdminLogin = 'admin-login';
  const [toggleAdmin, setToggleAdmin] = useState(false);
  const [loginOptions, setLoginOptions] = useState(true);
  const [toggleGuest, setToggleGuest] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleLoginOptions = () => {
    setLoginOptions(!loginOptions);
  }

  const toggleAdminForm = () => {
    setToggleAdmin(!toggleAdmin);
    toggleLoginOptions();
  }

  const toggleGuestForm = () => {
    setToggleGuest(!toggleGuest);
    toggleLoginOptions();
  }

  useEffect(() => {
    dispatch({ type: 'LOG_OUT' });
    dispatch({type: 'CLEAR_LOGIN_ERROR'});
  }, []);

  return (
    <Container id={"landing-page"}>
      <div className="col-md-8 offset-md-2 mt-5 ">
      <div className="col-lg-8 offset-lg-2 border rounded bg-light">
      <div className="d-flex justify-content-center mt-3 ">
      <img src="../../zips200x2002.png" height="200px" width="200px" alt="logo"/>
      </div>

      {loginOptions ? 
      <div className="container" >
        <div className="d-flex justify-content-center mt-4">
        <Button onClick={toggleGuestForm} variant="info" type="submit" name="submit">Enter Password to View Photos</Button>
        </div>
      <div className="d-flex justify-content-center mt-4">
      <Button onClick={toggleAdminForm} id="login-link" >...Or Log In</Button>
      </div>
      </div>
       : <> </> }

      {toggleAdmin ? <LoginForm /> : <> </>}
      {toggleGuest ? <LoginFormGuest /> : <> </>}
      </div>
      </div>
    </Container>
  );
}

export default LoginPage;
