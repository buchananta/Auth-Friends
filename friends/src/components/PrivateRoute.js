import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({component: Component, redirect, path}) {
  return (
    <Route path={path} >
      { localStorage.getItem('token')
        ? <Component />
        : <Redirect to={redirect} />
      }
    </Route>
  )
}