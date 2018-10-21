import React from 'react';
import {Switch, Route } from 'react-router'; //react-router-v4

//Import Components
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AboutMe from './components/AboutMe';
import Email from './components/Email';
import Password from './components/Password';
import Locations from './components/Locations';
const Main = () => (
       <Switch>
         <Route exact path='/' render={() => (<div><Signup /></div>)}></Route>
         <Route exact path='/dashboard' render={() => (<div><Dashboard /></div>)}></Route>
         <Route exact path='/aboutme' render={() => (<div><AboutMe /></div>)}></Route>
         <Route exact path='/updateEmail' render={() => (<div><Email  /></div>)}></Route>
         <Route exact path='/updatePassword' render={() => (<div><Password /></div>)}></Route>
         <Route exact path='/updateLocations' render={() => (<div><Locations /></div>)}></Route>
       </Switch>
);

export default Main;