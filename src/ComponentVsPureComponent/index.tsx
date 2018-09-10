import * as React from 'react';
import Map from './MapView';
import { getCurrentGeoLocation } from './utils';

type State = {
  latitude: number;
  longitude: number;
};

export default class PureComponentVsComponent extends React.Component<
  {},
  State
> {
  state = {
    latitude: 0,
    longitude: 0
  };

  componentDidMount() {
    getCurrentGeoLocation()
      .then(({ latitude, longitude }: Coords) => {
        this.setState({
          latitude,
          longitude
        });
      })
      .catch((error: Error) => {
        console.log('some error', error);
      });
  }

  render() {
    const { latitude, longitude } = this.state;

    return (
      <Map latitude={latitude} longitude={longitude} isMarkerShown={true} />
    );
  }
}
