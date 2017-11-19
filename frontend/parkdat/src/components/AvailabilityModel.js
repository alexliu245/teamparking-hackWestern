import React, { PureComponent }           from 'react';
import uuidv4 							  from 'uuid/v4';
import { connect }                        from 'react-redux'; 
import { availableParkingSpots } 	from '../actions/Actions'
import { createStructuredSelector }       from 'reselect';
import { selectAvailableParkingSpot }  from '../selectors';

class AvailabilityModel extends PureComponent {
	
	componentDidMount(){
    this.props.availableParkingSpots(this.props.lat, this.props.long);
  }
	
	render() {
    const spots = this.props.availableParkingSpotData.map((data) => {
      return <div key={ uuidv4 }> { JSON.stringify(data) } </div>
    })
		return (
  			<div>
  				{ spots }
  			</div>
  		);
  }
}

const structuredSelector = createStructuredSelector({
    availableParkingSpotData: selectAvailableParkingSpot
})
const mapDispatchToProps = dispatch => {
  return {
    availableParkingSpots: (lat, long) => dispatch(availableParkingSpots(lat, long))
  }       
}

export default connect(
  structuredSelector,
  mapDispatchToProps
)(AvailabilityModel)
