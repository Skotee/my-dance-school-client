/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import  Students  from './screens/students.jsx'
import Groups from './screens/Groups.jsx'
import styled from 'styled-components'

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  height: 100vh;

`
const SideNav = styled.ul`
  list-style: none;
  flex: 0 0 200px;
  background-color: #282c34;
  margin: 0;
  li a{
    color: white;
  }
`

function App() {
  return (
    <div className="App">
        <Router>
          <Container>
            <SideNav>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/students">Kursanci</Link>
              </li>
              <li>
                <Link to="/groups">Grupy</Link>
              </li>
            </SideNav>
              <div>
              <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/students">
                <Students />
              </Route>
              <Route path="/groups">
                <Groups />
              </Route>
            </Switch>
              </div>
           
          </Container>
        </Router>
    </div>
  )
}

export default App
