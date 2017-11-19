import React, { PureComponent }           from 'react';
import uuidv4 							  from 'uuid/v4';
import { connect }                        from 'react-redux'; 
import { assignCustomerToSensor, releaseSensorAssignment } 	from '../actions/Actions'
import { createStructuredSelector }       from 'reselect';
import { selectCustomerToSensor, selectReleaseSensor }  from '../selectors';

class AssignModel extends PureComponent {
	
	componentDidMount(){
    if (this.props.customerID === undefined) {
      this.props.releaseSensorAssignment(this.props.sensorID);
    } else {
		  this.props.assignToSensor(this.props.customerID, this.props.sensorID);
    }
  }
  
	
	render() {
    var assignment;
    if (this.props.customerID === undefined) {
      assignment = this.props.releaseSensorData.map((data) => {
        return <div key={ uuidv4 }> { JSON.stringify(data) } </div>
      })
    } else {
      assignment = this.props.customerToSensorData.map((data)=>{
        return <div key={ uuidv4 }> { JSON.stringify(data) } </div>
      })
    }
		return (
			<div>
				{ assignment }
			</div>
		);
  	}
}

const structuredSelector = createStructuredSelector({
    customerToSensorData: selectCustomerToSensor,
    releaseSensorData: selectReleaseSensor
})
const mapDispatchToProps = dispatch => {
   return {
      releaseSensorAssignment: (sensor_id) => dispatch(releaseSensorAssignment(sensor_id)),
      assignToSensor: (customer_id, sensor_id) => dispatch(assignCustomerToSensor(customer_id, sensor_id))
   }       
}

export default connect(
  structuredSelector,
  mapDispatchToProps
)(AssignModel)
