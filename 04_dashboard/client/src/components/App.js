import React, { Component } from 'react';
import socket from '../utils/socketConnect';
import '../css/App.css';
import Widget from './Widget';

class App extends Component {
  constructor() {
    super();
    this.state = {
      performance: {},
    };
  }

  componentDidMount() {
    socket.on('data', (data) => {
      const currentPerf = { ...this.state.performance };
      currentPerf[data.mac] = data;
      this.setState({ performance: currentPerf });
    });
  }
  render() {
    return (
      <div className='app'>
        {Object.values(this.state.performance).map((widgetObj, i) => (
          <Widget key={widgetObj.mac} data={widgetObj} index={i} />
        ))}
      </div>
    );
  }
}

export default App;
