import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl, FormGroup, InputGroup, Button, Grid, Row, Col} from 'react-bootstrap';
import {Navigation} from '../components/Navbar.js';
import {AddressData} from '../components/AddressData.js';
// import {Map} from '../components/Gmap.js';
import '../index.js';
import '../App.css';

//FAKE DATA FOR TESTING /////
const statusArray= ['Available', 'Unavailable'];
const foundAddressArray =[];
function foundAddresses(num) {
  // const arrayLength = array.length === 0 ? null : array.length;
  // loop to populate the array that will be pushed to the array "agents"
  // "agents" can be used to display data anywhere...
  for (let i = 0; i < num; i++) {
    const id =+i;
    foundAddressArray.push({
      location: "12" + id +" Fake St.",
      coordinates: " lat: " + id*-20 + ", lng: " + id*3 ,
      price: "$" + id*5,
      status: statusArray[Math.floor(Math.random()*statusArray.length)]
    });
  }
}

foundAddresses(10);

class Client extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        searchedAddress: '',
        foundAddressArray: '',
        selectedLocation: ''
      };
      // this.getLocationsService = new getLocationsService();
      this.handleChange = this.handleChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.myCallback = this.myCallback.bind(this);
    }
    myCallback(location, coordinates, price, status){
      console.log ("Client has the data: " + location + coordinates + price + status );
      this.setState({selectedLocation: location});
      // this.props.callbackFromParent(name, id, balance, status);
    }
    handleChange(event) {
      this.setState({searchedAddress: event.target.value});
    }
    handleSubmit(event) {
      event.preventDefault();
      alert( "NOW SEARCH FOR THIS ADDRESS - RETURN AN ARRAY OF ADDRESSES PLZ ");
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
					<Grid>
				    <Row>
				      <Col xs={8} lg={8}>
                <h2> Welcome Client <small> & Hello World</small></h2>
      					<p> We're happy to see you! Simply enter your location below, and we'll find you a parking spot :) </p>

                <form onSubmit={this.handleSubmit}>
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
                  <p> Map Goes Here! {this.state.selectedLocation}</p>
								{/* <Map /> */}
							</Col>
				      <Col xs={4} lg={4}>
								<h3>Parking Spots Near You</h3>
                <div className= "overflow">
                {foundAddressArray.map( ( {location, coordinates, price, status} ) => {
                  return <div key={location}>
                    <AddressData
                      location={location}
                      coordinates = {coordinates}
                      price = {price}
                      status = {status}
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

ReactDOM.render(
	<Client />,
	document.getElementById('root')
);

export default Client;
