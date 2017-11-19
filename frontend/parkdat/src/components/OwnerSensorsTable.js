import React from 'react';
import { BootstrapTable, TableHeaderColumn, InsertModalHeader, InsertModalFooter } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { getSensorData } from '../actions/Actions';
import { createStructuredSelector } from 'reselect';
import { selectSensorData } from '../selectors';


let order = 'desc';
const sensor_data = [];

function priceFormatter(cell, row) {
  return `<i class='glyphicon glyphicon-usd'></i> ${cell}.00`;
}

export function timeFormatter(cell, row) {
  return `${cell}:00`;
}



class SensorsTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      sensorData:''
    };
    this.props.getSensorData();
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
  componentDidMount(){
    this.props.getSensorData();
    console.log(this.props.sensorData.address);
    this.setState({
      sensorData: this.props.sensorData
    });
  }

        render() {
          // console.log (this.state.sensorData);
          const options = {
            clearSearch: true,
            sortIndicator: false,  // disable sort indicator
          };
          // this.props.getSensorData();
          return (
            <div>
              {/* {this.state.sensorData} */}
            <BootstrapTable
              data={ this.props.sensorData }
              options={ options }
              search={ true }
              multiColumnSearch={ true }
              exportCSV={ true }
              ref='SensorsTable'
              pagination>

              <TableHeaderColumn dataField='id'
                isKey={ true }
                dataSort={ true }
                editable={ false }
                hidden>
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
                editable={ false }
                hidden>
                Coordinates
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='hourly_rental'
                dataSort={ true }
                editable={ true }
                dataFormat={ priceFormatter}
                >
                Hourly Rental Price
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='start_bound'
                dataSort={ true }
                editable={false}
                dataFormat={ timeFormatter }
                >
                Start Time
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='end_bound'
                dataSort={ true }
                editable={ false }
                dataFormat={ timeFormatter }
                >
                End Time
              </TableHeaderColumn>

              <TableHeaderColumn
                dataField='session'
                dataSort={ true }
                editable={ false }>
                Status
              </TableHeaderColumn>

            </BootstrapTable>
          </div>
          );
        }
      }

      const structuredSelector = createStructuredSelector({
          sensorData: selectSensorData,
      })
      const mapDispatchToProps = dispatch => {
         return {
           getSensorData: () => dispatch(getSensorData())
         }
      }
      export default connect(
        structuredSelector,
        mapDispatchToProps
      )(SensorsTable)
