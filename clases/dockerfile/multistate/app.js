const cron = require('node-cron');
const { syncDB } = require('./tasks/sync-db');

let times = 0

console.log('Inicio de la aplicacion cron-ticker');
cron.schedule('1-59/5 * * * * *', syncDB);
