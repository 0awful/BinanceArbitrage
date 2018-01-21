const binance = require('node-binance-api');

binance.options({
  APIKEY: 'ofVTc0iMdNO18rVgMk3KjdOhVdEVg7e2cj17A1DKCpWvNbf6Nnv2jjPxQLbSJ3JT',
  APISECRET: 'BdOr83FEkgdPEP7oXA21MjdLI43v09NCWivgLxlsHBHhvsYgrnCrjM6MFDIsGzi7'
});

function subscribeTickerObject(tickerSymbol, tickersObject) {
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

    if (currentBid > previousBid) {
      // evaluate trades
    }

    if (currentAsk < previousAsk) {
      // evaluate trades
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

function subscribeTickers(tickers) {
  let keys = Object.keys(tickers);
  for (let i = 0; i < keys.length; i++) {
    subscribeTickerObject(keys[i], tickers);
  }
}

function initializeData(tickers, tickerData) {
  constructTickers(tickers, tickerData);
  subscribeTickers(tickers);
}

module.exports.initialize = initializeData;
