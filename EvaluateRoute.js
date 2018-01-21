// Here we check if a route is profitable.

let counter = 0;

function evaluate(buyside, sellside) {
  if (sellside > buyside) {
    counter++;
    return true;
    console.log('We have found', counter, 'routes');
  } else {
    return false;
  }
}

module.exports.evaluate = evaluate;
