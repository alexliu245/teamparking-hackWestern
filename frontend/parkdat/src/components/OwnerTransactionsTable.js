import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { getSensorData } from '../actions/Actions';
import { createStructuredSelector } from 'reselect';
import { selectSensorData } from '../selectors';


let order = 'desc';
const sensor_transaction_data = [];

export default class SensorTransactionTable extends React.Component {
  constructor(props){
    super(props);
    this.state = { value: '', };
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
              data={ sensor_transaction_data }
              options={ options }
              search={ true }
              multiColumnSearch={ true }
              exportCSV={ true }
              ref='SensorsTransactionTable'
              pagination>

              <TableHeaderColumn dataField='id'
                isKey={ true }
                dataSort={ true }
                editable={ false }>
                Transaction ID
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='address'
                dataSort={ true }
                editable={ true }>
                Machine ID
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='location.coordinates'
                dataSort={ true }
                editable={ false }>
                Location
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='cost'
                dataSort={ true }
                editable={ true }>
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
                dataField='earned'
                dataSort={ true }
                editable={ false }>
                $ Earned
              </TableHeaderColumn>

            </BootstrapTable>
          );
        }
      }
