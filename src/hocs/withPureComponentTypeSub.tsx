import * as React from 'react';
import { getCurrentGeoLocation } from '../utils';

const UPDATE_INTERVAL_MLS = 5000;

export type ComponentTypeProps = {
  latitude: number;
  longitude: number;
  isUpdated: boolean;
  wasRecentlyUpdated: boolean;
};

const withComponentType = (
  WrappedComponent: typeof React.Component,
  shouldUsePureComponent: boolean
) => {
  // To see the difference between PureComponent and Component
  // in the map, you need to set `shouldUsePureComponent` to true.
  // Once it's true, you can drag around the map and see that the
  // map doesn't go back to the current user location after every `UPDATE_INTERVAL_MLS` seconds
  // of the interval. This is because `isUpdated` state property always true
  // after interval is finished.
  const ComponentType = shouldUsePureComponent
    ? React.PureComponent
    : React.Component;

  return class PureComponentVsComponent extends ComponentType<
    {},
    ComponentTypeProps
  > {
    private updateInterval: number;

    constructor(props: {}) {
      super(props);

      this.updateInterval = 0;
    }

    state = {
      latitude: 0,
      longitude: 0,
      isUpdated: false,
      wasRecentlyUpdated: false
    };

    componentDidMount() {
      getCurrentGeoLocation()
        .then(({ latitude, longitude }: Coords) => {
          this.setState({
            wasRecentlyUpdated: true,
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
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  };
};

export default withComponentType;
