import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl, FormGroup, InputGroup, Button, Grid, Row, Col} from 'react-bootstrap';
import {Navigation} from '../components/Navbar.js';
import {AddressData} from '../components/AddressData.js';
import { connect } from 'react-redux';
import { getSensorData } from '../actions/Actions';
import { createStructuredSelector } from 'reselect';
import { selectSensorData } from '../selectors';
import Gmap from '../components/Gmap.js';
import '../index.js';
import '../App.css';

var isCheckedIn = "false";
var showCheckInButton = "displayNone";

class Client extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        searchedAddress: '',
        foundAddressArray: '',
        selectedLocation: '',
        selectedCoordinates: '',
        currentTime: '',
        isCheckedIn: "false",
        showCheckInButton: "displayNone",
        showCheckOutButton: "displayNone",
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
      alert ("Checked out of parking spot at " + this.state.selectedLocation + " at " + this.state.currentTime )
    }
    myCallback(location, coordinates, price, status){
      console.log ("Client has the data: " + location + "___" + coordinates + "___" + price + "___" + status );
      this.setState({
        selectedLocation: location,
        selectedCoordinates: coordinates,
        showCheckInButton: ''
      });
      // showCheckInButton = 'displayNone';
    }
    handleChange(event) {
      this.setState({searchedAddress: event.target.value});
    }
    handleSubmit(event) {
      event.preventDefault();
      this.props.getSensorData();
    }
	render() {
    const style = {
    height: '50vh'
  }
    console.log(this.props.sensorData);
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
				      <Col xs={12} md={4} lg={4}>
								<h3>Parking Spots Near You</h3>
                <div className= "overflow">
                {this.props.sensorData.map( ( res ) => {
                  return <div key={res.address}>
                    <AddressData
                      location={res.address}
                      coordinates = {res.location.coordinates}
                      owner = {res.owner}
                      hourly_rental = {res.hourly_rental}
                      start_time = {res.start_time}
                      callbackFromParent={this.myCallback} />
                  </div>
                  })
                } </div>
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
})
const mapDispatchToProps = dispatch => {
   return {
     getSensorData: () => dispatch(getSensorData())
   }
}
export default connect(
  structuredSelector,
  mapDispatchToProps
)(Client)
