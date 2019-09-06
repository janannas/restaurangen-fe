import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

class Nav extends React.Component< {}, {}> {
  
  render() {
  
    return (
      <nav className="nav-style row">
        <Link className="nav-logo col-12 col-lg-6" to='/'>
            <img className="nav-crab-logo"
                src="https://svgsilh.com/svg/2028176-9d8560.svg" 
                alt="crab logo"
                height="70px"
                width="auto" />
            <h2>La Casa Del Mar</h2>
        </Link>
          <ul className="nav-links col-12 col-lg-6">
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
