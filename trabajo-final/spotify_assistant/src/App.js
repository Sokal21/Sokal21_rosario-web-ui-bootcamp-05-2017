import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/login'
import UIapi from './components/UIapi'

class App extends Component {

  render() {
    return (
      <Provider store = {this.props.store}>
        <Router>
          <div className="Container">
            <Route exact path="/" component={Login}/>
            <Route path="/callback" component={UIapi} store = {this.store}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
