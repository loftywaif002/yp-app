import React from 'react';
import {Switch, Route } from 'react-router'; //react-router-v4

//Import Components
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AboutMe from './components/AboutMe';
const Main = () => (
       <Switch>
         <Route exact path='/' render={() => (<div><Signup /></div>)}></Route>
          <Route exact path='/dashboard' render={() => (<div><Dashboard /></div>)}></Route>
         <Route exact path='/aboutme' render={() => (<div><AboutMe /></div>)}></Route>
       </Switch>
);

export default Main;