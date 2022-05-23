import React from 'react';
import moment from 'moment'

function Info(props){
    return (
        <div className="col-sm-3 col-sm-offset-1 cpu-info">
          <h3>Operating System</h3>
          <div className="widget-text">{props.data.osType}</div>
          <h3>Time Online</h3>
          <div className="widget-text">{moment.duration(props.data.upTime).humanize()}</div>
          <h3>Processor information</h3>
          <div className="widget-text"><strong>Type:</strong> {props.data.cpuModel}</div>
          <div className="widget-text"><strong>Number of Cores:</strong> {props.data.cpuNum}</div>
          <div className="widget-text"><strong>Clock Speed:</strong> {props.data.cpuSpeed}</div>
        </div>
    );
}

export default(Info);
