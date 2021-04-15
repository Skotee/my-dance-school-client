/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import Dashboard from './components/Dashboard.jsx'
import Login from './screens/Login.jsx'

const URL_AUTH_LOGOUT_LOCAL = 'http://localhost:3000/auth/logout'
const URL_AUTH_LOGOUT_PROD = 'https://dance-school-management-system.herokuapp.com/auth/logout'

const URL_AUTH_LOCAL = 'http://localhost:3000/auth'
const URL_AUTH_PROD = 'https://dance-school-management-system.herokuapp.com/auth'

function App() {
  const [userData, setUserData] = useState(null)

  const auth = async () => {
    axios.get(URL_AUTH_PROD, { withCredentials: true })
    .then(function (response) {
      console.log('zalogowany')
      console.log('response', response.status)
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  
  const logout = async () => {
    axios.post(URL_AUTH_LOGOUT_PROD, {}, { withCredentials: true })
    .then(function (response) {
      console.log('logout')
      console.log('response', response)
      setUserData(null)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  console.log('test ENVA', process.env.SUPER_TEST)
  console.log(process.env.NODE_ENV)

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
