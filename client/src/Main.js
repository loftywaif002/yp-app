import React from 'react';
import {Switch, Route } from 'react-router-dom';

//Import Components
import Signup from './components/Signup';

const Main = () => (
       <Switch>
         <Route exact path='/' component={Signup}></Route>
       </Switch>
);

export default Main;