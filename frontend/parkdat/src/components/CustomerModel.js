import React, { PureComponent }           from 'react';
import uuidv4 							  from 'uuid/v4';
import { connect }                        from 'react-redux'; 
import { getCustomerDataWithID, 
		postCustomerData } 				  
from '../actions/Actions'
import { createStructuredSelector }       from 'reselect';
import { selectCustomerData, selectCustomerPostData }             
from '../selectors';

class CustomerModel extends PureComponent {
	
	componentDidMount(){
		if (this.props.name === undefined) {
			this.props.getCustomerData(this.props.customer_id);
		} else {
			this.props.postCustomerData(this.props.name);
		}
	}
	
	render() {
		var customerResponse;
		if (this.props.name === undefined) {
			customerResponse = this.props.customerData.map((data)=>{
				return <div key={ uuidv4 }> {JSON.stringify(data) } </div>
			})
		} else {
			customerResponse = this.props.customerPostData.map((data)=>{
	        	return <div key={ uuidv4 }> { JSON.stringify(data) } </div>
	       	})
		}
		return (
			<div>
				{ customerResponse }
			</div>
		);		
  	}
}

const structuredSelector = createStructuredSelector({
	customerData: selectCustomerData,
    customerPostData: selectCustomerPostData
})
const mapDispatchToProps = dispatch => {
   return {
   	 getCustomerData: (customer_id) => dispatch(getCustomerDataWithID(customer_id)),
     postCustomerData: (name) => dispatch(postCustomerData(name))
   }       
}
export default connect(
  structuredSelector,
  mapDispatchToProps
)(CustomerModel)
