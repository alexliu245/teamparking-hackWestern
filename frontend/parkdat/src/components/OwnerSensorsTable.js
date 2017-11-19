import React from 'react';
import { BootstrapTable, TableHeaderColumn, InsertModalHeader, InsertModalFooter } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { getSensorData } from '../actions/Actions';
import { createStructuredSelector } from 'reselect';
import { selectSensorData } from '../selectors';


let order = 'desc';
const sensor_data = [];

export default class SensorsTable extends React.Component {
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
              data={ sensor_data }
              options={ options }
              search={ true }
              multiColumnSearch={ true }
              exportCSV={ true }
              ref='SensorsTable'
              pagination>

              <TableHeaderColumn dataField='id'
                isKey={ true }
                dataSort={ true }
                editable={ false }>
                Machine ID
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='address'
                dataSort={ true }
                editable={ true }>
                Address
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='location.coordinates'
                dataSort={ true }
                editable={ false }>
                Coordinates
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

              <TableHeaderColumn
                dataField='status'
                dataSort={ true }
                editable={ false }>
                Status
              </TableHeaderColumn>

            </BootstrapTable>
          );
        }
      }
