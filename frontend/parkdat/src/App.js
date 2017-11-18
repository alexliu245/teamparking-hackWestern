import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import './index.js';
import SensorModel from './components/SensorModel';

class App extends Component {

	render() {
		// const { sensor } = Model.getSensors();
		return (
			<div>
				<SensorModel></SensorModel>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

export default App;
