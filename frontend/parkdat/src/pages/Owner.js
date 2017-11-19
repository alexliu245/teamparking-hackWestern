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
        endTime:'',
        owner:''
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
    componentDidMount(){
      this.props.getSensorData();
      console.log ("COMPONENT DID MOUNT");
      console.log (this.props.sensorData);
      this.setState({
        sensorData: this.props.sensorData
      });
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
    }
	render() {
    console.log("OWNER PAGE -------")
    console.log(this.props.sensorData);
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
          {this.name}
          <Button
          bsStyle="primary"
          onClick={this.open}
          >
          Add Sensor
        </Button>

        {this.props.sensorData.map( ( res ) => {
          return <div key={res.address}>

                <div> <h4><u>{res.address} </u></h4></div>
                <div> <b> Coordinates : </b> {res.location.coordinates}</div>
                <div> <b> Hourly Rental: </b>{res.hourly_rental} </div>
                <div> <b> Start Time: </b> {res.start_time} </div>
                <div> <b> End Time: </b> {res.start_time} </div>
                <div> <b> Status: </b> {res.session} </div>

          </div>
          })
        }
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

                <SensorsTable sensorData="this.state.sensorData"/>
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
