import React, { Component } from 'react';
import Map from './Map';
import {
  Container,
  Collapse,
  Col,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Row,
  ListGroup,
  ListGroupItem,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem 
} from 'reactstrap';
import Logo from '../assets/images/comma.svg';
import styles from './Styles.scss';
class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/" className={styles.navbar_brand}><Logo height={25} /> speed map</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              
            </Nav>
          </Collapse>
        </Navbar>
        <Container fluid={true}>
          <Row>
            <Col sm="3">
              <ListGroup flush={true}>
                <ListGroupItem>Route 1</ListGroupItem>
                <ListGroupItem>Route 2</ListGroupItem>
                <ListGroupItem>Route 3</ListGroupItem>
                <ListGroupItem>Route 4</ListGroupItem>
              </ListGroup>
            </Col>
            <Col sm="9">
              <Map />
            </Col>
          </Row>
        </Container>
    </div>
  );
}
};

export default Home;
