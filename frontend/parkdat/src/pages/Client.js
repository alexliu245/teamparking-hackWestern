import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl, FormGroup, InputGroup, Button, Grid, Row, Col} from 'react-bootstrap';
import {Navigation} from '../components/Navbar.js';
import {AddressData} from '../components/AddressData.js';
import { connect } from 'react-redux';
import { getSensorData, availableParkingSpots, assignCustomerToSensor, releaseSensorAssignment } from '../actions/Actions';
import { createStructuredSelector } from 'reselect';
import { selectSensorData, selectAvailableParkingSpot, selectCustomerToSensor, selectReleaseSensor} from '../selectors';
import Gmap from '../components/Gmap.js';
import '../index.js';
import '../App.css';

var isCheckedIn = "false";
var showCheckInButton = "displayNone";
var customerID = "5a1182988113c9063dc1feb8";
var sensorID = "5a1182998113c9063dc1febc";

class Client extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        searchedAddress: '',
        foundAddressArray: '',
        foundAddressArray1: '',
        selectedLocation: '',
        selectedCoordinates: '',
        currentTime: '',
        customerID:'',
        sensorID:'',
        isCheckedIn: "false",
        showCheckInButton: "",
        showCheckOutButton: "",
        showSearch:''
      };
      // this.getLocationsService = new getLocationsService();
      this.checkIn = this.checkIn.bind(this);
      this.checkOut = this.checkOut.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.myCallback = this.myCallback.bind(this);
    }
    checkIn(){
      // Call check in function
      var time = new Date().toLocaleString();
      this.setState ({
        currentTime: time,
        isCheckedIn: "true",
        showCheckOutButton: '',
        showCheckInButton: "displayNone",
        showSearch: "displayNone"
      });
      this.props.assignToSensor(customerID, sensorID )
      // isCheckedIn = true;
      alert ("Checked into parking spot at " + this.state.selectedLocation + " at " + this.state.currentTime )
    }
    checkOut(){
      // Call check in function
      var time = new Date().toLocaleString();
      this.setState ({
        currentTime: time,
        showCheckInButton: '',
        isCheckedIn: "false",
        showCheckOutButton: "displayNone",
        showSearch: ''

      });
      this.props.releaseSensorAssignment(this.state.sensorID)
      alert ("Checked out of parking spot at " + this.state.selectedLocation + " at " + this.state.currentTime )
    }
    myCallback(location, coordinates, price, status, customer, sensor){
      console.log ("Client has the data: " + location + "___" + coordinates + "___" + price + "___" + status );
      this.setState({
        selectedLocation: location,
        selectedCoordinates: coordinates,
        showCheckInButton: '',
        customerID: customer,
        sensorID: sensor
      });
      // showCheckInButton = 'displayNone';
    }
    handleChange(event) {
      this.setState({searchedAddress: event.target.value});
    }
    handleSubmit(event) {
      event.preventDefault();
      // alert(this.state.searchedAddress)
      // this.props.getSensorData();
      var foundAddressArray = this.props.availableParkingSpots(this.state.searchedAddress);
      // this.state.foundAddressArray = this.props.availableParkingSpots(this.state.searchedAddress);
      this.setState({
        selectedLocation: this.state.searchedAddress,
        foundAddressArray1: this.state.foundAddressArray

      });
      console.log(JSON.stringify(this.state.foundAddressArray))
      console.log(this.state.foundAddressArray1)
    }
	render() {
    const style = {
    height: '50vh'
  }
    // console.log(this.props.sensorData);
		return (
			<div>
				<Navigation></Navigation>
				<div className="container">
					<Grid>
				    <Row>
				      <Col xs={12} md={8} lg={8}>
                <h2> Welcome Client <small> & Hello World</small></h2>
      					<p> We're happy to see you! Simply enter your location below, and we'll find you a parking spot :) </p>
                <div className= {this.state.showCheckInButton}> You've selected the parking spot at: <b> {this.state.selectedLocation} </b>.
                  <p> When you arrive at your destination, click the <b>Check In</b> button below. Please note that if you do not check in within 5 minutes upon parking, the owner of the parking spot will be notified of the presence of an unauthorized vehicle.
                  </p>
                </div>
                <Button bsStyle="success" onClick={this.checkIn} className= {this.state.showCheckInButton}>CheckIn</Button>
                <div className= {this.state.showCheckOutButton}> You are currently parked at: <b> {this.state.selectedLocation} </b>.
                  <p> Click the <b>Check Out</b> button below when you leave the parking spot. Please note that if you do not leave the space within 5 minutes upon checking out, the owner of the parking spot will be notified of the presence of an unauthorized vehicle.
                  </p>
                </div>
                <Button bsStyle="danger" onClick ={this.checkOut} className={this.state.showCheckOutButton}>Check Out</Button>
                <form onSubmit={this.handleSubmit} className={this.state.showSearch}>
                <FormGroup>
                      <InputGroup>
                        <FormControl
                          type="text"
                          value={this.state.searchedAddress}
                          onChange={this.handleChange}
                        />
                        <InputGroup.Button><Button type="submit" value="Submit">Search</Button></InputGroup.Button>
                      </InputGroup>
                    </FormGroup>
                  </form>
                  <div style={style}> <Gmap coordinates={this.state.selectedCoordinates} /></div>
								<br /> <br /> <br />
							</Col>
				      <Col xs={12} md={4} lg={4} classType="displayNone">
								<h3>Parking Spots Near You</h3>
                {/* {this.state.foundAddress.type} */}
                <div className= "overflow">
                  {this.state.foundAddressArray1.address}
                  {this.state.foundAddressArray1.coordinates}
                  {/* <AddressData
                    location={this.state.foundAddressArray.address}
                    // coordinates = {res.location.coordinates}
                    // owner = {res.owner}
                    // hourly_rental = {res.hourly_rental}
                    // start_time = {res.start_time}
                    // session = {res.session}
                    callbackFromParent={this.myCallback} /> */}
                {/* {this.props.availableParkingSpots(this.state.searchedAddress).map( ( res ) => {
                  return <div key={res.address}>
                    <AddressData
                      location={res.address}
                      coordinates = {res.location.coordinates}
                      owner = {res.owner}
                      hourly_rental = {res.hourly_rental}
                      start_time = {res.start_time}
                      session = {res.session}
                      callbackFromParent={this.myCallback} />
                  </div>
                  })
                } </div> */}</div>
							</Col>
				    </Row>
  				</Grid>
			</div>
			</div>
		);
	}
}

const structuredSelector = createStructuredSelector({
    sensorData: selectSensorData,
    availableParkingSpotData: selectAvailableParkingSpot,
    customerToSensorData: selectCustomerToSensor,
    releaseSensorData: selectReleaseSensor
})
const mapDispatchToProps = dispatch => {
   return {
     getSensorData: () => dispatch(getSensorData()),
     availableParkingSpots: (address) => dispatch(availableParkingSpots(address)),
     releaseSensorAssignment: (sensor_id) => dispatch(releaseSensorAssignment(sensor_id)),
     assignToSensor: (customer_id, sensor_id) => dispatch(assignCustomerToSensor(customer_id, sensor_id))
   }
}
export default connect(
  structuredSelector,
  mapDispatchToProps
)(Client)
