function createDataObject(
  tickerOne,
  tickerTwo,
  tickerThree,
  directionOne,
  directionTwo,
  directionThree,
  tickers
) {
  // this is an interface between the tickers object and calculateThroughput

  return {
    tickerOne: createDataNode(tickerOne, directionOne, tickers),
    tickerTwo: createDataNode(tickerTwo, directionTwo, tickers),
    tickerThree: createDataNode(tickerThree, directionThree, tickers)
  };
}

function createDataNode(ticker, direction, tickers) {
  return {
    priceAsk: tickers[ticker].ask,
    priceBid: tickers[ticker].bid,
    qtyAsk: tickers[ticker].askQty,
    qtyBid: tickers[ticker].bidQty,
    ticker: ticker,
    direction: direction
  };
}

module.exports.createDataObject = createDataObject;
