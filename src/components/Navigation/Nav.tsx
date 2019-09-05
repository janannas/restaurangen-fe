import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends React.Component< {}, {}> {
  
  render() {
  
    return (
      <nav className="nav-style">
        <Link to='/'>
            <h2>Logo</h2>
        </Link>
          <ul className="nav-links">
						<Link to='/booking'>
                <li>Booking</li>
            </Link>
            <Link to='/contact'>
                <li>Contact Us</li>
            </Link>
            <Link to='/admin'>
                <li>Admin</li>
            </Link>
          </ul>

      </nav>
    ); 
  }
}

export default Nav;
