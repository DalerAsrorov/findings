import * as React from 'react';

// constants
const MAX_COLUMN_NUM = 10;
const UPDATE_INTERVAL_MLS = 3000;

// styles
const CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const BOX_CONTAINER_STYLE: React.CSSProperties = {
  alignItems: 'flex-start',
  width: '100%',
  height: '30%'
};

const SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexFlow: 'row',
  padding: '10px'
};

const BOX_STYLE: React.CSSProperties = {
  flex: '1',
  margin: '0 10px',
  height: '100%',
  background: 'red'
};

// types
type State = {
  counter: number;
};

type Props = {
  isUpdated: boolean;
};

class BoxIncrement extends React.Component<Props, State> {
  private initialInterval: number;

  state = {
    counter: 1
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setState((prevState: State) => {
      return {
        counter: prevState.counter + 1
      };
    });
  }

  render() {
    const { counter } = this.state;
    const boxes = [...Array(counter)].map((el, i) => (
      <article key={i} style={BOX_STYLE} />
    ));

    return (
      <div style={CONTAINER_STYLE}>
        <section style={{ ...BOX_CONTAINER_STYLE, ...SECTION_STYLE }}>
          {boxes}
        </section>
      </div>
    );
  }
}

export default BoxIncrement;
