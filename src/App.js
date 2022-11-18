/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import React from 'react'
import Reset from './components/Reset/Reset'
import Login from './components/Login/Login'
import Header from './components/Header/Header'
import UserContext from './contexts/UserContext'
import Content from './components/Content/Content'
import WalletContext from './contexts/WalletContext'
import Register from './components/Register/Register'
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
        'X-Parse-Application-Id': 'o2j7K6vO2BBQbbcnD6LdMBFWGf9AJxiKalq7EnNc',
        'X-Parse-REST-API-Key': 'ouyihXbUZvYCqVhgcz9DHUaKUxiOsb6d51Muk6mD',
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
      .catch(error => console.log(error))
  }

  return (
    <BrowserRouter>
      <div className="App">
        <WalletContext.Provider value={{ connected, setConnected }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Header />
            <Routes>
              <Route path='/' element={<Content />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='reset' element={<Reset />} />
            </Routes>
          </UserContext.Provider>
        </WalletContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App
