import React from 'react';
import '../BaseCss/Base.css';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-style row">
      <ul className="nav-links col-6 col-lg-4 order-lg-first">
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/booking'>
          <li>Booking</li>
        </Link>
      </ul>

      <Link className="nav-logo col-12 col-lg-4 order-first" to='/'>
        <img
          className="nav-crab-logo"
          src="https://svgsilh.com/svg/2028176-9d8560.svg"
          alt="crab logo"
          height="60px"
          width="auto"
        />
        <h1>La Casa Del Mar</h1>
      </Link>

      <ul className="nav-links col-6 col-lg-4 order-lg-12">
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

export default Nav;
