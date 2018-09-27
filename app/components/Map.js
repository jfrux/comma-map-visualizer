import React, { Component } from 'react';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import styles from './Styles.scss';
import PropTypes from 'prop-types';
var speedFactor = 30; // number of frames per longitude degree
var animation; // to store and cancel the animation
var startTime = 0;
var progress = 0; // progress = timestamp - startTime
var resetTime = false; // indicator of whether time reset is needed for the animation
var pauseButton = document.getElementById('pause');

const propTypes = {
  tripLine: PropTypes.object,
  hasTripLine: PropTypes.bool,
  refreshingTripLine: PropTypes.bool,
  refreshingMap: PropTypes.bool,
  tripCenterArray: PropTypes.array,
  coordsArrayOfArrays: PropTypes.array
};
class Map extends Component {
  constructor() {
    super();

    this.state = {
      hasTripLine: false
    };
  }
  centerMap = () => {
    const { tripCenterArray, coordsArrayOfArrays, tripLine } = this.props;
    console.warn("flying to center:", tripCenterArray);
    this.map.flyTo({
      center: tripCenterArray
    });
    // Geographic coordinates of the LineString
    // var coordinates = tripLine.features[0].geometry.coordinates;

    // Pass the first coordinates in the LineString to `lngLatBounds` &
    // wrap each coordinate pair in `extend` to include them in the bounds
    // result. A variation of this technique could be applied to zooming
    // to the bounds of multiple Points or Polygon geomteries - it just
    // requires wrapping all the coordinates with the extend method.
    var bounds = coordsArrayOfArrays.reduce(function(bounds, coord) {
        return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordsArrayOfArrays[0], coordsArrayOfArrays[0]));

    this.map.fitBounds(bounds, {
        padding: 20
    });
  }
  refreshTripLine = () => {
    console.warn("pointsObject",this.props.pointsLine);
    console.warn("refreshTripLine",this.props.tripLine);
    if (this.state.hasTripLine) {
      this.map.removeLayer("route");
      this.map.removeLayer("points");
    }
    this.map.addLayer(this.props.tripLine);
    this.map.addLayer(this.props.pointsLine);
    this.setState({
      hasTripLine: true
    })
  }
  componentDidUpdate(origProps) {
    if (this.props.tripLine !== origProps.tripLine) {
      this.refreshTripLine();
    }
    if (this.props.tripCenterArray !== origProps.tripCenterArray) {
      console.log("this.props:", this.props)
      console.log("origProps:", origProps)
      this.centerMap();
    }
  }
  componentDidMount() {
    mapboxgl.accessToken = process.env.MAPBOX_KEY;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });

    this.map.on('load',() => {
      if (this.props.geojson) {
       
      }
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div className={styles.map} ref={el => this.mapContainer = el} />;
  }
}

Map.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    coordsArrayOfArrays: state.coordsArrayOfArrays,
    tripCenterArray: state.tripCenterArray,
    tripLine: state.tripLine,
    hasTripLine: state.hasTripLine,
    pointsLine: state.pointsLine,
    refreshingTripLine: state.refreshingTripLine,
    refreshingMap: state.refreshingMap
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
