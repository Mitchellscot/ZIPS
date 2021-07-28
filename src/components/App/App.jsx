import React, { useEffect } from 'react';
import '../../custom.scss';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Gallery from '../Gallery/Gallery';
import Admin from '../Admin/Admin';
import LoginPage from '../LoginPage/LoginPage';
import './App.css';
import { useSelector } from 'react-redux';
import { userConstants } from '../../_constants';

function App() {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: userConstants.FETCH });
  }, [dispatch]);

  return (
    <div id={!user.id ? "big-zip" : ""}>
    <Router basename="/">
        <Switch>
          <Redirect exact from="/" to="/Login" />
          <ProtectedRoute
            exact
            path="/Gallery"
          >
            <Gallery />
          </ProtectedRoute>
          <ProtectedRoute
            path="/Admin"
          >
            <Admin />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/Login"
            authRedirect="/Admin/Orders"
          >
            <LoginPage />
          </ProtectedRoute>
         <Route>
            <h1>Page Not Found</h1>
          </Route> 
        </Switch>
    </Router>
    </div>
  );
}

export default App;
