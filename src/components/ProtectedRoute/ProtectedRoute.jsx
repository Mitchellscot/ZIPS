import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import {useSelector} from 'react-redux';

function ProtectedRoute(props) {
  const user = useSelector((store) => store.user);

  const {

    authRedirect,
    ...otherProps
  } = props;

  const ComponentToProtect = props.component || (() => props.children);
  let ComponentToShow;

  if (user.id) {
    ComponentToShow = ComponentToProtect;
  } else {
    ComponentToShow = LoginPage;
  }

  if (user.id && authRedirect != null) {
    return <Redirect exact from={otherProps.path} to={authRedirect} />;
  } else if (!user.id && authRedirect != null) {
    ComponentToShow = ComponentToProtect;
  }

  return (
    <Route
      {...otherProps}
    >
      <ComponentToShow />
    </Route>

  );
}

export default ProtectedRoute;
