import './App.css';
import React from 'react';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import WalletContext from './contexts/WalletContext';

function App() {
  const [connected, setConnected] = React.useState(false)

  return (
    <div className='App'>
      <WalletContext.Provider value={{connected, setConnected}}>
        <Header />
        <Content />
      </WalletContext.Provider>
    </div>
  )
}

export default App;
