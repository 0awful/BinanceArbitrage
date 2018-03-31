const binance = require('node-binance-api');
const calculate = require('./CalculateThroughput.js');
const normalize = require('./createDataObject.js');

let warmupTimer = 0;
let profit = 0;
let profitableTrades = 0;
let activeProfitableRoute = false;

binance.options({
  // these are invalid, be sure to use your own key
  APIKEY: 'ofVTc0iMdNO18rVgMk3KjdOhVdEVg7e2cj17A1DKCpWvNbf6Nnv2jjPxQLbSJ3JT',
  APISECRET: 'BdOr83FEkgdPEP7oXA21MjdLI43v09NCWivgLxlsHBHhvsYgrnCrjM6MFDIsGzi7'
});

function subscribeTickerObject(
  tickerSymbol,
  tickersObject,
  calculationFunction
) {
  binance.websockets.depthCache([tickerSymbol], (symbol, depth) => {
    let bids = binance.sortBids(depth.bids);
    let asks = binance.sortAsks(depth.asks);

    let previousBid = tickersObject[tickerSymbol].bid;
    let previousAsk = tickersObject[tickerSymbol].ask;

    let currentBid = binance.first(bids);
    let currentAsk = binance.first(asks);

    let currentBidVolume = bids[binance.first(bids)];
    let currentAskVolume = asks[binance.first(asks)];

    tickersObject[tickerSymbol].bid = currentBid;
    tickersObject[tickerSymbol].bidQty = currentBidVolume;
    tickersObject[tickerSymbol].ask = currentAsk;
    tickersObject[tickerSymbol].askQty = currentAskVolume;

    if (warmupTimer < 20) {
      console.log('warming up:', warmupTimer);
      warmupTimer++;
    } else {
      const dataObject = normalize.createDataObject(
        'LTCBTC',
        'LTCETH',
        'ETHBTC',
        'BUY',
        'SELL',
        'SELL',
        tickersObject
      );
      let trade = calculate.calculateThroughput(dataObject, null);

      if (trade.profitability > 0) {
        if (activeProfitableRoute != true) {
          activeProfitableRoute = true;
          profit += trade.profitability;
          profitableTrades++;
          console.log(JSON.stringify(trade));
        }

        console.log(JSON.stringify(trade));
        console.log('Profits:', profit);
        console.log('trades', profitableTrades);
      } else {
        activeProfitableRoute = false;
      }
    }
  });
}

function constructTickers(tickersObject, tickersNameArray) {
  for (let i = 0; i < tickersNameArray.length; i++) {
    tickersObject[tickersNameArray[i]] = {
      bid: null,
      bidQty: null,
      ask: null,
      askQty: null
    };
  }
}

function subscribeTickers(tickers, calculationFunction) {
  let keys = Object.keys(tickers);
  for (let i = 0; i < keys.length; i++) {
    subscribeTickerObject(keys[i], tickers, calculationFunction);
  }
}

function initializeData(tickers, tickerData, calculationFunction) {
  constructTickers(tickers, tickerData);
  subscribeTickers(tickers, calculationFunction);
}

module.exports.initialize = initializeData;
