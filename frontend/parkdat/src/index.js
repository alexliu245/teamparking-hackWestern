import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import Client from './pages/Client';
import Owner from './pages/Owner';

ReactDOM.render(
	<Router>
		<div>
			<Route exact path='/' component={App} />
			<Route path='/client' component={Client} />
			<Route path='/owner' component={Owner} />
		</div>
	</Router>, 
	document.getElementById('root')
);
