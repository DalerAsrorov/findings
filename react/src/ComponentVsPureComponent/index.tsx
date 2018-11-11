import * as React from 'react';
import BoxIncrement from './BoxIncrement';
import withPureComponentTypeSub from '../hocs/withPureComponentTypeSub';

// constants
const MAX_COLUMN_NUM = 10;
const UPDATE_INTERVAL_MLS = 3000;

// styles
const CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  flexFlow: 'column'
};

// types
type State = {
  shouldUsePureComponent: boolean;
};

const getComponentType = (shouldUsePureComponent: boolean) =>
  !shouldUsePureComponent ? 'Component' : 'PureComponent';

class PureComponentVsComponentExample extends React.Component<{}, State> {
  private initialInterval: number;

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
    const componentTypeStr = getComponentType(!shouldUsePureComponent);
    const EnhancedBoxIncrement = withPureComponentTypeSub(
      BoxIncrement,
      shouldUsePureComponent
    );

    return (
      <div style={CONTAINER_STYLE}>
        <section style={{ flex: 1, width: '100%' }}>
          <EnhancedBoxIncrement />
        </section>
        <section style={{ flex: 1, width: '100%', textAlign: 'center' }}>
          <button onClick={this.handleSwitch}>
            <h2>Use {componentTypeStr}</h2>
          </button>
        </section>
      </div>
    );
  }
}

export default PureComponentVsComponentExample;
