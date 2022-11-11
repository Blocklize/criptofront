import './App.css';
import React from 'react';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import WalletContext from './contexts/WalletContext';
import Register from './components/Register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [connected, setConnected] = React.useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <WalletContext.Provider value={{ connected, setConnected }}>
          <Header />
          <Routes>
            <Route path='/' element={<Content />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Routes>
        </WalletContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App;
