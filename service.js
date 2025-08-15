var Service = require('node-windows').Service;
var { exec } = require('child_process');


var svc = new Service({
    name:'GICS API Server',
    description: 'Node.js service description goes here.',
    script: 'D:\\Users\\Khalifa Raji\\Documents\\Work\\GIC Scientific\\GIC Scientific Stock System\\gic-inventory-api\\server.js',
});

svc.on('install',function(){
    console.log('Service installed, configuring dependency...');

    exec('sc.exe config gicsapiserver.exe depend= MSSQL$SQLEXPRESS', (error, stdout, stderr) => {
        if (error) {
            console.error(`Failed to set dependency: ${error.message}`);
            return;
        }
        console.log(`Dependency set: ${stdout}`);
        svc.start();
    });
});

svc.install();