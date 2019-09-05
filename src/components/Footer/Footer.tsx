import React from 'react';
import './Footer.css' ;

class Footer extends React.Component< {}, {}> {
  
  render() {
  
    return (
      <footer className="Footer">
        <section className="footer-text">
        <img className="footer-logo"
            src="https://svgsilh.com/svg/2028176-013240.svg" 
            alt="crab logo"
            height="200px"
            width="auto" />
          <h1>La Casa Del Mar</h1>
          <p>...</p>
          <p>Tulegatan 41, Vasastan, 144 88 Stockholm</p>
          <p>Tel: +46 070123 44 88</p>
          <p>bookings@lacasadelmar.com</p>
        </section>
        <section className="map-container">
          
        </section>
      </footer>
    );
  }
}

export default Footer;