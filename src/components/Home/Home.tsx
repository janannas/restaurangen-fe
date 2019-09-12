import React from 'react';
import '../BaseCss/Base.css';
import './Home.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab} from '@fortawesome/free-brands-svg-icons';
import { faArrowUp} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fab, faArrowUp);

class Home extends React.Component{
  constructor(props: any) {
    super(props);  

  }

  topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <div className="Home" >

        <button onClick={this.topFunction} id="myBtn" title="Go to top">
        <FontAwesomeIcon icon='arrow-up' />
        </button>
  
        <header className="hero-image">
        </header>
        <div className="row text-center intro-text">
          <div className="col-12">
            <h2>Not your average<br />tapas restaurant</h2>
            <p className="primary-intro-paragraph">We are all about locally sourced sea food, fish and ingredients to guarantee you only the best quality of produce available in the North.<br /><br />Our unique culinary experience is based on one simple principle, food should be enjoyed in a relaxed atmosphere. That is why we only offer two sittings every night, each three hours long, so you can stay and take in all the flavors at your own pace.<br /><br />Welcome to <span className="text-highlight">La Casa Del Mar</span>!</p>
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
            <hr className="menu-hr" />
            <ul className="primary-intro-menu">
              <li>
                <p className="bold mb-0">Champiñones rellenos</p>
                <p className="small-italic mb-0">(Stuffed Mushrooms)</p>
                <p className="bold">120:-</p>
              </li>
              <li>
                <p className="bold mb-0">Gambas al Ajillo</p>
                <p className="small-italic mb-0">(Garlic Shrimp)</p>
                <p className="bold">145:-</p>
              </li>
              <li>
                <p className="bold mb-0">Buñuelos de bacalao</p>
                <p className="small-italic mb-0">(Salt Cod Fritters)</p>
                <p className="bold">135:-</p>
              </li>
              <li>
                <p className="bold mb-0">Boquerones en Vinagre</p>
                <p className="small-italic mb-0">(Anchovies Marinated in Vinegar)</p>
                <p className="bold">130:-</p>
              </li>
              <li>
                <p className="bold mb-0">Patatas revolconas</p>
                <p className="small-italic mb-0">(Paprika Mashed Potatoes)</p>
                <p className="bold">115:-</p>
              </li>
            </ul>
            <hr className="menu-hr" />
            <p className="primary-intro-paragraph">And we celebrate La Rioja Grape Harvest Festival in Logroño with a wine tasting from the region.</p>
          </div>
        </div>
  
        <div className="break-point-img-three p-3">
          <div className="img-four-box">
            <div className="img-four-text">
              <p>We invite spacious and stylish culinary experience in luxury setting, thrive most with parties of six or more and encourage social dining.</p>
              <p>We highly recommend booking in advance!</p>
              <Link to='/booking'>
                <img className="home-booking-link"
                  src="https://svgsilh.com/svg/32681-9d8560.svg"
                  alt="fish icon"
                  width="auto" />
                <h4 className="booking-text mt-3">Go to Bookings!</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

  }
}


export default Home;