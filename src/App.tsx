import React from 'react';
import './App.css';
import GameContextProvider from './contexts/GameContext';
import GameContainer from './components/GameContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <GameContextProvider>
        <GameContainer />
      </GameContextProvider>
    </div>
  );
}

export default App;
