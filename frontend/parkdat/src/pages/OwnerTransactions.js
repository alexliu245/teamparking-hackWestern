import React from 'react';
// import ReactDOM from 'react-dom';
// import {FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import uuidv4 							  from 'uuid/v4';
import {Navigation} from '../components/Navbar.js';
import {AddressData} from '../components/AddressData.js';
import { connect } from 'react-redux';
import { getTransactionData } from '../actions/Actions';
import { createStructuredSelector } from 'reselect';
import { selectTransactionData } from '../selectors';
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
    this.props.getTransactionData();
  }
  componentDidMount(){
    this.props.getTransactionData();
    console.log ("COMPONENT DID MOUNT");
    console.log (this.props.transactionData);
    this.setState({
      transactionData: this.props.transactionData
    });
  }
	render() {
    // this.props.getTransactionData();
    // console.log("TRANSACTION DATA")
    // console.log(this.props.transactionData);

    const style = {
      width : "80%",
      padding: "0 3%"
    }
		return (
			<div>
				<Navigation></Navigation>
        <div className="container">
          <h2> Sensor Transactions </h2>
          {/* {this.props.transactionData.map( ( res ) => {
            return <div key={ uuidv4 }>
              {console.log(this.props.transactionData)}
                  <div> <h4><u>{res.address} </u></h4></div>
                  <div> <b> Coordinates : </b> {res.location.coordinates}</div>
                  <div> <b> Hourly Rental: </b>{res.hourly_rental} </div>
                  <div> <b> Start Time: </b> {res.start_time} </div>
                  <div> <b> End Time: </b> {res.start_time} </div>
                  <div> <b> Earn: </b> $ {res.value} </div>

            </div>
            })
          } */}
            <SensorTransactionTable />
			</div>
			</div>
		);
	}
}

const structuredSelector = createStructuredSelector({
    transactionData: selectTransactionData,
})
const mapDispatchToProps = dispatch => {
   return {
     getTransactionData: () => dispatch(getTransactionData())
   }
}
export default connect(
  structuredSelector,
  mapDispatchToProps
)(OwnerTransactions)
