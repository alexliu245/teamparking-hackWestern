import React from 'react';
import { Button } from 'react-bootstrap';

export class AddressData extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      location: '',
      coordinates: '',
      owner:'',
      hourly_rental: '',
      status: ''
    }
  };
  handleClick(e) {
    console.log (this.props.location);
    this.setState({
      location: this.props.location,
      coordinates: this.props.coordinates,
      owner: this.props.owner,
      hourly_rental: this.props.hourly_rental,
      status: this.props.status
    });
    this.props.callbackFromParent(this.props.location, this.props.coordinates, this.props.owner, this.props.hourly_rental, this.props.status);
  }
  render() {
    // const style = {
    //   padding: "50px 0 0 0" // why isnt this working tho
    // }
    return (
      <div>
        <br />
        <div> <b> Address: </b> {this.props.location} </div>
        {/* <div> <b> Coordinates: </b> lat: {this.props.coordinates[1]} lng: {this.props.coordinates[2]} </div> */}
        {/* <div> <b> Hourly price: </b> $ {this.props.hourly_rental} </div> */}
        {/* <div> <b> Status: </b> {this.props.status} </div> */}

        <Button bsStyle="link" bsSize="small" onClick={this.handleClick} >
          Select Parking Spot
        </Button>

    </div>
          );
        }
      }
