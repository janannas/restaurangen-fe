import React from 'react';
import '../BaseCss/Base.css';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

require('bootstrap');


const Contact = () => {
  return (
    <main className="Contact container-fluid">
      <div className="row contact-heading">
        <h2 className="col-12">CONTACT US</h2>
      </div>

      <section className="row justify-content-center mb-3">
          <div className="col-10 col-md-5 contact-details">
              <div className="social-icons-wrapper">
                  <div className="icon-frame">
                      <a href="https://www.facebook.com" aria-label="Find us on facebook"><FontAwesomeIcon className="social-icon" icon={['fab', 'facebook-f']} /></a>
                  </div>
                  <div className="icon-frame">
                      <a href="https://www.instagram.com" aria-label="Find us on instagram"><FontAwesomeIcon className="social-icon" icon={['fab', 'instagram']} /></a>
                  </div>
                  <div className="icon-frame">
                      <a href="https://www.twitter.com" aria-label="Find us on twitter"><FontAwesomeIcon className="social-icon" icon={['fab', 'twitter']} /></a>
                  </div>
              </div>

              <div>
              	<p className="mb-0 bold">LA CASA DEL MAR</p>
              	<p className="mb-0">TULEGATAN 41</p>
            		<p>144 88 STOCKHOLM, SE</p>
              	<p className="mb-0 bold">EMAIL AND PHONE</p>
								<p className="mb-0">BOOKINGS@LACASADELMAR.COM</p>
								<p>+46 070123 44 88</p>
              </div>

        <div className="col-12 col-lg-4 contact-details">
          <div className="social-icons-wrapper">
            <div className="icon-frame">
              <a href="https://www.facebook.com" aria-label="Find us on facebook">
                <FontAwesomeIcon className="social-icon" icon={['fab', 'facebook-f']} />
              </a>
            </div>
            <div className="icon-frame">
              <a href="https://www.instagram.com" aria-label="Find us on instagram"><FontAwesomeIcon className="social-icon" icon={['fab', 'instagram']} /></a>
            </div>
            <div className="icon-frame">
              <a href="https://www.twitter.com" aria-label="Find us on twitter"><FontAwesomeIcon className="social-icon" icon={['fab', 'twitter']} /></a>
            </div>
          </div>

          <div className="col-10 col-md-5">
              <form action="mailto:bookings@lacasadelmar.com" className="contact-card">

            <div className="name-line">
              <label htmlFor="fname"></label>
              <input type="text" id="fname" name="firstname" className="text-input" placeholder=" First Name" />

              <label htmlFor="lname"></label>
              <input type="text" id="lname" name="lastname" className="text-input" placeholder=" Last Name" />
            </div>

            <label htmlFor="telephone"></label>
            <input type="text" id="telephone" name="telephone" placeholder=" Telephone Number" className="text-input" />

            <label htmlFor="subject"></label>
            <textarea id="subject" name="subject" placeholder=" Your message" className="text-area"></textarea>

            <button type="submit" className="submit-form-button btn submit-form-button">SEND E-MAIL</button>

          </form>
        </div>

      </section>
    </main>
  );
}

export default Contact;