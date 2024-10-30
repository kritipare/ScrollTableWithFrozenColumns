import React from 'react';
import {logo} from './util/contants';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <h1>
          Data Table with frozen columns
        </h1>
      </header>
    </div>
  );
}

export default App;
