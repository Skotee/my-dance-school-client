/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import Dashboard from './components/Dashboard.jsx'
import Login from './screens/Login.jsx'
import { API_URL } from './config/server.config'

function App() {
  const [userData, setUserData] = useState(null)

  const auth = async () => {
    axios.get(`${API_URL}/auth`, { withCredentials: true })
    .then(function (response) {
      console.log('zalogowany')
      console.log('response', response.status)
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  
  const logout = async () => {
    axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
    .then(function (response) {
      console.log('logout')
      console.log('response', response)
      setUserData(null)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  return (
    <div className="App">
      {userData !== null ? 
      <Dashboard>
        <button onClick={logout}>Logout</button>
      </Dashboard> : <Login setUserData={setUserData} /> }
    </div>
  )
}

export default App
