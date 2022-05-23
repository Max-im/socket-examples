import React, { Component } from 'react'
import drawCircle from '../utils/canvasLoad';

export default class Mem extends Component {
    render() {
        const {freeMem, totalMem, usedMem, memUsege} = this.props.data;
        const canvas = document.querySelector('.memCanvas');
        drawCircle(canvas, memUsege * 100);
        const gig = 1073741824;
        return (
            <div className="col-sm-3 mem">
                <h3>Memory Usage</h3>
                <div className="canvas-wrapper">
                    <canvas className="memCanvas" width="200" height="200"></canvas>
                    <div className="mem-text">{memUsege * 100}%</div>
                </div>
                <div>Total Memory: {Math.floor(totalMem / gig * 100) / 100} gb</div>
                <div>Used Memory: {Math.floor(usedMem / gig * 100) / 100} gb</div>
                <div>Free Memory: {Math.floor(freeMem / gig *100) /100} gb</div>
            </div>
        )
    }
}
