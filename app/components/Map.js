import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import styles from './Styles.scss';
class Map extends Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div className={styles.map} ref={el => this.mapContainer = el} />;
  }
}

export default Map;