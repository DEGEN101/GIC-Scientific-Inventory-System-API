var Service = require('node-windows').Service;
var svc = new Service({
 name:'Gics API Server',
 description: 'Node.js service description goes here.',
 script: 'D:\\Users\\Khalifa Raji\\Documents\\Work\\GIC Scientific\\GIC Scientific Stock System\\gic-inventory-api\\server.js'
});

svc.on('uninstall',function(){
 console.log('[+] Uninstall complete')
});

svc.uninstall();