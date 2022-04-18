import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import {observe} from './MoveItem.js';
import registerServiceWorker from './registerServiceWorker';

observe((itemPosition) => {
  ReactDOM.render(<App itemPosition={itemPosition} />, document.getElementById('root'));
  registerServiceWorker();
});
