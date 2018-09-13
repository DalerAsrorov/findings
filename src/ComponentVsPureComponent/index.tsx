import * as React from 'react';
import { MapWithComponentTypeState as Map } from './MapView';

// constants
const CLOSER_ZOOM = 16;
const UPDATE_INTERVAL_MLS = 5000;

// types
type State = {
  shouldUsePureComponent: boolean;
};

// styles
const BTN_STYLE = {
  margin: '0 auto',
  display: 'block',
  marginTop: '8px'
};

class PureComponentVsComponentExample extends React.Component<{}, State> {
  state = {
    shouldUsePureComponent: false
  };

  private handleSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState(({ shouldUsePureComponent }) => ({
      shouldUsePureComponent: !shouldUsePureComponent
    }));
  };

  render() {
    const { shouldUsePureComponent } = this.state;

    return (
      <div>
        <Map shouldUsePureComponent={shouldUsePureComponent} />
        <React.Fragment>
          <button onClick={this.handleSwitch} style={BTN_STYLE}>
            <h2>
              Use {shouldUsePureComponent ? 'Component' : 'PureComponent'}
            </h2>
          </button>
        </React.Fragment>
        <p>
          The map gets updated every 5 seconds. Drag the map to a different
          location to see if location is set back to user's location after every
          5 seconds. When using <strong>PureComponent</strong>, the map should
          not zoom back to the user location while <strong>Component</strong>{' '}
          does since the state update is not shallow.
        </p>
      </div>
    );
  }
}

export default PureComponentVsComponentExample;
