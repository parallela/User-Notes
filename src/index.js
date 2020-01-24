import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import * as serviceWorker from './serviceWorker';

// Global Variables
window.$apiURL = 'http://localhost:5000/api/v1'

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
