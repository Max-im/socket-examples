const os = require('os');
const io = require('socket.io-client');
const socket =  io('http://127.0.0.1:8081');

const cpus = os.cpus();
const cpuNum = cpus.length;


socket.on('connect', () => {

  getPerformance().then(data => {
    socket.emit('initPerfData', data)
  });

  socket.emit('clientAuth', 'asldkfjw9r0ejq34wjrlkwja')

  const perfDataInterval = setInterval(() => {
    getPerformance().then(data => socket.emit('perfData', data));
  }, 1000);

  socket.on('disconnect', () =>{
    clearInterval(perfDataInterval);
  })
});


function getPerformance() {
  return new Promise(async (resolve) => {
    const osType = os.type() === 'Darvin' ? 'Mac' : os.type();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsege = Math.floor((usedMem / totalMem) * 100) / 100;
    const cpuModel = cpus[0].model;
    const cpuSpeed = cpus[0].speed;
    const upTime = os.uptime();
    const cpuLoad = await getCpuLoad();
    const mac = getMac();
    const isActive = true;

    resolve({ freeMem, totalMem, usedMem, memUsege, cpuModel, cpuSpeed, upTime, cpuLoad, osType, cpuNum, mac, isActive });
  });
}



function cpuAvarage() {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach((core) => {
    for (const key in core.times) {
      totalMs += core.times[key];
    }
    idleMs += core.times.idle;
  });

  return {
    idle: idleMs / cpuNum,
    total: totalMs / cpuNum,
  };
}

function getCpuLoad() {
  return new Promise((resolve) => {
    const start = cpuAvarage();
    setTimeout(() => {
      const end = cpuAvarage();
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const loadCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);
      resolve(loadCpu);
    }, 100);
  });
}

function getMac() {
  const nI = os.networkInterfaces();
  let mac;
  for (const key in nI) {
    if (!nI[key][0].internal) {
      mac = nI[key][0].mac;
      break;
    }
  }  
  return mac;
}