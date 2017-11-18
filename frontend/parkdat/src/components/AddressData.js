import React from 'react';
import { Button } from 'react-bootstrap';

export class AddressData extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      location: '',
      coordinates: '',
      price: '',
      status: '',
    }
  };
  handleClick(e) {
    console.log (this.props.location);
    this.setState({
      location: this.props.location,
      coordinates: this.props.coordinates,
      price: this.props.price,
      status: this.props.status
    });
    this.props.callbackFromParent(this.props.location, this.props.coordinates, this.props.price, this.props.status);
  }
  render() {
    return (
      <div>
        <br />
        <div> <b> Address: </b> {this.props.location} </div>
        <div> <b> Coordinates: </b> {this.props.coordinates} </div>
        <div> <b> Price: </b> {this.props.price} </div>
        <div> <b> Status: </b> {this.props.status} </div>

        <Button bsStyle="link" bsSize="small" onClick={this.handleClick} >
          Select Parking Spot
        </Button>

    </div>
          );
        }
      }
