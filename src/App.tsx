import React from 'react';
import './App.css';
import Title from './components/Title'
import GameContextProvider from './contexts/GameContext';
import GameContainer from './components/GameContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Title />
      <GameContextProvider>
        <GameContainer />
      </GameContextProvider>
    </div>
  );
}

export default App;
