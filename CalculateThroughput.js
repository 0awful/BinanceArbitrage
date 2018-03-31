// Trade Object
// Trade =  {
//   tradeOne: {
//     Ticker:
//     Quantity:
//     Direction:
//   }
//   tradeTwo: {
//     Ticker:
//     Quantity:
//     Direction:
//   }
//   tradeThree: {
//     Ticker:
//     Quantity:
//     Direction:
//   }
// }

// route = {
//   profitability:
//   tradeOne: {
//     ticker:
//     quantity:
//     direction:
//   }
//   tradeTwo: {
//     ticker:
//     direction:
//   }
//   tradeThree: {
//     ticker:
//     direction:
//   }
// }

// function calculateClassARoute(
//   tradeOnePrice,
//   tradeOneQty,
//   tradeOneTicker,
//   tradeTwoPrice,
//   tradeTwoQty,
//   tradeTwoTicker,
//   tradeThreePrice,
//   tradeThreeQty,
//   tradeThreeTicker
// ) {
//   const forwardFee = 0.9995;
//   const inverseFee = 1 / 0.9995;
//
//   const tradeOneInverse = 1 / tradeOnePrice;
//   const tradeTwoInverse = 1 / tradeTwoPrice;
//   const tradeThreeInverse = 1 / tradeThreePrice;
//
//   const tradeOneThroughput =
//     tradeOneQty * tradeTwoPrice * tradeThreePrice * forwardFee * forwardFee;
//   const tradeTwoThroughput =
//     tradeTwhoQty *
//     tradeTwoInverse *
//     tradeThreeInverse *
//     forwardFee *
//     forwardFee;
//   const tradeThreeThroughput = tradeThreeQty * tradeThreeInverse * forwardFee;
//
//   let tradeOneQtyFinal;
//   switch (findMin(
//     tradeOneThroughput,
//     tradeTwoThroughput,
//     tradeThreeThroughput
//   )) {
//     case tradeOneThroughput:
//       tradeOneQtyFinal = tradeOneQty;
//
//       if (tradeOneThroughput > tradeOneQtyFinal) {
//         let tradeTwoQtyFinal = tradeOneQtyFinal * tradeOnePrice * forwardFee;
//         let tradeThreeQtyFinal =
//           tradeOneQtyFinal *
//           tradeOnePrice *
//           tradeTwoInverse *
//           forwardFee *
//           forwardFee;
//         let profit = tradeOneThroughput - tradeOneQtyFinal;
//         console.log('ROUTE ONE');
//         return createTradeCombination(
//           createTrade(tradeOneTicker, tradeOneQtyFinal, 'BUY'),
//           createTrade(tradeTwoTicker, tradeTwoQtyFinal, 'SELL'),
//           createTrade(tradeThreeTicker, tradeThreeQtyFinal, 'SELL'),
//           profit
//         );
//       } else {
//         return null;
//       }
//       break;
//     case tradeTwoThroughput:
//       tradeOneQtyFinal = tradeTwoQty * tradeOneInverse * inverseFee;
//
//       if (tradeTwoThroughput > tradeOneQtyFinal) {
//         let tradeTwoQtyFinal = tradeTwoQty;
//         let tradeThreeQtyFinal = tradeTwoQty * tradeTwoInverse * forwardFee;
//         let profit = tradeTwoThroughput - tradeOneQtyFinal;
//         console.log('ROUTE TWO');
//         return createTradeCombination(
//           createTrade(tradeOneTicker, tradeOneQtyFinal, 'BUY'),
//           createTrade(tradeTwoTicker, tradeTwoQtyFinal, 'SELL'),
//           createTrade(tradeThreeTicker, tradeThreeQtyFinal, 'SELL'),
//           profit
//         );
//       } else {
//         return null;
//       }
//       break;
//     case tradeThreeThroughput:
//       tradeOneQtyFinal =
//         tradeThreeQty *
//         tradeOneInverse *
//         tradeTwoPrice *
//         inverseFee *
//         inverseFee;
//
//       if (tradeThreeThroughput > tradeOneQtyFinal) {
//         let tradeTwoQtyFinal = tradeThreeQty * tradeTwoPrice * inverseFee;
//         let tradeThreeQtyFinal = tradeThreeQty;
//         let profit = tradeThreeThroughput - tradeOneQtyFinal;
//         console.log('ROUTE THREE');
//         return createTradeCombination(
//           createTrade(tradeOneTicker, tradeOneQtyFinal, 'BUY'),
//           createTrade(tradeTwoTicker, tradeTwoQtyFinal, 'SELL'),
//           createTrade(tradeThreeTicker, tradeThreeQtyFinal, 'SELL'),
//           profit
//         );
//       } else {
//         return null;
//       }
//       break;
//     default:
//       console.log('How did this happen?');
//   }
// }

// dataObject = {
//   tickerOne: {
//     priceAsk:
//     priceBid:
//     qtyAsk:
//     qtyBid:
//     ticker:
//     direction:
//   },
//   tickerTwo: {
//     priceAsk:
//     priceBid:
//     qtyAsk:
//     qtyBid:
//     ticker:
//     direction:
//   },
//   tickerThree: {
//     priceAsk:
//     priceBid:
//     qtyAsk:
//     qtyBid:
//     ticker:
//     direction:
//   }
// }

// balancesObject = {
//   BTC:
//   LTC:
//   ETH:
// }

