import React from 'react';
import '../BaseCss/Base.css';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends React.Component< {}, {}> {

  render() {
  
    return (
      <div className="Home">
        <header className="hero-image">
        </header>
        <div className="row text-center intro-text">
          <div className="col-12">
          <h2>Not your average<br />tapas restaurant</h2>
            <p className="primary-intro-paragraph">We are all about locally sourced sea food, fish and ingredients to guarantee you only the best quality of produce available in the North.<br /><br />Our unique culinary experience is based on one simple principle, food should be enjoyed in a relaxed atmosphere. That is why we only offer two sittings every night, each three hours long, so you can stay and take in all the flavors at your own pace.<br /><br/>Welcome to <span className="text-highlight">La Casa Del Mar</span>!</p>
          </div>
        </div>

        <div className="break-point-img-one"></div>

        <div className="row text-center intro-text-two">
          <div className="col-12">
            <h2>Not your average<br />selection</h2>
            <p className="primary-intro-paragraph">Our selection comprise of the best that sea has to offer combined with only small selection of the best Spanish wines.<br /><br />We help you to carefully pair each dish with just the perfect glass, and build our menu according to the seasons.</p>
          </div>
        </div>

        <div className="break-point-img-two"></div>

        <div className="row text-center intro-text-three">
          <div className="col-12">
            <h2>September<br />specials</h2>
            <p className="primary-intro-paragraph">Get cozy with these classic cold weather Spanish tapas fresh on our menu this month!</p>
            <hr className="menu-hr"/>
            <ul className="primary-intro-menu">
              <li>Champiñones rellenos (Stuffed Mushrooms)</li>
              <li>Gambas al Ajillo (Garlic Shrimp)</li>
              <li>Buñuelos de bacalao (Salt Cod Fritters)</li>
              <li>Boquerones en Vinagre (Anchovies Marinated in Vinegar)</li>
              <li>Patatas revolconas (Paprika Mashed Potatoes)</li>
            </ul>
            <p className="primary-intro-paragraph">And we celebrate La Rioja Grape Harvest Festival in Logroño with a wine tasting from the region.</p>
          </div>
        </div>

        <div className="break-point-img-three">
          <div className="img-four-box">
            <div className="img-four-text">
              <p>We invite spacious and stylish culinary experience in luxury setting, thrive most with parties of six or more and encourage social dining.<br />We highly recommend booking in advance!</p>
              <Link to='/booking'>
                <img className="home-booking-link"
                  src="https://svgsilh.com/svg/32681-9d8560.svg" 
                  alt="fish icon"
                  // height="100px"
                  width="auto" />
                <h4 className="booking-text">Go to Bokkings!</h4>
              </Link>  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;