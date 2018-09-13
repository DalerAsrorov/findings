import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import withPureComponentTypeSub, {
  ComponentTypeProps
} from '../hocs/withPureComponentTypeSub';

type MapBaseProps = {
  isMarkerShown: boolean;
  longitude: number;
  latitude: number;
  zoom: number;
  shouldUsePureComponent?: boolean;
};

// SF coords
const DEFAULT_CENTER = {
  lat: 37.773972,
  lng: -122.431297
};

const LoadingMessage = () => (
  <h4 style={{ textAlign: 'center' }}>Fetching current location...</h4>
);

const MAP_URL =
  'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places';

const MapElement = withScriptjs(
  withGoogleMap((props: MapBaseProps) => (
    <GoogleMap
      defaultCenter={DEFAULT_CENTER}
      center={{ lat: props.latitude, lng: props.longitude }}
      defaultZoom={16}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: props.latitude, lng: props.longitude }} />
      )}
    </GoogleMap>
  ))
);

class MapView extends React.Component<
  {
    hasLocationAvailable: boolean;
    isMarkerShown: boolean;
    longitude: number;
    latitude: number;
    zoom: number;
  },
  {}
> {
  render() {
    return (
      <React.Fragment>
        <MapElement
          {...this.props}
          isMarkerShown={this.props.hasLocationAvailable}
          googleMapURL={MAP_URL}
          containerElement={<div style={{ height: '400px' }} />}
          loadingElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
        {!this.props.hasLocationAvailable && <LoadingMessage />}
      </React.Fragment>
    );
  }
}

export const MapWithComponentTypeState = ({
  shouldUsePureComponent
}: {
  shouldUsePureComponent: boolean;
}) => {
  const EnhancedMap = withPureComponentTypeSub(MapView, shouldUsePureComponent);

  return (
    <React.Fragment>
      <EnhancedMap />
    </React.Fragment>
  );
};

export default MapView;
