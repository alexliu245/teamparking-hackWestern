import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import './index.js';

class App extends Component {
	render() {
		return (
			<div>
				<h2>HOME</h2>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

export default App;
