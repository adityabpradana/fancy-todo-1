const http = require('http');
const app = require('../app');
const port = process.env.PORT || 3000;

const srv = http.createServer(app);

srv.listen(port, () => console.log('Listen on port: ', port));