const fs = require('fs');
const tickerData = JSON.parse(fs.readFileSync('./Tickers.json'));
const websockets = require('./Websockets.js');
const routes = require('./EvaluateAllRoutes.js');
const calculate = require('./CalculateThroughput.js');
let tickers = {};

websockets.initialize(tickers, tickerData);

setInterval(function() {
  let route = calculate.classARoute(
    tickers.LTCBTC.ask,
    tickers.LTCBTC.askQty,
    'LTCBTC',
    tickers.LTCETH.bid,
    tickers.LTCETH.bidQty,
    'LTCETH',
    tickers.ETHBTC.bid,
    tickers.ETHBTC.bidQty,
    'ETHBTC'
  );
  if (route) {
    console.log(JSON.stringify(route));
  }
  // if (time > 1000 && time < 60000) {
  //   if (time % 1000 === 0) {
  //     console.log(`${time / 1000} seconds searched`);
  //   }
  // } else if (time > 60000) {
  //   if (time % 30000 === 0) {
  //     console.log(`${time / 60000} minutes searched`);
  //   }
  // }
}, 1000);
