import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import './index.css';
import reducer from './Reducer';

let store = createStore(reducer);

ReactDOM.render(<App store = {store}/>, document.getElementById('root'));
registerServiceWorker();
