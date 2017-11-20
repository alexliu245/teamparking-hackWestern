import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl, FormGroup, InputGroup, Button, Grid, Row, Col} from 'react-bootstrap';
import {Navigation} from '../components/Navbar.js';
import {AddressData} from '../components/AddressData.js';
// import {Map} from '../components/Gmap.js';
import '../index.js';
import '../App.css';

//FAKE DATA FOR TESTING /////
const statusArray= ['Available', 'Unavailable', 'Unregistered Tenant'];
const parkingSpots =[];
function getParkingSpots(num) {
  // const arrayLength = array.length === 0 ? null : array.length;
  // loop to populate the array that will be pushed to the array "agents"
  // "agents" can be used to display data anywhere...
  for (let i = 0; i < num; i++) {
    const id =+i;
    parkingSpots.push({
      location: "12" + id +" Fake St.",
      coordinates: " lat: " + id*-20 + ", lng: " + id*3 ,
      price: "$" + id*5,
      status: statusArray[Math.floor(Math.random()*statusArray.length)]
    });
  }
}

getParkingSpots(10);

class Owner extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        location: '',
        coordinates: '',
        price: '',
				totalEarned: '',
				status:''
      };
      // this.getLocationsService = new getLocationsService();
      this.handleAddressChange = this.handleAddressChange.bind(this);
    }
    handleAddressChange(event) {
      this.setState({location: event.target.value});
    }
    handleSubmit(event) {
      event.preventDefault();
      alert( "CREATE THIS ADDRESS! ");
      // this.setState ({foundAddressArray: ''})
      // IDK WHAT THE LOCATION SERVICE IS CALLED!
      // this.getLocationsService.sendData(
      //   this.state.address
      // );
      // setTimeout(function() { window.location.reload(); }, 1000);
    }
	render() {
		return (
			<div>
				<Navigation></Navigation>
				<div className="container">
					<h2> Welcome Owner <small> & Hello World</small></h2>
					<p> We're happy to see you! All of your parking setups are listed below. Feel free to add a new one! :) </p>
              <form>
                <FormGroup>
                    <FormControl
                      type="text"
                      value={this.state.location}
                      onChange={this.handleAddressChange}
                    />
                </FormGroup>
								<Button type="submit" value="Submit">Search</Button>
              </form>

								<h3>Your Parking Spots</h3>

        </div>
			</div>
		);
	}
}

ReactDOM.render(
	<Owner />,
	document.getElementById('root')
);

export default Owner;
