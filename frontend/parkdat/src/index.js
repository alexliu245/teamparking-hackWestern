import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

import { Provider } from 'react-redux';
import store from './store.js';

import App from './App';
import Client from './pages/Client';
import Owner from './pages/Owner';
import OwnerTransactions from './pages/OwnerTransactions.js';

render(
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path='/' component={App} />
				<Route path='/client' component={Client} />
				<Route path='/owner' component={Owner} />
				<Route path='/owner-transactions' component={OwnerTransactions} />
			</div>
		</Router>
	</Provider>,
	document.getElementById('root')
);
