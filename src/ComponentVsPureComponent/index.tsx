import * as React from 'react';
import Map from './MapView';
import { getCurrentGeoLocation } from './utils';

const CLOSER_ZOOM = 16;

type State = {
  latitude: number;
  longitude: number;
  isMarkerShown: boolean;
};

export default class PureComponentVsComponent extends React.Component<
  {},
  State
> {
  state = {
    latitude: 0,
    longitude: 0,
    isMarkerShown: false
  };

  componentDidMount() {
    getCurrentGeoLocation()
      .then(({ latitude, longitude }: Coords) => {
        this.setState({
          isMarkerShown: true,
          latitude,
          longitude
        });
      })
      .catch((error: Error) => {
        console.log('some error', error);
      });
  }

  render() {
    const { latitude, longitude, isMarkerShown } = this.state;

    return (
      <Map
        latitude={latitude}
        longitude={longitude}
        isMarkerShown={isMarkerShown}
        zoom={CLOSER_ZOOM}
      />
    );
  }
}
