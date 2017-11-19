import React from 'react';
import axios from 'axios';
import { customers, addCustomer } from './IndexCustomer.js';
import CustomerService from './CustomerService';

class OwnerModel extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.addCustomerService = new CustomerService
	}

	componentWillMount() {
		axios.get('http://parkingapp.bsyes82dni.us-east-1.elasticbeanstalk.com/customer')
		.then(response => {
			this.setState({ value: response.data });
		})
		.catch(function(error) {
			console.log(error);
		})
	}

	render() { 
		addCustomer(this.state.value);
		return (
			<div>
				<h2>{customers[0].name}</h2>
			</div>
		);
	}
}

export default CustomerModel
