const si = require('systeminformation');
const cliProgress = require('cli-progress');

const mb = new cliProgress.MultiBar({
    format: '{name} |{bar}| {percentage}% {data}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

const b1 = mb.create(100,0,{name:"CPU",data:""});
const b2 = mb.create(100,0,{name:"Memory",data:""});

setInterval(async() =>{
    const currentLoad = await si.currentLoad();
    b1.update(currentLoad.currentload,{name:"CPU",data:""});
    const mem = await si.mem();
    const total =  mem.total;
    const available = mem.available;
    const active = mem.active;
    b2.update(active / total * 100,{name:"Mem",data:`Used: ${(active / 1024 / 1024 / 1024).toFixed(3)}, Available: ${(available / 1024 / 1024 / 1024).toFixed(3)} GB, Total: ${(total / 1024 / 1024 / 1024).toFixed(3)} GB`})
},500);
    