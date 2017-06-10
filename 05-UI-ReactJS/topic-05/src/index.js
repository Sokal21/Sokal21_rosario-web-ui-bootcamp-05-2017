import React from 'react';
import ReactDOM from 'react-dom';
import App_ from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let App = App_.MovieUI;
let store = App_.store;

let render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
};

store.subscribe(render);
render();