function calculateTickerThroughput(dataObject, position) {
  const fee = 0.9995;
  const inverseFee = 1 / fee;

  switch (position) {
    case 1:
      const tickerOneInitialPriceBTC =
        dataObject.tickerOne.priceAsk *
        dataObject.tickerOne.qtyAsk *
        inverseFee;
      const tickerOneTradeOneQty = dataObject.tickerOne.qtyAsk;
      const tickerOneTradeTwoQty = tickerOneTradeOneQty * fee;
      const tickerOneTradeThreeQty =
        tickerOneTradeTwoQty * dataObject.tickerTwo.priceBid * fee;
      const tickerOneFinalValueBTC =
        tickerOneTradeThreeQty * dataObject.tickerThree.priceBid * fee;
      return createTradeCombination(
        createTrade(
          dataObject.tickerOne.ticker,
          tickerOneTradeOneQty,
          dataObject.tickerOne.direction
        ),
        createTrade(
          dataObject.tickerTwo.ticker,
          tickerOneTradeTwoQty,
          dataObject.tickerTwo.direction
        ),
        createTrade(
          dataObject.tickerThree.ticker,
          tickerOneTradeThreeQty,
          dataObject.tickerThree.direction
        ),
        tickerOneFinalValueBTC - tickerOneInitialPriceBTC,
        tickerOneInitialPriceBTC,
        tickerOneFinalValueBTC
      );
      break;
    case 2:
      const tickerTwoTradeOneQty = dataObject.tickerTwo.qtyBid * inverseFee;
      const tickerTwoTradeTwoQty = dataObject.tickerTwo.qtyBid;
      const tickerTwoInitialPriceBTC =
        dataObject.tickerOne.priceAsk * tickerTwoTradeOneQty * inverseFee;

      const tickerTwoTradeThreeQty =
        tickerTwoTradeTwoQty * dataObject.tickerTwo.priceBid * fee;
      const tickerTwoFinalValueBTC =
        tickerTwoTradeThreeQty * dataObject.tickerThree.priceBid * fee;
      return createTradeCombination(
        createTrade(
          dataObject.tickerOne.ticker,
          tickerTwoTradeOneQty,
          dataObject.tickerOne.direction
        ),
        createTrade(
          dataObject.tickerTwo.ticker,
          tickerTwoTradeTwoQty,
          dataObject.tickerTwo.direction
        ),
        createTrade(
          dataObject.tickerThree.ticker,
          tickerTwoTradeThreeQty,
          dataObject.tickerThree.direction
        ),
        tickerTwoFinalValueBTC - tickerTwoInitialPriceBTC,
        tickerTwoInitialPriceBTC,
        tickerTwoFinalValueBTC
      );
      break;
    case 3:
      const tickerThreeTradeOneQty =
        dataObject.tickerThree.qtyBid /
        dataObject.tickerTwo.priceBid *
        inverseFee *
        inverseFee;
      const tickerThreeInitialPriceBTC =
        dataObject.tickerOne.priceAsk * tickerThreeTradeOneQty * inverseFee;

      const tickerThreeTradeTwoQty =
        dataObject.tickerThree.qtyBid /
        dataObject.tickerTwo.priceBid *
        inverseFee;
      const tickerThreeTradeThreeQty = dataObject.tickerThree.qtyBid;
      const tickerThreeFinalValueBTC =
        tickerThreeTradeThreeQty * dataObject.tickerThree.priceBid * fee;

      return createTradeCombination(
        createTrade(
          dataObject.tickerOne.ticker,
          tickerThreeTradeOneQty,
          dataObject.tickerOne.direction
        ),
        createTrade(
          dataObject.tickerTwo.ticker,
          tickerThreeTradeTwoQty,
          dataObject.tickerTwo.direction
        ),
        createTrade(
          dataObject.tickerThree.ticker,
          tickerThreeTradeThreeQty,
          dataObject.tickerThree.direction
        ),
        tickerThreeFinalValueBTC - tickerThreeInitialPriceBTC,
        tickerThreeInitialPriceBTC,
        tickerThreeFinalValueBTC
      );
      break;
    default:
      console.log('improper ticker call');
      break;
  }
}

function calculateThroughput(dataObject, balancesObject) {
  const limitOne = calculateTickerThroughput(dataObject, 1);
  const limitTwo = calculateTickerThroughput(dataObject, 2);
  const limitThree = calculateTickerThroughput(dataObject, 3);

  switch (findMax(
    limitOne.profitability,
    limitTwo.profitability,
    limitThree.profitability
  )) {
    case limitOne.profitability:
      return limitOne;
      break;
    case limitTwo.profitability:
      return limitTwo;
      break;
    case limitThree.profitability:
      return limitThree;
      break;
    default:
      console.error('error in the findMin Switch');
      break;
  }
}

function findMin(one, two, three) {
  if (one < two) {
    if (one < three) {
      return one;
    }
  } else {
    if (two < three) {
      return two;
    }
  }

  //pretty sure I can just do it this way, checking for bugs
  return three;
}

function findMax(one, two, three) {
  if (one > two) {
    if (one > three) {
      return one;
    }
  } else {
    if (two > three) {
      return two;
    }
  }

  //pretty sure I can just do it this way, checking for bugs
  return three;
}

function createTrade(ticker, quantity, direction) {
  return {
    ticker: ticker,
    qty: quantity,
    direction: direction
  };
}

function createTradeCombination(
  nodeOne,
  nodeTwo,
  nodeThree,
  profitability,
  input,
  output
) {
  return {
    input: input,
    output: output,
    profitability: profitability,
    tradeOne: nodeOne,
    tradeTwo: nodeTwo,
    tradeThree: nodeThree
  };
}

module.exports.calculateThroughput = calculateThroughput;
// module.exports.classBRoute = calculateClassBRoute;
