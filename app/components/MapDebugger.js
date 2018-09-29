import React, { Component } from 'react';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const propTypes = {
  points: PropTypes.object
};

class MapDebugger extends Component {
  constructor() {
    super();
    this.state = {
      activated: false
    };
  }
  showStats = () => {
    this.setState({
      activated: true
    });
  }
  hideStats = () => {
    this.setState({
      activated: false
    });
  }
  render() {
    const { activated } = this.state;
    const { points, totalDistance, avgSpeedKph, avgSpeedMph }  = this.props;
    let pointsList,coordsList;
    
    if (points) {
      if (!activated) {
        return <button className="debug_button btn btn-dark" onClick={this.showStats}>Show Stats</button>;
      }
      pointsList = Object.keys(points);
      if (pointsList.length) {
        
        coordsList = pointsList.map((key,index) => {
          let pointsItem = points[key];
          console.log(pointsItem);
          return (<div key={index}>
            <span className="label label-default">{index}</span>
            <span className="label label-default">{pointsItem.distance}m</span>
            <span className="label label-default">{pointsItem.lng}</span>
            <span className="label label-default">{pointsItem.lat}</span>
            <span className="label label-default">{pointsItem.speedMph}</span>
            <span className="label label-default">{pointsItem.speed}</span>
          </div>);
        });
      }
    }
    if (!points) {
      return <div className="map_debugger"></div>;
    }
    return (
      <div className="map_debugger activated">
        <button className="debug_button btn btn-dark" onClick={this.hideStats}>Hide Stats</button>
        <div className="stats">
          <div className="total_distance">
            <div className="label">Total Dist. (meters)</div>
            <div className="value">{totalDistance}</div>
          </div>
          <div className="avg_speed">
            <div className="label">Avg. Speed (mph)</div>
            <div className="value">{Math.round(avgSpeedMph)}</div>
          </div>
          <div className="avg_speed">
            <div className="label">Avg. Speed (kph)</div>
            <div className="value">{Math.round(avgSpeedKph)}</div>
          </div>
        </div>
        <div className="records_list">
        <div className="records_heading">
          <span className="label label-default">Index</span>
          <span className="label label-default">Dist (m)</span>
          <span className="label label-default">Lng.</span>
          <span className="label label-default">Lat.</span>
          <span className="label label-default">MPH</span>
          <span className="label label-default">KPH</span>
        </div>
        {coordsList}
        </div>
      </div>
    )
  }
}


MapDebugger.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    points: state.points,
    totalDistance: state.totalDistance,
    avgSpeedMph: state.avgSpeedMph,
    avgSpeedKph: state.avgSpeedKph
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapDebugger);
