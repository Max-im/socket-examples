const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1/perfData', {useNewUrlParser: true, useUnifiedTopology: true});
const Machine = require('./models/Machine')

function socketMain(io, socket) {
    let mac;

    socket.on('clientAuth', key => {
        if (key === 'asldkfjw9r0ejq34wjrlkwja') {
            socket.join('clients');
        } else if (key === 'oir34uerjafiaiyy8942yh') {
            socket.join('ui');
            console.log('react client joined')
        } else {
            socket.disconnect(true);
        }
    });

    socket.on('initPerfData' , async (data) => {
        const response = await checkAndAdd(data);
        console.log(response,'response')
    });

    socket.on('perfData', data => {
        io.to('ui').emit('data', data);
    });
}

function checkAndAdd(data) {
    return new Promise((resolve, reject) => {
        Machine.findOne({mac: data.mac}, (err, doc) => {
            if (err) return reject(err);
            if (doc) {
                resolve('found')
            } else {
                const machine = new Machine(data);
                machine.save();
                resolve('added');
            }
        });
    });
}

module.exports = socketMain;