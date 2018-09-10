import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

// SF coords
const DEFAULT_CENTER = {
  lat: 37.773972,
  lng: -122.431297
};

const MAP_URL =
  'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places';

const MapView = withScriptjs(
  withGoogleMap(
    (props: {
      isMarkerShown: boolean;
      latitude: number;
      longitude: number;
      zoom: number;
    }) => (
      <GoogleMap
        defaultCenter={DEFAULT_CENTER}
        center={{ lat: props.latitude, lng: props.longitude }}
        defaultZoom={16}
      >
        {props.isMarkerShown && (
          <Marker position={{ lat: props.latitude, lng: props.longitude }} />
        )}
      </GoogleMap>
    )
  )
);

const MapViewWrapper = (props: {
  isMarkerShown: boolean;
  longitude: number;
  latitude: number;
  zoom: number;
}) => (
  <MapView
    {...props}
    googleMapURL={MAP_URL}
    containerElement={<div style={{ height: '400px' }} />}
    loadingElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}
  />
);

export default MapViewWrapper;
