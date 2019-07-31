import React from 'react';
import './App.css';
import Title from './components/Title'
import Timer from './components/Timer'
import GameContextProvider from './contexts/GameContext';
import GameStatus from './components/GameStatus'
import GameContainer from './components/GameContainer';
import HighScores from './components/HighScores';

const App: React.FC = () => {
  return (
    <div className="app">
      <Title />
      <GameContextProvider>
        <GameStatus />
        <GameContainer />
        <Timer />
        <HighScores />
      </GameContextProvider>
    </div>
  );
}

export default App;
