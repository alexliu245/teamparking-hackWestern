import React, { PureComponent }           from 'react';
import uuidv4 							  from 'uuid/v4';
import { connect }                        from 'react-redux'; 
import { getOwnerData } 				  from '../actions/Actions'
import { createStructuredSelector }       from 'reselect';
import { selectOwnerData }               from '../selectors';

class OwnerModel extends PureComponent {
	
	componentDidMount(){
		this.props.getOwnerData();
	}
	
	render() {
		const owner = this.props.ownerData.map((data)=>{
           return <div key={ uuidv4 }> { data.name } </div>
       	})
		return (
			<div>
				{ owner }
			</div>
		);
  	}
}

const structuredSelector = createStructuredSelector({
    ownerData: selectOwnerData,
})
const mapDispatchToProps = dispatch => {
   return {
     getOwnerData: () => dispatch(getOwnerData())
   }       
}
export default connect(
  structuredSelector,
  mapDispatchToProps
)(OwnerModel)
