import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import './index.css';
import reducer from './Reducer';

let store = createStore(reducer);

persistStore(store,{blacklist: ['user','playlistEditting','spotify','searchedTracks']},() => {console.log("restored");});

ReactDOM.render(<App store = {store}/>, document.getElementById('root'));
registerServiceWorker();
