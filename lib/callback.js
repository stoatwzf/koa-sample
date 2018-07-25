const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();

http.createServer(app.callback()).listen(8383);
https.createServer(app.callback()).listen(8484);