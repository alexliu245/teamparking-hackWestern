import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { getTransactionData } from '../actions/Actions';
import { createStructuredSelector } from 'reselect';
import { selectTransactionData } from '../selectors';


let order = 'desc';
const sensor_transaction_data = [];

function reduceDecimals(num){
  num = num.toFixed(2)
  return `<i class='glyphicon glyphicon-usd'></i> ${num}`;
}
function priceFormatter(cell, row) {
  return `<i class='glyphicon glyphicon-usd'></i> ${cell}.00`;
}

class SensorTransactionTable extends React.Component {
  constructor(props){
    super(props);
    this.state = { value: '', };
    this.props.getTransactionData();
  }
  // ascending or descending sort on columns
  handleBtnClick = () => {
    if (order === 'desc') {
      this.refs.table.handleSort('asc', 'name');
      order = 'asc';
    } else {
      this.refs.table.handleSort('desc', 'name');
      order = 'desc';
    }
  }
        render() {
          const options = {
            clearSearch: true,
            sortIndicator: false,  // disable sort indicator
          };
          // this.props.getSensorData();
          return (
            <BootstrapTable
              data={ this.props.transactionData }
              options={ options }
              search={ true }
              multiColumnSearch={ true }
              exportCSV={ true }
              ref='SensorsTransactionTable'
              pagination>

              <TableHeaderColumn
                isKey={ true }
                dataField='address'
                dataSort={ true }
                editable={ false }>
                Location
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='hourly_rental'
                dataSort={ true }
                editable={ true }
                dataFormat={ priceFormatter }>
                Price Per Minute
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='start_time'
                dataSort={ true }
                editable={false}>
                Start Time
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='end_time'
                dataSort={ true }
                editable={ false }>
                End Time
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='value'
                dataSort={ true }
                editable={ false }
                dataFormat={ reduceDecimals }
                >
                $ Earned
              </TableHeaderColumn>

            </BootstrapTable>
          );
        }
      }
      const structuredSelector = createStructuredSelector({
          transactionData: selectTransactionData,
      })
      const mapDispatchToProps = dispatch => {
         return {
           getTransactionData: () => dispatch(getTransactionData())
         }
      }
      export default connect(
        structuredSelector,
        mapDispatchToProps
      )(SensorTransactionTable)
