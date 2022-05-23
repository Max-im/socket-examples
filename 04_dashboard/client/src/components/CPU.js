import React, { Component } from 'react'
import drawCircle from '../utils/canvasLoad';

export default class CPU extends Component {
    render() {
        const classes = "canvas-" + this.props.index;
        const canvas = document.querySelector(`.${classes}`);
        drawCircle(canvas, this.props.data.cpuLoad);
        return (
            <div className="col-sm-3 cpu">
                <h3>CPU Load</h3>
                <div className="canvas-wrapper">
                    <canvas className={"cpuCanvas " + classes}   width="200" height="200"></canvas>
                    <div className="cpu-text">{this.props.data.cpuLoad}%</div>
                </div>
            </div>
        )
    }
}
