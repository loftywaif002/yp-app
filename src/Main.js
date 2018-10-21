import React from 'react';
import {Switch, Route } from 'react-router-dom';

//Import Components
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const Main = () => (
       <Switch>
         <Route exact path='/' component={Signup}></Route>
         <Route exact path='/dashboard' component={Dashboard}></Route>
       </Switch>
);

export default Main;