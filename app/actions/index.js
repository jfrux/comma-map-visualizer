import * as types from './action_types';
import geolib from 'geolib';
export function fetchList() {
  return {
      type: types.FETCH_LIST
  };
}

export function fetchList_SUCCESS(json) {
  let trips = {};

  json.forEach((item) => {
    let tripId = parseInt(item.fileName.replace('.json',''));
    trips[tripId] = {
      ...item,
      id: tripId,
      name: item.fileName,
      totalDistance: null,
      totalTime: null
    };
  });
  
  return {
      type: types.FETCH_LIST_SUCCESS,
      payload: trips
  };
}

export function fetchList_ERROR(e) {
  return {
      type: types.FETCH_LIST_ERROR,
      payload: e
  };
}

export function selectTrip(tripId) {
  return {
    type: types.SELECT_TRIP,
    payload: {
      tripId
    }
};
}

export function fetchPoints(tripId) {
  return {
    type: types.FETCH_POINTS,
    payload: {
      tripId
    }
  };
}
function getCoordsArraysArrayFromPoints(points) {
  const pointsKeys = Object.keys(points);
  return pointsKeys.map((pointsId) => {
    const pointsObj = points[pointsId];
    return (
      [parseFloat(pointsObj.lng),parseFloat(pointsObj.lat)]
    )
  })
}
function getCoordsObjectsArrayFromPoints(points) {
  const pointsKeys = Object.keys(points);
  return pointsKeys.map((pointsId) => {
    const pointsObj = points[pointsId];
    return (
      {latitude: parseFloat(pointsObj.lat), longitude: parseFloat(pointsObj.lng)}
    )
  })
}
function mapboxPointsObject(points) {
  const pointsKeys = Object.keys(points);
  return {
      "id": "points",
      "type": "symbol",
      "source": {
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": pointsKeys.map((pointId, index) => {
                const pointObj = points[pointId];
                return {
                  "type": "Feature",
                  "geometry": {
                      "type": "Point",
                      "coordinates": [pointObj.lng, pointObj.lat]
                  },
                  "properties": {
                      "title": `${pointObj.speedMphFriendly}\n${pointObj.speedKphFriendly}\n#${index}`,
                      "icon": "monument"
                  }
                };
              })
          }
      },
      "layout": {
          "icon-image": "{icon}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
      }
  }
}
function mapboxLineObject(coords) {
  return {
    "id": "route",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": coords
        }
      }
    },
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      'line-color': '#FFF',
      "line-width": 4
    }
  };
}
export function fetchPoints_SUCCESS(json) {
  // Arbitrary base timestamp (in seconds) for calculation and unique identification
  const base_timestamp = 1537920000;
  let points = {}; // points object that we will save to the store
  // Format each point into a fast and usable structure
  json.forEach((item,index) => {
    const pointsId = base_timestamp + index;
    
    points[pointsId] = {
      ...item,
      id: pointsId,
      distance: null,
      timestamp: pointsId,
      prevPointsId: (pointsId > base_timestamp) ? pointsId - 1 : base_timestamp
    };
  });

  // Process and prep for rendering
  let totalDistance = 0;
  let sumOfSpeedsMph = 0;
  let avgSpeedMph = 0;
  let sumOfSpeedsKph = 0;
  let avgSpeedKph = 0;
  Object.keys(points).forEach((id) => {
    const record = points[id];
    const prevRecord = points[record.prevPointsId];
    const currentCoords = { lat: record.lat, lng: record.lng, time: (record.timestamp*1000) };
    const prevCoords = { lat: prevRecord.lat, lng: prevRecord.lng, time: (prevRecord.timestamp*1000) };
    const speed = geolib.getSpeed(prevCoords, currentCoords) || 0;
    const speedMph = speed * 0.621371 || 0;
    const distance = geolib.getDistance(prevCoords, currentCoords);
    totalDistance = totalDistance + distance;
    sumOfSpeedsMph = sumOfSpeedsMph + speedMph;
    sumOfSpeedsKph = sumOfSpeedsKph + speed;
    points[id] = {
      ...record,
      distance: distance,
      speed,
      speedMph: speedMph,
      speedKphFriendly: Math.round(speed) + " kph",
      speedMphFriendly: Math.round(speedMph) + " mph"
    };
  });

  const coordsArrayOfArrays = getCoordsArraysArrayFromPoints(points);
  const coordsArrayOfObjects = getCoordsObjectsArrayFromPoints(points);
  const tripCenterObject = geolib.getCenter(coordsArrayOfObjects);
  const tripCenterArray = [parseFloat(tripCenterObject.longitude),parseFloat(tripCenterObject.latitude)];

  avgSpeedMph = sumOfSpeedsMph / coordsArrayOfArrays.length;
  avgSpeedKph = sumOfSpeedsKph / coordsArrayOfArrays.length;
  // console.log("pointsWithSpeeds",points);
  return {
      type: types.FETCH_POINTS_SUCCESS,
      payload: {
        points,
        avgSpeedMph,
        avgSpeedKph,
        totalDistance,
        pointsLine: mapboxPointsObject(points),
        tripCenterObject,
        tripCenterArray,
        coordsArrayOfArrays,
        tripLine: mapboxLineObject(coordsArrayOfArrays)
      }
  };
}

export function fetchPoints_ERROR(e) {
  return {
      type: types.FETCH_POINTS_ERROR,
      payload: e
  };
}