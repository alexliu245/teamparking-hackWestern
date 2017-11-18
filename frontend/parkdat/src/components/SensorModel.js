import React, { PureComponent }           from 'react';
import uuidv4 							  from 'uuid/v4';
import { connect }                        from 'react-redux'; 
import { getSensorData, getSensorDataWithID } 	from '../actions/Actions'
import { createStructuredSelector }       from 'reselect';
import { selectSensorData }  from '../selectors';

class SensorModel extends PureComponent {
	
	componentDidMount(){
		this.props.getSensorData(this.props.sensor_id);
	}
	
	render() {
		const sensor = this.props.sensorData.map((data)=>{
           return <div key={ uuidv4 }> { JSON.stringify(data) } </div>
       	})
		return (
			<div>
				{ sensor }
			</div>
		);
  	}
}

const structuredSelector = createStructuredSelector({
    sensorData: selectSensorData,
})
const mapDispatchToProps = dispatch => {
   return {
     getSensorData: (sensor_id) => {
     	if (sensor_id !== undefined) {
     		dispatch(getSensorDataWithID(sensor_id));
     	} else {
     		dispatch(getSensorData());	
     	}
     }
   }       
}

export default connect(
  structuredSelector,
  mapDispatchToProps
)(SensorModel)
