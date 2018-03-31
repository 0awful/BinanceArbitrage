const fs = require('fs');
const tickerData = JSON.parse(fs.readFileSync('./RestrictedTickers.json'));
const websockets = require('./Websockets.js');

let tickers = {};

websockets.initialize(tickers, tickerData, null);
