import React, { Component } from 'react';
import Map from './Map';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import LoadingOverlay from './LoadingOverlay';
import { connect } from 'react-redux';
import MapDebugger from './MapDebugger';
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
import PropTypes from 'prop-types';

const propTypes = {
  prevTripId: PropTypes.number,
  currentTripId: PropTypes.number,
  currentPoints: PropTypes.object,
  tripLine: PropTypes.object,
  pointsLine: PropTypes.object,
  fetching: PropTypes.bool,
  list: PropTypes.object,
  fetchPoints: PropTypes.func,
  fetchList: PropTypes.func
};

class Viewer extends Component {
  componentDidMount() {
    if (this.props.fetchList) {
      this.props.fetchList();
    }
  }
  render() {
    const { list, fetching, fetchingList, currentTripId } = this.props;
    let listKeys = Object.keys(list).sort((a,b) => { return parseInt(a)-parseInt(b)});
    if (fetchingList) {
      return <LoadingOverlay />;
    }
    const tripListItems = listKeys.map((itemKey) => {
      let item = list[itemKey];
      return (<ListGroupItem 
        key={item.id}
        onClick={(ev) => this.props.selectTrip(item.id)} 
        className={styles.trip_button} 
        tag="button"
        active={this.props.currentTripId === item.id}>
          <span className="trip-item-img">
            {item.id}
          </span>
          <span className="trip-item-name">{item.name}</span>
          <i className="fa fa-chevron-right"></i>
      </ListGroupItem>);
    });
    return (
      <div>
        <Navbar color="dark" dark expand="xs">
          <NavbarBrand href="/" className={styles.navbar_brand}>
            <span><Logo height={25} /> speedmap</span>
          </NavbarBrand>
        </Navbar>
        <Container fluid={true}>
          <Row>
            <Col sm="3" className={styles.viewer_list_container}>
              <div className="add-input-wrap">
              
              </div>
              <ListGroup flush={true}>
                {tripListItems}
              </ListGroup>
            </Col>
            <Col sm="9" className={styles.viewer_map_container}>
              {!currentTripId && 
                <div className="map-help-overlay">
                  <i className="fa fa-arrow-left map-help-icon"></i>
                  <div className="map-help-text">select a route to begin</div>
                </div>
              }
              <Logo className="comma-watermark" />
              <Map />
              <MapDebugger />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

Viewer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    prevTripId: state.prevTripId,
    currentTripId: state.currentTripId,
    fetchingList: state.fetchingList,
    fetching: state.fetching,
    list: state.list,
    tripLine: state.tripLine,
    pointsLine: state.pointsLine,
    currentPoints: state.currentPoints
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Viewer);
