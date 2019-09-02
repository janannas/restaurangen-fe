import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Navigation/Nav';
import Home from './components/Home/Home';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import Admin from './components/Admin/Admin';
import Booking from './components/Booking/Booking';


class App extends React.Component< {}, {}> {
  
  render() {
  
    return (
      <div className="App">
        <Router>
          <Nav />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
							<Route path="/booking" component={Booking} />
              <Route path="/shop" component={Shop} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
