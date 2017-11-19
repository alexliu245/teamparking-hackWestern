import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl, FormGroup, ControlLabel, Button, Form, Modal} from 'react-bootstrap';
import {Navigation} from '../components/Navbar.js';
import {AddressData} from '../components/AddressData.js';
import { connect } from 'react-redux';
import { getSensorData } from '../actions/Actions';
import { createStructuredSelector } from 'reselect';
import { selectSensorData } from '../selectors';
import SensorsTable from '../components/OwnerSensorsTable.js';
import '../index.js';
import '../App.css';
import '../components/react-bootstrap-table-all.min.css';


class Owner extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value:'',
        showModal: false,
        address: '',
        costPerHour:'',
        startTime:'',
        endTime:''
      };
      // this.getLocationsService = new getLocationsService();
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.handleCostChange = this.handleCostChange.bind(this);
      this.handleStartTChange = this.handleStartTChange.bind(this);
      this.handleEndTChange = this.handleEndTChange.bind(this);
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    close() {
      this.setState({ showModal: false });
    }
    open() {
    this.setState({ showModal: true });
    }
    handleAddressChange(event) {
      this.setState({address: event.target.value});
    }
    handleCostChange(event) {
      this.setState({costPerHour: event.target.value});
    }
    handleStartTChange(event) {
      this.setState({startTime: event.target.value});
    }
    handleEndTChange(event) {
      this.setState({endTime: event.target.value});
    }
    handleSubmit(event) {
      event.preventDefault();
      alert('SUBMITTED');
      this.close();
      // this.props.getSensorData(); //sensorData
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
          <h2> Welcome Owner <small> & Hello World</small></h2>
          <p> Nice to have you back! Use the button below to add a new sensor, or check out your current sensors in the table :) </p>

          <Button
          bsStyle="primary"
          onClick={this.open}
          >
          Add Sensor
        </Button>


          <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Sensor Location</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div style={style}>
                      <Form
                        horizontal
                        onSubmit={this.handleSubmit}>
                        <FormGroup>
                          <ControlLabel>Address</ControlLabel>
                          <FormControl
                            type="text"
                            value={this.state.address}
                            onChange={this.handleAddressChange}
                          />
                        </FormGroup>

                        <FormGroup>
                          <ControlLabel>Cost Per Hour</ControlLabel>
                          <FormControl
                            type="number"
                            value={this.state.costPerHour}
                            onChange={this.handleCostChange}
                          />
                        </FormGroup>

                        <FormGroup>
                          <ControlLabel>Start Time</ControlLabel>
                          <FormControl
                            type="text"
                            value={this.state.startTime}
                            onChange={this.handleStartTChange}
                          />
                        </FormGroup>

                        <FormGroup>
                          <ControlLabel>End Time</ControlLabel>
                          <FormControl
                            type="text"
                            value={this.state.endTime}
                            onChange={this.handleEndTChange}
                          />
                        </FormGroup>

                        <Button type="submit" value="Submit" bsStyle="primary" pullRight>Add Sensor</Button>
                      </Form>
                    </div>
                </Modal.Body>
              </Modal>


								<h3>Your Sensors</h3>

                <SensorsTable />
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
)(Owner)




// import React from 'react';
// import ReactDOM from 'react-dom';
// import {FormControl, FormGroup, Button, Grid, Row, Col} from 'react-bootstrap';
// import { Navigation } from '../components/Navbar.js';
// import { AddressData } from '../components/AddressData.js';
// import { connect } from 'react-redux';
// import { getSensorData } from '../actions/Actions';
// import { createStructuredSelector } from 'reselect';
// import { selectSensorData } from '../selectors';
//
// // import {Map} from '../components/Gmap.js';
// import '../index.js';
// import '../App.css';
//
// class OwnerSensors extends React.Component {
//   constructor(props) {
//     super(props);
    // this.state = {
    //   value:''
    // };
//     // this.getLocationsService = new getLocationsService();
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.myCallback = this.myCallback.bind(this);
//   }
//   handleChange(event) {
//     this.setState({searchedAddress: event.target.value});
//   }
  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.props.getSensorData(); //sensorData
  // }
//   render() {
//     this.props.getSensorData();
//     return (
      // <div>
      //   <Navigation></Navigation>
        // <div className="container">
        //   <h2> Welcome Client <small> & Hello World</small></h2>
        //   <p> We're happy to see you! Simply enter your location below, and we'll find you a parking spot :) </p>
      //
      //     <form onSubmit={this.handleSubmit}>
      //
            // <FormGroup>
            //   <ControlLabel>Address</ControlLabel>
            //   <FormControl
            //     type="text"
            //     value={this.state.address}
            //     onChange={this.handleChange}
            //   />
            // </FormGroup>
            //
            // <FormGroup>
            //   <ControlLabel>Cost Per Hour</ControlLabel>
            //   <FormControl
            //     type="number"
            //     value={this.state.costPerHour}
            //     onChange={this.handleChange}
            //   />
            // </FormGroup>
            //
            // <FormGroup>
            //   <ControlLabel>Start Time</ControlLabel>
            //   <FormControl
            //     type="text"
            //     value={this.state.startTime}
            //     onChange={this.handleChange}
            //   />
            // </FormGroup>
            //
            // <FormGroup>
            //   <ControlLabel>End Time</ControlLabel>
            //   <FormControl
            //     type="text"
            //     value={this.state.endTime}
            //     onChange={this.handleChange}
            //   />
            // </FormGroup>
            // <Button type="submit" value="Submit">Search</Button>
      //     </form>
      //
      //   </div>
//
//       );
//   	}
//   }
//
// const structuredSelector = createStructuredSelector({
//     sensorData: selectSensorData,
// })
// const mapDispatchToProps = dispatch => {
//    return {
//      getSensorData: () => dispatch(getSensorData())
//    }
// }
// export default connect(
//   structuredSelector,
//   mapDispatchToProps
// )(Client)
