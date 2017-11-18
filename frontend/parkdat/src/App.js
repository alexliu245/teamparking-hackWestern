import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Well, Grid, Row, Col} from 'react-bootstrap';
import {Navigation} from './components/Navbar.js';

import './App.css';
import './index.js';
import SensorModel from './components/SensorModel';
import OwnerModel from './components/OwnerModel';

class App extends Component {

	render() {
		// const { sensor } = Model.getSensors();
		return (
			<div>
				<Navigation></Navigation>
				<div className="container">
					<h1> Welcome Home <small> & Hello World</small></h1>
					<p> Hello! This is your personal parking spot dashboard! </p>
					<Grid>
				    <Row>
				      <Col xs={12} lg={8}><h3>Text Here - ONE</h3>
								<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis placerat nisl, et tristique nunc. Etiam hendrerit hendrerit vehicula. Duis a rutrum purus, vitae tempor justo. Praesent pharetra elit felis, ut ullamcorper sem tincidunt sed. Integer a enim sed justo fringilla rutrum vitae eget risus. Etiam sit amet fermentum turpis. Sed a dolor at mi consequat placerat.

									Aliquam vestibulum metus ut nisl pretium commodo. Curabitur accumsan sodales tellus non consequat. Sed nec nibh ac justo posuere lobortis et in nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sollicitudin eu velit vel aliquam. Nullam varius, est at vestibulum sollicitudin, ex lorem posuere diam, vel efficitur turpis tellus quis magna.
								</p>
							</Col>
				      <Col xs={12} lg={4}>
								<h3>Text Here - THREE</h3>
								<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis placerat nisl, et tristique nunc. Etiam hendrerit hendrerit vehicula. Duis a rutrum purus, vitae tempor justo. Praesent pharetra elit felis, ut ullamcorper sem tincidunt sed. Integer a enim sed justo fringilla rutrum vitae eget risus. Etiam sit amet fermentum turpis. Sed a dolor at mi consequat placerat.

									Aliquam vestibulum metus ut nisl pretium commodo. Curabitur accumsan sodales tellus non consequat. Sed nec nibh ac justo posuere lobortis et in nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sollicitudin eu velit vel aliquam. Nullam varius, est at vestibulum sollicitudin, ex lorem posuere diam, vel efficitur turpis tellus quis magna.
								</p>
							</Col>
				    </Row>
  				</Grid>
			</div>
			</div>

		);
	}
}

export default App;
