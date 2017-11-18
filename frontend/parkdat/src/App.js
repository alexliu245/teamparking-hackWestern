import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import './index.js';
import SensorModel from './components/SensorModel';
import OwnerModel from './components/OwnerModel';

class App extends Component {

	render() {
		// const { sensor } = Model.getSensors();
		return (
			<div>
				<SensorModel></SensorModel>
				<OwnerModel></OwnerModel>
			</div>
		);
	}
}

export default App;
