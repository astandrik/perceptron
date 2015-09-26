
function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function getRandomArbitary(min, max)
{
  return Math.random() * (max - min) + min;
}

function comparator(result, expected) {
  var flag = true;
  var self = this;
  result.forEach(function(item,i) {
    if((expected[i] - item) * (expected[i] - item) > 0.01) {
      flag = false;
    }
  });
  return flag;
}

describe("Perceptron", function() {
  it("Random set self check", function() {

     var set = [];
     var divider = 2;
     var num;
     var res;
     var trueResults = [];
     var tests = [];
     var numTests = 50;
     for(var i = 0; i < numTests; i++) {
        num = getRandomArbitary(1, 100) >> 0;
        res = (num % divider) === 0;
        num = dec2bin(num);
        num = num.split('').map(function(item) {return parseInt(item);});
        for(var k = 0; k < num.length; k++) {
          num[k] += 1;
        }
        trueResults.push([+res]);
        tests.push(num);
        set.push({in: num, out: [+res]});
     }
     var perc = new perceptron(1,10);
     train(perc, set);
     var results = [];

     for(var j = 0; j < numTests; j++) {
        results.push(perc.process(tests[j]));
     }
     console.log(results);
     console.log(trueResults);
     expect(comparator(results, trueResults)).toEqual(true);
  });
});
