import React from 'react';
import '../BaseCss/Base.css';
import './Footer.css' ;
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoia3JhZWluIiwiYSI6ImNqeGE2dXg0aTAwcmMzcnBiMmoyYnMwcjYifQ.eM_9TD9N2GdmB2w4hEw83w"
});

class Footer extends React.Component< {}, {}> {
  
  render() {
  
    return (
      <footer className="Footer row">
        <section className="footer-text col-12 col-lg-6">
        <img className="footer-logo"
            src="https://svgsilh.com/svg/2028176-013240.svg" 
            alt="crab logo"
            height="150px"
            width="auto" />
          <h2>La Casa Del Mar</h2>
          <p>...</p>
          <p>Tulegatan 41</p>
          <p>144 88, Stockholm</p>
          <p>Tel: +46 070 123 44 88</p>
          <p className="bold">bookings@lacasadelmar.com</p>
        </section>
        <section className="map-container col-12 col-lg-6">
          <Map className="map"
            style="mapbox://styles/mapbox/light-v10"
            zoom={[12]}
            center={[18.05852, 59.34603]}
            containerStyle={{
              height: "100%",
              width: "100%"
            }}>
              <Layer
                type="symbol"
                id="points1"
                anchor="bottom"
                layout={{ "icon-image": "harbor-15" }}>
                <Feature coordinates={[	18.05852, 59.34603 ]}/>
              </Layer>
          </Map>
        </section>
      </footer>
    );
  }
}

export default Footer;
