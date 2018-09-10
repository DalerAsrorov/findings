import * as React from 'react';
import Map from './MapView';

export default class PureComponentVsComponent extends React.Component<{}, {}> {
  render() {
    return <Map isMarkerShown={true} />;
  }
}
