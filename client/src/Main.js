import React from 'react';
import {Switch, Route } from 'react-router-dom';

//Import Components
import Login from './components/Login/';

const Main = () => (
       <Switch>
         <Route exact path='/' component={Login}></Route>
       </Switch>
);

export default Main;