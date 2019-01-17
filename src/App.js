import React, { Component } from 'react';
import './App.css';
import Routing from './Routing';

class App extends Component {
  render() {
    return (
        <div className="App">
          <div class="bg-image" />
          <Routing />
        </div>
    );
  }
}

export default App;
