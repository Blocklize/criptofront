/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import React from 'react'
// Components
import Header from './components/Header/Header'
// Pages
import Reset from './pages/Reset/Reset'
import Login from './pages/Login/Login'
import Content from './pages/Content/Content'
import Profile from './pages/Profile/Profile'
import Recover from './pages/Recover/Recover'
import Register from './pages/Register/Register'
// Contexts
import UserContext from './contexts/UserContext'
import WalletContext from './contexts/WalletContext'
// Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [user, setUser] = React.useState({})
  const [connected, setConnected] = React.useState(false)
  React.useEffect(() => {
    const token = localStorage.getItem("JWT")
    if (token) {
      handleUserData(token)
    }
  }, [])

  const handleUserData = async (webToken) => {
    const config = {
      method: 'post',
      headers: {
        'X-Parse-Application-Id': process.env.REACT_APP_ID,
        'X-Parse-REST-API-Key': process.env.REACT_APP_KEY,
        'X-Parse-Session-Token': webToken,
        'Content-Type': 'application/json'
      }
    }
    await fetch('https://parseapi.back4app.com/functions/returnUser', config)
      .then(resp => resp.json())
      .then(json => {
        if (!json.error) {
          localStorage.setItem("JWT", webToken)
          setUser({
            CPF: json.result.cpf,
            Name: json.result.nome,
            Email: json.result.email,
            Address: json.result.address,
          })
          setConnected(true)
        } else {
          setConnected(false)
        }
      })
      .catch(error => {throw error})
  }

  return (
    <BrowserRouter>
      <div className="App">
        <WalletContext.Provider value={{ connected, setConnected }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Header />
            <Routes>
              <Route path='*' element={<Content />} />
              <Route path='/' element={<Content />} />
              <Route path='login' element={<Login />} />
              <Route path='reset' element={<Reset />} />
              <Route path='profile' element={<Profile />} />
              <Route path='register' element={<Register />} />
              <Route path='recover-password/:id' element={<Recover />} />
            </Routes>
          </UserContext.Provider>
        </WalletContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App
