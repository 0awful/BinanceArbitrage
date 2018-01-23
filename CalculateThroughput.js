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
    tradeTwoQty * tradeTwoInverse * tradeThreeInverse * forwardFee * forwardFee;
  const tradeThreeThroughput = tradeThreeQty * tradeThreeInverse * forwardFee;

  let tradeOneQtyFinal;
  switch (findMin(
    tradeOneThroughput,
    tradeTwoThroughput,
    tradeThreeThroughput
  )) {
    case tradeOneThroughput:
      tradeOneQtyFinal = tradeOneQty;

      if (tradeOneThroughput > tradeOneQtyFinal) {
        let tradeTwoQtyFinal = tradeOneQtyFinal * tradeOnePrice * forwardFee;
        let tradeThreeQtyFinal =
          tradeOneQtyFinal *
          tradeOnePrice *
          tradeTwoInverse *
          forwardFee *
          forwardFee;
        let profit = tradeOneThroughput - tradeOneQtyFinal;

        return createTradeCombination(
          createTrade(tradeOneTicker, tradeOneQtyFinal, 'BUY'),
          createTrade(tradeTwoTicker, tradeTwoQtyFinal, 'SELL'),
          createTrade(tradeThreeTicker, tradeThreeQtyFinal, 'SELL'),
          profit
        );
      } else {
        return null;
      }
      break;
    case tradeTwoThroughput:
      tradeOneQtyFinal = tradeTwoQty * tradeOneInverse * inverseFee;

      if (tradeTwoThroughput > tradeOneQtyFinal) {
        let tradeTwoQtyFinal = tradeTwoQty;
        let tradeThreeQtyFinal = tradeTwoQty * tradeTwoInverse * forwardFee;
        let profit = tradeTwoThroughput - tradeOneQtyFinal;

        return createTradeCombination(
          createTrade(tradeOneTicker, tradeOneQtyFinal, 'BUY'),
          createTrade(tradeTwoTicker, tradeTwoQtyFinal, 'SELL'),
          createTrade(tradeThreeTicker, tradeThreeQtyFinal, 'SELL'),
          profit
        );
      } else {
        return null;
      }
      break;
    case tradeThreeThroughput:
      tradeOneQtyFinal =
        tradeThreeQty *
        tradeOneInverse *
        tradeTwoPrice *
        inverseFee *
        inverseFee;

      if (tradeThreeThroughput > tradeOneQtyFinal) {
        let tradeTwoQtyFinal = tradeThreeQty * tradeTwoPrice * inverseFee;
        let tradeThreeQtyFinal = tradeThreeQty;
        let profit = tradeThreeThroughput - tradeOneQtyFinal;

        return createTradeCombination(
          createTrade(tradeOneTicker, tradeOneQtyFinal, 'BUY'),
          createTrade(tradeTwoTicker, tradeTwoQtyFinal, 'SELL'),
          createTrade(tradeThreeTicker, tradeThreeQtyFinal, 'SELL'),
          profit
        );
      } else {
        return null;
      }
      break;
    default:
      console.log('How did this happen?');
  }
}

// function calculateClassBRoute(
//   tradeOnePrice,
//   tradeOneQty,
//   tradeTwoPrice,
//   tradeTwoQty,
//   tradeThreePrice,
//   tradeThreeQty
// ) {
//   const forwardFee = 0.9995;
//   const inverseFee = 1 / 0.9995;
//
//   const tradeOneInverse = 1 / tradeOnePrice;
//   const tradeTwoInverse = 1 / tradeTwoPrice;
//   const tradeThreeInverse = 1 / tradeThreePrice;
//
//   const tradeOneThroughput =
//     tradeOneQty *
//     tradeOnePrice *
//     tradeTwoPrice *
//     tradeThreeInverse *
//     forwardFee *
//     forwardFee *
//     forwardFee;
//   const tradeTwoThroughput =
//     tradeTwoQty * tradeTwoPrice * forwardFee * tradeThreeInverse * forwardFee;
//   const tradeThreeThroughput = tradeThreeQty * tradeThreeInverse * forwardFee;
//
//   switch (findLimit(
//     tradeOneThroughput,
//     tradeTwoThroughput,
//     tradeThreeThroughput
//   )) {
//     case tradeOneThroughput:
//       const tradeOneInput = tradeOneQty;
//
//       if (tradeOneThroughput > tradeOneInput) {
//         return createTradeCombination(
//           createFirstTrade(tradeOneTicker, tradeOneInput, 'BUY'),
//           createTrade(tradeTwoTicker, 'BUY'),
//           createTrade(tradeThreeTicker, 'SELL'),
//           tradeOneThroughput - tradeOneInput
//         );
//       } else {
//         return null;
//       }
//       break;
//     case tradeTwoThroughput:
//       const tradeTwoInput = tradeTwoQty * tradeOneInverse * inverseFee;
//       if (tradeTwoThroughput > tradeTwoInput) {
//         return createTradeCombination(
//           createFirstTrade(tradeOneTicker, tradeTwoInput, 'BUY'),
//           createTrade(tradeTwoTicker, 'BUY'),
//           createTrade(tradeThreeTicker, 'SELL'),
//           tradeTwoThroughput - tradeTwoInput
//         );
//       } else {
//         return null;
//       }
//       break;
//     case tradeThreeThroughput:
//       const tradeThreeInput =
//         tradeThreeQty *
//         tradeOneInverse *
//         tradeTwoInverse *
//         inverseFee *
//         inverseFee;
//       if (tradeThreeThroughput > tradeThreeInput) {
//         return createTradeCombination(
//           createFirstTrade(tradeOneTicker, tradeThreeInput, 'BUY'),
//           createTrade(tradeTwoTicker, 'BUY'),
//           createTrade(tradeThreeTicker, 'SELL'),
//           tradeThreeThroughput - tradeThreeInput
//         );
//       } else {
//         return null;
//       }
//       break;
//     default:
//       console.log('How did this happen?');
//   }
// }

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

  return three;
}

function createTrade(ticker, quantity, direction) {
  return {
    ticker: ticker,
    qty: quantity,
    direction: direction
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
// module.exports.classBRoute = calculateClassBRoute;
