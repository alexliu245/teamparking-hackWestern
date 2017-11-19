import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export class Navigation extends React.Component {
	render() {
		return (
    <Navbar
			inverse
			// collapseOnSelect
			>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Park DAT</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem
					eventKey={1}
					href="/client">
					Client
				</NavItem>

        <NavItem
					eventKey={2}
					href="/owner">
					Manage Sensors
				</NavItem>

				<NavItem
					eventKey={3}
					href="/owner-transactions">
					Transactions
				</NavItem>

      </Nav>
      <Nav pullRight>
        <NavItem eventKey={2} href="/login">Logout</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

    );
  }
}
