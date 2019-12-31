import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
//import ModalPortal from './ModalPortal';
import * as serviceWorker from './serviceWorker';

// *** Top renderer of my react app


ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<ModalPortal />, document.getElementById('modal'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
