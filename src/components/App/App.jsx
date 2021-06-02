import React, { useEffect } from 'react';
import '../../custom.scss';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css'; //uncomment for testing purposes
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Gallery from '../Gallery/Gallery';
import Admin from '../Admin/Admin';
import LoginPage from '../LoginPage/LoginPage';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
        <Switch>
          <Redirect exact from="/" to="/admin" />
          <Route
            exact
            path="/gallery"
          >
            <Gallery />
          </Route>
          <ProtectedRoute
            path="/admin"
          >
            <Admin />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/login"
            authRedirect="/admin"
          >
            <LoginPage />
          </ProtectedRoute>
         <Route>
            <h1>404</h1>
          </Route> 
        </Switch>
    </Router>
  );
}

export default App;
