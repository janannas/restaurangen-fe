import React from 'react';
import './App.css';
import Nav from './components/Navigation/Nav';
import Home from './components/Home/Home';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component< {}, {}> {
  
  render() {
  
    return (
      <Router>
        <div className="App">
          <Nav />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/shop" component={Shop} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
