import React, { Fragment } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';


function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Outlet />
      </Router>
    </Fragment>
  )
}

export default App