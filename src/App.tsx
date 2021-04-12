/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import React from 'react'
import './App.css'
import Dashboard from './components/Dashboard.jsx'
import Login from './screens/Login.jsx'


function App() {

  return (
    <div className="App">
      <Dashboard />
    </div>
  )
}

export default App
