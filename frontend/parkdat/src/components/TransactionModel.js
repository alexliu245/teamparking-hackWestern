import React, { PureComponent }           from 'react';
import uuidv4 							  from 'uuid/v4';
import { connect }                        from 'react-redux'; 
import { getTransactionData, getTransactionDataWithID } 	from '../actions/Actions'
import { createStructuredSelector }       from 'reselect';
import { selectTransactionData }  from '../selectors';

class TransactionModel extends PureComponent {
	
	componentDidMount(){
      this.props.getTransactionData(this.props.ownerID);
	}
	
	render() {
    const transactions = this.props.transactionData.map((data)=>{
      return <div key={ data._id }> { JSON.stringify(data) } </div>
    })
		return (
			<div>
				{ transactions }
			</div>
		);
  	}
}

const structuredSelector = createStructuredSelector({
    transactionData: selectTransactionData
})
const mapDispatchToProps = dispatch => {
   return {
      getTransactionData: (owner_id) => {
     	  if (owner_id === undefined) {
          dispatch(getTransactionData()); 
     	  } else {
          dispatch(getTransactionDataWithID(owner_id));
     	  }
      }
   }       
}

export default connect(
  structuredSelector,
  mapDispatchToProps
)(TransactionModel)
