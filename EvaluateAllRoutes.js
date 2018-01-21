let totalFoundRoutes = 0;

function evaluate(tickers) {
  let counter = 0;
  if (
    tickers.BTCUSDT.ask * tickers.ETHBTC.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.ETHUSDT.bid
  ) {
    console.log(
      'tickers.BTCUSDT.ask * tickers.ETHBTC.ask < tickers.ETHUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BTCUSDT.ask * tickers.BNBBTC.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.BNBUSDT.bid
  ) {
    console.log(
      'tickers.BTCUSDT.ask * tickers.BNBBTC.ask < tickers.BNBUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BTCUSDT.ask * tickers.BCCBTC.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.BCCUSDT.bid
  ) {
    console.log(
      'tickers.BTCUSDT.ask * tickers.BCCBTC.ask < tickers.BCCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BTCUSDT.ask * tickers.LTCBTC.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.LTCUSDT.bid
  ) {
    console.log(
      'tickers.BTCUSDT.ask * tickers.LTCBTC.ask < tickers.LTCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BTCUSDT.ask * tickers.NEOBTC.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.NEOUSDT.bid
  ) {
    console.log(
      'tickers.BTCUSDT.ask * tickers.NEOBTC.ask < tickers.NEOUSDT.bid'
    );
    counter++;
  }

  if (
    tickers.ETHUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.ETHBTC.bid * tickers.BTCUSDT.bid
  ) {
    console.log(
      'tickers.ETHUSDT.ask < tickers.ETHBTC.bid * tickers.BTCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BNBUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.BNBBTC.bid * tickers.BTCUSDT.bid
  ) {
    console.log(
      'tickers.BNBUSDT.ask < tickers.BNBBTC.bid * tickers.BTCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BCCUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.BCCBTC.bid * tickers.BTCUSDT.bid
  ) {
    console.log(
      'tickers.BNBUSDT.ask < tickers.BNBBTC.bid * tickers.BTCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.LTCUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.LTCBTC.bid * tickers.BTCUSDT.bid
  ) {
    console.log(
      'tickers.LTCUSDT.ask < tickers.LTCBTC.bid * tickers.BTCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.NEOUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.NEOBTC.bid * tickers.BTCUSDT.bid
  ) {
    console.log(
      'tickers.NEOUSDT.ask < tickers.NEOBTC.bid * tickers.BTCUSDT.bid'
    );
    counter++;
  }

  if (
    tickers.ETHUSDT.ask * tickers.BNBETH.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.BNBUSDT.bid
  ) {
    console.log(
      'tickers.ETHUSDT.ask * tickers.BNBETH.ask < tickers.BNBUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.ETHUSDT.ask * tickers.BCCETH.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.BCCUSDT.bid
  ) {
    console.log(
      'tickers.ETHUSDT.ask * tickers.BCCETH.ask < tickers.BCCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.ETHUSDT.ask * tickers.LTCETH.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.LTCUSDT.bid
  ) {
    console.log(
      'tickers.ETHUSDT.ask * tickers.LTCETH.ask < tickers.LTCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.ETHUSDT.ask * tickers.NEOETH.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.NEOUSDT.bid
  ) {
    console.log(
      'tickers.ETHUSDT.ask * tickers.NEOETH.ask < tickers.NEOUSDT.bid'
    );
    counter++;
  }

  if (
    tickers.BNBUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.BNBETH.bid * tickers.ETHUSDT.bid
  ) {
    console.log(
      'tickers.BNBUSDT.ask < tickers.BNBETH.bid * tickers.ETHUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BCCUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.BCCETH.bid * tickers.ETHUSDT.bid
  ) {
    console.log(
      'tickers.BCCUSDT.ask < tickers.BCCETH.bid * tickers.ETHUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.LTCUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.LTCETH.bid * tickers.ETHUSDT.bid
  ) {
    console.log(
      'tickers.LTCUSDT.ask < tickers.LTCETH.bid * tickers.ETHUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.NEOUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.NEOETH.bid * tickers.ETHUSDT.bid
  ) {
    console.log(
      'tickers.NEOUSDT.ask < tickers.NEOETH.bid * tickers.ETHUSDT.bid'
    );
    counter++;
  }

  if (
    tickers.BNBUSDT.ask * tickers.BCCBNB.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.BCCUSDT.bid
  ) {
    console.log(
      'tickers.BNBUSDT.ask * tickers.BCCBNB.ask < tickers.BCCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BNBUSDT.ask * tickers.LTCBNB.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.LTCUSDT.bid
  ) {
    console.log(
      'tickers.BNBUSDT.ask * tickers.LTCBNB.ask < tickers.LTCUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BNBUSDT.ask * tickers.NEOBNB.ask * 1.0005 * 1.0005 <
    0.9995 * tickers.NEOUSDT.bid
  ) {
    console.log(
      'tickers.BNBUSDT.ask * tickers.NEOBNB.ask < tickers.NEOUSDT.bid'
    );
    counter++;
  }

  if (
    tickers.NEOUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.NEOBNB.bid * tickers.BNBUSDT.bid
  ) {
    console.log(
      'tickers.NEOUSDT.ask < tickers.NEOBNB.bid * tickers.BNBUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.BCCUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.BCCBNB.bid * tickers.BNBUSDT.bid
  ) {
    console.log(
      'tickers.BCCUSDT.ask < tickers.BCCBNB.bid * tickers.BNBUSDT.bid'
    );
    counter++;
  }
  if (
    tickers.LTCUSDT.ask * 1.0005 <
    0.9995 * 0.9995 * tickers.LTCBNB.bid * tickers.BNBUSDT.bid
  ) {
    console.log(
      'tickers.LTCUSDT.ask < tickers.LTCBNB.bid * tickers.BNBUSDT.bid'
    );
    counter++;
  }

  if (counter == 0) {
  } else if (counter == 1) {
    console.log(
      'We found',
      counter,
      'route',
      'total 100ms periods where a route existed',
      totalFoundRoutes
    );
  } else {
    console.log(
      'We found',
      counter,
      'routes',
      'total 100ms periods where a route existed',
      totalFoundRoutes
    );
  }

  totalFoundRoutes += counter;
}

module.exports.evaluate = evaluate;
