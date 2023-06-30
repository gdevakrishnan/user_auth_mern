import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Dashboard</Link>
          </li>
          <li>
            <Link to={'/register'}>Register</Link>
          </li>
          <li>
            <Link to={'/login'}>Login</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  )
}

export default Navbar