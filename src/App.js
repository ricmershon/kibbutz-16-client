/*
 ===============================================================================
 ===============================================================================
 =
 = Final project: Kibbutz-19 Client
 = Module: App.js
 = Created: April 2020
 = Created by: Ric Mershon
 =
 = Description: Entry point for the Kibbutz-19 Client. Defines React Routes.
 =
 ===============================================================================
 ===============================================================================
 */

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Main from './components/Main'
import News from './components/News.js'
import ChartData from './components/ChartData.js'

import './App.css';

const App = () => {
  return (
    <Router>
      <>
        <Navigation/>
        <Route path='/' exact component={Main}/>
        <Route path='/news' component={News}/>
        <Route path='/data' component={ ChartData }/>
      </>
  </Router>
  );
}

export default App;
