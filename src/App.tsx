import React from 'react';
import './App.css';
import Nav from './components/Navigation/Nav';
import Home from './components/Home/Home';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component< {}, {}> {
  
  render() {
  
    return (
      <div className="App">
        <Router>
          <Nav />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/shop" component={Shop} />
            </Switch>
          </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
