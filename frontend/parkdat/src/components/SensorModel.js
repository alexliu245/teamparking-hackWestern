import React, { PureComponent }           from 'react';
import uuidv4 							  from 'uuid/v4';
import { connect }                        from 'react-redux'; 
import { getSensorData, getSensorDataWithID, postSensor } 	from '../actions/Actions'
import { createStructuredSelector }       from 'reselect';
import { selectSensorData, selectSensorPostData }  from '../selectors';

class SensorModel extends PureComponent {
	
	componentDidMount(){
    if (this.props.ownerID === undefined) {
      this.props.getSensorData(this.props.sensor_id);
    } else {
      this.props.postSensorData(this.props.ownerID, this.props.address,
                                this.props.hourlyRate, this.props.startBound,
                                this.props.endBound);
    }
	}
	
	render() {
    var sensor;
    if (this.props.ownerID === undefined) {
      sensor = this.props.sensorData.map((data)=>{
           return <div key={ uuidv4 }> { JSON.stringify(data) } </div>
        })
    } else {
      sensor = this.props.sensorPostData.map((data)=>{
           return <div key={ uuidv4 }> { JSON.stringify(data) } </div>
        })
    }
		return (
			<div>
				{ sensor }
			</div>
		);
  	}
}

const structuredSelector = createStructuredSelector({
    sensorData: selectSensorData,
    sensorPostData: selectSensorPostData
})
const mapDispatchToProps = dispatch => {
   return {
      getSensorData: (sensor_id) => {
     	  if (sensor_id !== undefined) {
     		 dispatch(getSensorDataWithID(sensor_id));
     	  } else {
     		 dispatch(getSensorData());	
     	  }
      },
      postSensor: (owner_id, address, hourly_rate, start_bound, end_bound) =>
        dispatch(postSensor(owner_id, address, hourly_rate, start_bound, end_bound))
   }       
}

export default connect(
  structuredSelector,
  mapDispatchToProps
)(SensorModel)
