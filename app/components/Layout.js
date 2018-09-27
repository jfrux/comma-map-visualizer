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
class Layout extends React.PureComponent {
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
    const { children } = this.props;
    return (
      
        {this.props.children}
  );
}
};

export default Layout;
