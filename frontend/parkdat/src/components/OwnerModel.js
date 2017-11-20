import React, { PureComponent }           from 'react';
import uuidv4                               from 'uuid/v4';
import { connect }                        from 'react-redux'; 
import { getOwnerData, 
		getOwnerDataWithID, 
		postOwnerData } 
from '../actions/Actions'
import { createStructuredSelector }       from 'reselect';
import { selectOwnerData, selectOwnerPostData } from '../selectors';

class OwnerModel extends PureComponent {
    
    componentDidMount(){
    	if (this.props.name === undefined) {
    		this.props.getOwnerData(this.props.owner_id);
    	} else {
    		this.props.postOwnerData(this.props.name);
    	}
    }
    
    render() {
    	var owner;
    	if (this.props.name === undefined) {
	        owner = this.props.ownerData.map((data)=>{
	           	return <div key={ uuidv4 }> { data.name } </div>
        	})
    	} else {
    		owner = this.props.ownerPostData.map((data)=>{
	           	return <div key={ uuidv4 }> { data.name } </div>
        	})
    	}
        return (
            <div>
                { owner }
           	</div>
		);
	}
}
const structuredSelector = createStructuredSelector({
    ownerData: selectOwnerData,
    ownerPostData: selectOwnerPostData
})
const mapDispatchToProps = dispatch => {
	return {
		getOwnerData: (owner_id) => {
			if (owner_id !== undefined) {
				dispatch(getOwnerDataWithID(owner_id));
			} else {
				dispatch(getOwnerData());
			}
		},
		postOwnerData: (name) => dispatch(postOwnerData(name))
	}       
}
export default connect(
	structuredSelector,
	mapDispatchToProps
)(OwnerModel)
