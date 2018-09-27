import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from './Styles.scss';
var speedFactor = 30; // number of frames per longitude degree
var animation; // to store and cancel the animation
var startTime = 0;
var progress = 0; // progress = timestamp - startTime
var resetTime = false; // indicator of whether time reset is needed for the animation
var pauseButton = document.getElementById('pause');
var geojson = {
  "type": "FeatureCollection",
  "features": [{
      "type": "Feature",
      "geometry": {
          "type": "LineString",
          "coordinates": [
              [0, 0]
          ]
      }
  }]
};
class Map extends Component {
  componentDidMount() {
    mapboxgl.accessToken = process.env.MAPBOX_KEY;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    this.map.on('load',() => {
      map.addLayer({
          'id': 'line-animation',
          'type': 'line',
          'source': {
              'type': 'geojson',
              'data': geojson
          },
          'layout': {
              'line-cap': 'round',
              'line-join': 'round'
          },
          'paint': {
              'line-color': '#ed6498',
              'line-width': 5,
              'line-opacity': .8
          }
      });
      startTime = performance.now();

      animateLine();
      document.addEventListener('visibilitychange', function() {
          resetTime = true;
      });

      function animateLine(timestamp) {
        if (resetTime) {
            // resume previous progress
            startTime = performance.now() - progress;
            resetTime = false;
        } else {
            progress = timestamp - startTime;
        }

        // restart if it finishes a loop
        if (progress > speedFactor * 360) {
            startTime = timestamp;
            geojson.features[0].geometry.coordinates = [];
        } else {
            var x = progress / speedFactor;
            // draw a sine wave with some math.
            var y = Math.sin(x * Math.PI / 90) * 40;
            // append new coordinates to the lineString
            geojson.features[0].geometry.coordinates.push([x, y]);
            // then update the map
            map.getSource('line-animation').setData(geojson);
        }
        // Request the next frame of the animation.
        animation = requestAnimationFrame(animateLine);
    }
      // this.map.addSource('trip7', {
      //   "type": "FeatureCollection",
      //   "features": [{
      //     "type": "Feature",
      //     "properties": {},
      //     "geometry": {
      //         "type": "Point",
      //         "coordinates": [
      //             -76.53063297271729,
      //             39.18174077994108
      //         ]
      //     }
      //   }]
      // });
    })
    
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div className={styles.map} ref={el => this.mapContainer = el} />;
  }
}

export default Map;