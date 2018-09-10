import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MAP_URL =
  'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places';

const MapView = withScriptjs(
  withGoogleMap((props: { isMarkerShown: boolean }) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
    </GoogleMap>
  ))
);

const MapViewWrapper = (props: { isMarkerShown: boolean }) => (
  <MapView
    {...props}
    googleMapURL={MAP_URL}
    containerElement={<div style={{ height: '400px' }} />}
    loadingElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}
  />
);

export default MapViewWrapper;
