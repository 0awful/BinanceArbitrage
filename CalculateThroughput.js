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

  let successful = false;

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
      console.log(
        'Best Route, trade one',
        'throughput',
        tradeOneThroughput,
        'input',
        tradeOneInput
      );
      successful = tradeOneThroughput > tradeOneInput;
      break;
    case tradeTwoThroughput:
      const tradeTwoInput = tradeTwoQty * tradeOneInverse * inverseFee;
      console.log(
        'Best Route, trade two',
        'throughput',
        tradeTwoThroughput,
        'input',
        tradeTwoInput
      );
      successful = tradeTwoThroughput > tradeTwoInput;
      break;
    case tradeThreeThroughput:
      const tradeThreeInput =
        tradeThreeQty *
        tradeOneInverse *
        tradeTwoPrice *
        inverseFee *
        inverseFee;
      console.log(
        'Best Route, trade two',
        'throughput',
        tradeThreeThroughput,
        'input',
        tradeThreeInput
      );
      successful = tradeThreeThroughput > tradeThreeInput;
      break;
    default:
      console.log('How did this happen?');
  }

  if (successful) {
    console.log('this would be profitable');
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
      console.log(
        'Best Route, trade one',
        'throughput',
        tradeOneThroughput,
        'input',
        tradeOneInput
      );
      if (tradeOneThroughput > tradeOneInput) {
        console.log('This would be profitable');
      }
      break;
    case tradeTwoThroughput:
      const tradeTwoInput = tradeTwoQty * tradeOneInverse * inverseFee;
      console.log(
        'Best Route, trade two',
        'throughput',
        tradeTwoThroughput,
        'input',
        tradeTwoInput
      );
      if (tradeTwoThroughput > tradeTwoInput) {
        console.log('This would be profitable');
      }
      break;
    case tradeThreeThroughput:
      const tradeThreeInput =
        tradeThreeQty *
        tradeOneInverse *
        tradeTwoInverse *
        inverseFee *
        inverseFee;
      console.log(
        'Best Route, trade two',
        'throughput',
        tradeThreeThroughput,
        'input',
        tradeThreeInput
      );
      if (tradeThreeThroughput > tradeThreeInput) {
        console.log('This would be profitable');
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

function createTrade(ticker, quantity, direction) {
  return {
    Ticker: ticker,
    Quantity: quantity,
    Direction: direction
  };
}

function createTradeCombination(nodeOne, nodeTwo, nodeThree) {
  return {
    tradeOne: nodeOne,
    tradeTwo: nodeTwo,
    tradeThree: nodeThree
  };
}

module.exports.classARoute = calculateClassARoute;
module.exports.classBRoute = calculateClassBRoute;
