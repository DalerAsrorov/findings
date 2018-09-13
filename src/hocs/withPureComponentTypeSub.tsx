import * as React from 'react';
import { getCurrentGeoLocation } from '../utils';

const UPDATE_INTERVAL_MLS = 5000;

export type ComponentTypeProps = {
  latitude: number;
  longitude: number;
  isUpdated: boolean;
  hasLocationAvailable: boolean;
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
      isUpdated: true,
      hasLocationAvailable: false
    };

    componentDidMount() {
      getCurrentGeoLocation()
        .then(({ latitude, longitude }: Coords) => {
          this.setState({
            hasLocationAvailable: true,
            latitude,
            longitude
          });
        })
        .catch((error: Error) => {
          console.log('some error', error);
        });

      // The update interval sets isUpdated to the same value
      // Using Component should cause re-render after 5 seconds
      // Using PureComponent should NOT cause re-render since state
      // diff comparison is shallow
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
