import React from 'react';
import axios from 'axios';
import { sensors, addSensor } from './IndexSensor.js';
import SensorService from './SensorService';

class SensorModel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.addSensorService = new SensorService
	}

	componentWillMount() {
		axios.get('http://parkingapp.bsyes82dni.us-east-1.elasticbeanstalk.com/sensor/5a104cbd96bd8a44db6e9255/session/sensor')
		.then(response => {
			this.setState({ value: response.data });
		})
		.catch(function(error) {
			console.log(error);
		})
	}

	render() { 
		addSensor(this.state.value);
		return (
			<div>
				<h2>{sensors[0].owner}</h2>
			</div>
		);
	}
}

export default SensorModel
