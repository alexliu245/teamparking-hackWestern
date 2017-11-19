import React from 'react';
// import ReactDOM from 'react-dom';
// import {FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import {Navigation} from '../components/Navbar.js';
import {AddressData} from '../components/AddressData.js';
import { connect } from 'react-redux';
import { getSensorData } from '../actions/Actions';
import { createStructuredSelector } from 'reselect';
import { selectSensorData } from '../selectors';
import SensorTransactionTable from '../components/OwnerTransactionsTable.js';
import '../index.js';
import '../App.css';
import '../components/react-bootstrap-table-all.min.css';


class OwnerTransactions extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value:''
    }
  }
	render() {
    this.props.getSensorData();
    // console.log(this.props.sensorData);

    const style = {
      width : "80%",
      padding: "0 3%"
    }
		return (
			<div>
				<Navigation></Navigation>
        <div className="container">
          <h2> Sensor Transactions </h2>
            <SensorTransactionTable />
			</div>
			</div>
		);
	}
}

const structuredSelector = createStructuredSelector({
    sensorData: selectSensorData,
})
const mapDispatchToProps = dispatch => {
   return {
     getSensorData: () => dispatch(getSensorData())
   }
}
export default connect(
  structuredSelector,
  mapDispatchToProps
)(OwnerTransactions)
