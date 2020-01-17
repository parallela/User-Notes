import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import App from './app';
import Users from './users';
import Notes from './notes';

import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/notes">Notes</Link>
                </li>
                <li>
                    <Link to="/Users">Users</Link>
                </li>
            </ul>
            <Route exact path="/" component={App} />
            <Route path="/users" component={Users} />
            <Route path="/notes" component={Notes} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


serviceWorker.unregister();
