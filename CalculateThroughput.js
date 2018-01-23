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

function calculateClassARoute(
  tradeOnePrice,
  tradeOneQty,
  tradeOneTicker,
  tradeTwoPrice,
  tradeTwoQty,
  tradeTwoTicker,
  tradeThreePrice,
  tradeThreeQty,
  tradeThreeTicker
) {
  const forwardFee = 0.9995;
  const inverseFee = 1 / 0.9995;

  const tradeOneInverse = 1 / tradeOnePrice;
  const tradeTwoInverse = 1 / tradeTwoPrice;
  const tradeThreeInverse = 1 / tradeThreePrice;

  const tradeOneThroughput =
    tradeOneQty *
    tradeOnePrice *
    tradeTwoInverse *
    tradeThreeInverse *
    forwardFee *
    forwardFee *
    forwardFee;
  const tradeTwoThroughput =
    tradeTwoQty * tradeTwoInverse * forwardFee * tradeThreeInverse * forwardFee;
  const tradeThreeThroughput = tradeThreeQty * tradeThreeInverse * forwardFee;

  switch (findLimit(
    tradeOneThroughput,
    tradeTwoThroughput,
    tradeThreeThroughput
  )) {
    case tradeOneThroughput:
      const tradeOneInput = tradeOneQty;
      if (tradeOneThroughput > tradeOneInput) {
        return createTradeCombination(
          createFirstTrade(tradeOneTicker, tradeOneInput, 'BUY'),
          createTrade(tradeTwoTicker, 'SELL'),
          createTrade(tradeThreeTicker, 'SELL'),
          tradeOneThroughput - tradeOneInput
        );
      } else {
        return null;
      }
      break;
    case tradeTwoThroughput:
      const tradeTwoInput = tradeTwoQty * tradeOneInverse * inverseFee;

      if (tradeTwoThroughput > tradeTwoInput) {
        return createTradeCombination(
          createFirstTrade(tradeOneTicker, tradeTwoInput, 'BUY'),
          createTrade(tradeTwoTicker, 'SELL'),
          createTrade(tradeThreeTicker, 'SELL'),
          tradeTwoThroughput - tradeTwoInput
        );
      } else {
        return null;
      }
      break;
    case tradeThreeThroughput:
      const tradeThreeInput =
        tradeThreeQty *
        tradeOneInverse *
        tradeTwoPrice *
        inverseFee *
        inverseFee;

      if (tradeThreeThroughput > tradeThreeInput) {
        return createTradeCombination(
          createFirstTrade(tradeOneTicker, tradeThreeInput, 'BUY'),
          createTrade(tradeTwoTicker, 'SELL'),
          createTrade(tradeThreeTicker, 'SELL'),
          tradeThreeThroughput - tradeThreeInput
        );
      } else {
        return null;
      }
      break;
    default:
      console.log('How did this happen?');
  }
}

function calculateClassBRoute(
  tradeOnePrice,
  tradeOneQty,
  tradeTwoPrice,
  tradeTwoQty,
  tradeThreePrice,
  tradeThreeQty
) {
  const forwardFee = 0.9995;
  const inverseFee = 1 / 0.9995;

  const tradeOneInverse = 1 / tradeOnePrice;
  const tradeTwoInverse = 1 / tradeTwoPrice;
  const tradeThreeInverse = 1 / tradeThreePrice;

  const tradeOneThroughput =
    tradeOneQty *
    tradeOnePrice *
    tradeTwoPrice *
    tradeThreeInverse *
    forwardFee *
    forwardFee *
    forwardFee;
  const tradeTwoThroughput =
    tradeTwoQty * tradeTwoPrice * forwardFee * tradeThreeInverse * forwardFee;
  const tradeThreeThroughput = tradeThreeQty * tradeThreeInverse * forwardFee;

  switch (findLimit(
    tradeOneThroughput,
    tradeTwoThroughput,
    tradeThreeThroughput
  )) {
    case tradeOneThroughput:
      const tradeOneInput = tradeOneQty;

      if (tradeOneThroughput > tradeOneInput) {
        return createTradeCombination(
          createFirstTrade(tradeOneTicker, tradeOneInput, 'BUY'),
          createTrade(tradeTwoTicker, 'BUY'),
          createTrade(tradeThreeTicker, 'SELL'),
          tradeOneThroughput - tradeOneInput
        );
      } else {
        return null;
      }
      break;
    case tradeTwoThroughput:
      const tradeTwoInput = tradeTwoQty * tradeOneInverse * inverseFee;
      if (tradeTwoThroughput > tradeTwoInput) {
        return createTradeCombination(
          createFirstTrade(tradeOneTicker, tradeTwoInput, 'BUY'),
          createTrade(tradeTwoTicker, 'BUY'),
          createTrade(tradeThreeTicker, 'SELL'),
          tradeTwoThroughput - tradeTwoInput
        );
      } else {
        return null;
      }
      break;
    case tradeThreeThroughput:
      const tradeThreeInput =
        tradeThreeQty *
        tradeOneInverse *
        tradeTwoInverse *
        inverseFee *
        inverseFee;
      if (tradeThreeThroughput > tradeThreeInput) {
        return createTradeCombination(
          createFirstTrade(tradeOneTicker, tradeThreeInput, 'BUY'),
          createTrade(tradeTwoTicker, 'BUY'),
          createTrade(tradeThreeTicker, 'SELL'),
          tradeThreeThroughput - tradeThreeInput
        );
      } else {
        return null;
      }
      break;
    default:
      console.log('How did this happen?');
  }
}

function findLimit(one, two, three) {
  if (one < two) {
    if (one < three) {
      return one;
    }
  } else {
    if (two < three) {
      return two;
    }
  }

  return three;
}

function createFirstTrade(ticker, quantity, direction) {
  return {
    Ticker: ticker,
    qty: quantity,
    Direction: direction
  };
}

function createTrade(ticker, direction) {
  return {
    Ticker: ticker,
    Direction: direction
  };
}

function createTradeCombination(nodeOne, nodeTwo, nodeThree, profitability) {
  return {
    profitability: profitability,
    tradeOne: nodeOne,
    tradeTwo: nodeTwo,
    tradeThree: nodeThree
  };
}

module.exports.classARoute = calculateClassARoute;
module.exports.classBRoute = calculateClassBRoute;
