import React from 'react';
import { locations } from './ImportLocations.js';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl, InputGroup, HelpBlock } from 'react-bootstrap';
import { AgentData } from './AgentData.js';


var showAgents = "displayNone";

export class SearchLocations extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.myCallback = this.myCallback.bind(this);
    this.state = { searchString: '' }
    };
  handleChange = (e) => {
    this.setState({ searchString:e.target.value });
    // showAgents = "";
  }
  myCallback(name, coordinates, price, status){
    console.log ("SearchLocation Callback triggered: " + name + coordinates + price + status );
    this.props.callbackFromParent(name, id, balance, status);
  }
  render() {
    var libraries = this.props.items,
    searchString = this.state.searchString.trim().toLowerCase();
    searchString = this.state.searchString;
    if (searchString.length > 0) {
      showAgents = "";
      libraries = libraries.filter(function(i) {
        // return i.agentName.toLowerCase().match( searchString ); // use this to search by Agent Name
        return i.location.toLowerCase().match( searchString ); // use this to search by Agent Phone Number
      });
    }
    else{
      showAgents = "displayNone";
    }
    return (
      <div >
        <form>
          <FormGroup controlId="SearchAgent"  >
            <ControlLabel>Search by Location </ControlLabel>
            <FormControl
              className = "searchForm"
              type="text"
              value={this.state.searchString}
              placeholder="Enter Location"
              onChange={this.handleChange} />
            </FormGroup>
          </form>
          <div className= "overflow">
            <div className={showAgents} >
              {/* lists each agent + relevant data + trigger from <AgentData> initiates a callback to here!  */}
              {libraries.map((r , i) => <div key = {r.coordinates}><LocationData
                locationName={r.locationName}
                coordinates = {r.agentId}
                price = {r.price}
                status = { r.status}
                callbackFromParent={this.myCallback} />
              </div>
            )}
            </div>
          </div>
      </div>
    );
  }
}
