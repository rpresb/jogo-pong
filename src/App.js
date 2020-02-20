import React from 'react';
import './App.css';
import Pong from './components/Pong';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Pong />
      </GameProvider>
    </div>
  );
}

export default App;
