const binance = require('node-binance-api');

binance.options({
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

    if (currentBid > previousBid) {
      let route = calculationFunction(
        tickersObject.LTCBTC.ask,
        tickersObject.LTCBTC.askQty,
        'LTCBTC',
        tickersObject.LTCETH.bid,
        tickersObject.LTCETH.bidQty,
        'LTCETH',
        tickersObject.ETHBTC.bid,
        tickersObject.ETHBTC.bidQty,
        'ETHBTC'
      );
      if (route && route.profitability > 0.0001) {
        console.log('Profitable route found!');
        console.log('Profitability:', route.profitability);
        console.log('Trade one:', route.tradeOne);
        console.log('Trade two:', route.tradeTwo);
        console.log('Trade three:', route.tradeThree);
      }
    }

    if (currentAsk < previousAsk) {
      let route = calculationFunction(
        tickersObject.LTCBTC.ask,
        tickersObject.LTCBTC.askQty,
        'LTCBTC',
        tickersObject.LTCETH.bid,
        tickersObject.LTCETH.bidQty,
        'LTCETH',
        tickersObject.ETHBTC.bid,
        tickersObject.ETHBTC.bidQty,
        'ETHBTC'
      );
      if (route && route.profitability > 0.0001) {
        console.log('Profitable route found!');
        console.log('Profitability:', route.profitability);
        console.log('Trade one:', route.tradeOne);
        console.log('Trade two:', route.tradeTwo);
        console.log('Trade three:', route.tradeThree);
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
