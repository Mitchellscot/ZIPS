import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import {useSelector} from 'react-redux';
import Gallery from '../Gallery/Gallery';

function ProtectedRoute(props) {
  const user = useSelector((store) => store.user);

  const {
    authRedirect,
    ...otherProps
  } = props;

  const ComponentToProtect = props.component || (() => props.children);
  let ComponentToShow;


  if (user.id === 1) {
    ComponentToShow = ComponentToProtect;
  } else if (user.id === 2){
    ComponentToShow = Gallery;
  }
  else{
    ComponentToShow = LoginPage;
  }

 if (user.id === 1 && authRedirect != null) {
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
