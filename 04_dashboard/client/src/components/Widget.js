import React, { Component } from 'react'
import CPU from './CPU'
import Info from './Info'
import Mem from './Mem';
import '../css/widgets.css'

export default class Widget extends Component {
    render() {
        const {freeMem, totalMem, usedMem, memUsege, cpuModel, cpuSpeed, upTime, cpuLoad, osType, cpuNum, mac} = this.props.data;
        const index = this.props.index;
        const cpuData = {cpuLoad, mac, index};
        const memData = {freeMem, totalMem, usedMem, memUsege, index};
        const infoData = {mac, osType, cpuNum, cpuModel, cpuSpeed, upTime};

        return (
            <div className="widget">
                <CPU data={cpuData} />
                <Mem data={memData} />
                <Info data={infoData} />
            </div>
        )
    }
}
