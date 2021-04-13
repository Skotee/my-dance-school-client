/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Http } from '@material-ui/icons'
import axios from 'axios'
import React from 'react'
import './App.css'
import Dashboard from './components/Dashboard.jsx'
import LoginScreen from './screens/Login.jsx'
import Login from './screens/Login.jsx'

// const URL = 'https://dance-school-management-system.herokuapp.com'
const URL = 'http://localhost:3000'

const auth = async () => {
  axios.get(`${URL}/auth`, { withCredentials: true })
  .then(function (response) {
    console.log('zalogowany')
    console.log('response', response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

const logout = async () => {
  axios.post(`${URL}/auth/logout`, {
  }, { withCredentials: true })
  .then(function (response) {
    console.log('logout')
    console.log('response', response)
  })
  .catch(function (error) {
    console.log(error)
  })
}

const login = async () => {
  axios.post(`${URL}/auth/login`, {
    mail:'maryla@gmail.com',
    password: 'maryla'
  },
  { withCredentials: true })
  .then((response) => {
    console.log('login')
    console.log('response', response)
  })
  .catch((error) => {
    console.log(error)
  })
}
function App() {
  // login()
  // setTimeout(()=>logout(),3000)
  // auth()
  // logout()
  return (
    <div className="App">
      <Login/>
    </div>
  )
}

export default App
