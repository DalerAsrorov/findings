import * as React from 'react';
import Map from './MapView';
import { getCurrentGeoLocation } from './utils';

const CLOSER_ZOOM = 16;
const UPDATE_INTERVAL_MLS = 5000;

// To see the difference between PureComponent and Component
// in the map, you need to set `shouldUsePureComponent` to true.
// Once it's true, you can drag around the map and see that the
// map doesn't go back to the current user location after every `UPDATE_INTERVAL_MLS` seconds
// of the interval. This is because `isUpdated` state property always true
// after interval is finished.
const shouldUsePureComponent = false;

type State = {
  latitude: number;
  longitude: number;
  isMarkerShown: boolean;
  isUpdated: boolean;
};

const ComponentType = shouldUsePureComponent
  ? React.PureComponent
  : React.Component;

export default class PureComponentVsComponent extends ComponentType<{}, State> {
  private updateInterval: number;
  private mapRef: any;

  constructor(props: {}) {
    super(props);

    this.mapRef = React.createRef();
    this.updateInterval = 0;
  }

  state = {
    latitude: 0,
    longitude: 0,
    isMarkerShown: false,
    isUpdated: false
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

    this.updateInterval = window.setInterval(() => {
      this.setState({
        isUpdated: true
      });
    }, UPDATE_INTERVAL_MLS);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    const { latitude, longitude, isMarkerShown } = this.state;

    return (
      <Map
        latitude={latitude}
        longitude={longitude}
        isMarkerShown={isMarkerShown}
        zoom={CLOSER_ZOOM}
        mapRef={(ref: any) => (this.mapRef = ref)}
      />
    );
  }
}
