const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Machine = new Schema({
    mac: String,
    freeMem: Number,
    totalMem: Number,
    usedMem: Number,
    memUsege: Number,
    cpuModel: String,
    cpuSpeed: Number,
    upTime: Number,
    cpuLoad: Number,
    osType: String,
    cpuNum: Number
});

module.exports = mongoose.model('Machine', Machine);