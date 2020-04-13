/*
 ===============================================================================
 ===============================================================================
 =
 = Final project: Kibbutz-19 Client
 = Module: App.js
 = Created: 07-Apr-2020
 = Created by: Ric Mershon
 =
 = Description: Entry point for the Kibbutz-19 Client. Defines all
 = the dependencies, configuration, middleware, database operations and
 = controllers needed for the app to run. Defines the root route and sets
 = up the listener for the html port.
 =
 ===============================================================================
 ===============================================================================
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './components/Main'
import Navigation from './components/Navigation'
import News from './components/News.js'
import Data from './components/Data.js'

import './App.css';


class App extends Component {

  render() {
    return (
      <Router>
        <>
          <Navigation/>
          <Route path='/' exact component={Main}/>
          <Route path='/news' component={News}/>
          <Route path='/data' component={ Data }/>
        </>
    </Router>
    );
  }
}

export default App;
