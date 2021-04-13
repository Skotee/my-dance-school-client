/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import Dashboard from './components/Dashboard.jsx'
import Login from './screens/Login.jsx'

function App() {
  const [isAuthed, setIsAuthed] = useState(false)

  const auth = async () => {
    axios.get('http://localhost:3000/auth', { withCredentials: true })
    .then(function (response) {
      console.log('zalogowany')
      console.log('response', response.status)
      if (response.status === 200) {
        setIsAuthed(true)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  
  const logout = async () => {
    axios.post('http://localhost:3000/auth/logout', { withCredentials: true })
    .then(function (response) {
      console.log('logout')
      console.log('response', response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  
  const login = async () => {
    axios.post(
      'http://localhost:3000/auth/login', 
    {
      mail:'maryla@gmail.com',
      password: 'maryla'
    },
    {
      withCredentials: true 
    })
    .then((response) => {
      console.log('login')
      console.log('response', response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  login()
  console.log('isAuthed', isAuthed)
  
  // auth()
  // setTimeout(() => {
  //   console.log('isAuthed', isAuthed)
    
  // }, 3000)
  
  // if (isAuthed) {
  //   return (
  //     <div className="App">
  //       <Dashboard />
  //     </div>
  //   )
  // }

  return (
    <div className="App">
    <Login />
  </div>
  )
}

export default App
