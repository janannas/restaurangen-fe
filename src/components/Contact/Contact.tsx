import React from 'react';
import '../BaseCss/Base.css';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

require('bootstrap');


class Contact extends React.Component< {}, {}> {
  
  render() {
  
    return (
    <main className="Contact container-fluid">

      <div className="contact-heading">
          <h2>CONTACT US</h2>
      </div>

      <section className="row contact_form">
          <div className="col-12 col-lg-4 contact_details">
              <div className="socila_icons_wrapper">
                  <div className="icon_frame">
                      <a href="https://www.facebook.com" aria-label="Find us on facebook"><FontAwesomeIcon className="social-icon" icon={['fab', 'facebook-f']} /></a>
                  </div>
                  <div className="icon_frame">
                      <a href="https://www.instagram.com" aria-label="Find us on instagram"><FontAwesomeIcon className="social-icon" icon={['fab', 'instagram']} /></a>
                  </div>
                  <div className="icon_frame">
                      <a href="https://www.twitter.com" aria-label="Find us on twitter"><FontAwesomeIcon className="social-icon" icon={['fab', 'twitter']} /></a>
                  </div>
              </div>

              <div className="contact-text-only">
              <p>LA CASA DEL MAR</p>
              <p>TULEGATAN 41,<br />VASASTAN, 144 88 STOCKHOLM, SE</p>
              <p>GET DIRECTIONS >></p>
              <p>EMAIL AND PHONE<br />BOOKINGS@LACASADELMAR.COM<br />+46 070123 44 88</p>
              </div>

          </div>

          <div className="col-12 col-lg-8">
              <form action="mailto:help@barleycatering.com" className="contact_card">

                  <div className="name_line">
                      <label htmlFor="fname"></label>
                      <input type="text" id="fname" name="firstname" className="text_input" placeholder=" First Name" />

                      <label htmlFor="lname"></label>
                      <input type="text" id="lname" name="lastname" className="text_input" placeholder=" Last Name" />
                  </div>

                  <label htmlFor="telephone"></label>
                  <input type="text" id="telephone" name="telephone" placeholder=" Telephone Number" className="text_input" />

                  <label htmlFor="subject"></label>
                  <textarea id="subject" name="subject" placeholder=" Your message" className="text-area"></textarea>

                  <input name="mail_to" type="submit" className="contact_button" value="SUBMIT" />

              </form>

          </div>

      </section>

    </main>

    );
  }
}

export default Contact;