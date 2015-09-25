describe("LinearCombination", function() {
  it("calculates Linear combination", function() {
     var N = new neuron();
     var a = [1,2,3,4];
     var b = [1,2,3,4];
     var sum = 0;
     for(var i = 0; i < a.length; i++) sum += a[i] * b[i];
     expect(N.sumNet(a,b)).toEqual(sum);
  });
});

describe("Simple One-neuron Perceptron", function() {
  it("Shows that perceptron with single neuron returns sum of input", function() {
     var P = new perceptron(1, 4);
     var b = [1,2,3,4];
     var sum = 0;
     for(var i = 0; i < b.length; i++) sum +=  b[i];
     var result = P.process(b);
     result = result[0];
     expect(result).toEqual((10 > 10) ? 1 : 0);
  });
});


describe("vectorMultiply", function() {
  it("Mult of vectors", function() {
     var a = [1,2,3,4];
     var b = [2,3,5,5];
     expect(vectorMultiply(a,b)).toEqual(1 * 2 + 2*3 + 3*5 + 4 * 5);
  });
});


describe("VectorDiff", function() {
  it("Diff of vectors", function() {
     var a = [1,2,3,4];
     var b = [2,3,5,5];
     expect(vectorDiff(a,b)).toEqual([-1,-1,-2,-1]);
  });
});




describe("VectorSum", function() {
  it("Sum of numbers in vector", function() {
     var a = [1,2,3,4];
     expect(sumVector(a)).toEqual(10);
  });
});


describe("Perceptron", function() {
  it("Try very simple training set", function() {
     var set = [{in: [0,0], out: 0}, {in: [0,1], out: 0}, {in: [1,0], out: 1}, {in: [1,1], out:1}];
     var perc = new perceptron(1,2);
     train(perc, set);
     expect(perc.process([1,1])).toEqual([1]);
  });
});

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function getRandomArbitary(min, max)
{
  return Math.random() * (max - min) + min;
}

describe("Perceptron", function() {
  it("Try simple training set", function() {
     var set = [{in: [1,1,1], out: 1}, {in: [1,1,2], out: 0}, {in: [1,2,1], out: 1}, {in: [1,2,2], out:0},  {in: [2,1,1], out:1}, {in: [2,1,2], out:0}];
     var perc = new perceptron(1,3);
     train(perc, set);
     expect(perc.process([2,1,2])).toEqual([0]);
  });
});

describe("Perceptron", function() {
  it("Try another training set", function() {
    debugger;
     var set = [{"in":[1,1,1,2],"out":[1]},{"in":[1,2,1,1],"out":[1]},{"in":[2,1,1,1],"out":[1]},{"in":[1,2,2,1],"out":[1]},{"in":[1,1,1,2],"out":[1]}];
     var perc = new perceptron(1,4);
     train(perc, set);
     expect(perc.process([1,2,1,1])).toEqual([1]);
  });
});

describe("Perceptron", function() {
  it("Random set self check", function() {
     var set = [];
     var divider = getRandomArbitary(1, 3) >> 0;
     var num;
     var res;
     var trueResults = [];
     var tests = [];
     for(var i = 0; i < 50; i++) {
        num = getRandomArbitary(1, 10) >> 0;
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
     var perc = new perceptron(1,4);
     train(perc, set);
     var results = [];

     for(var j = 0; j < 50; j++) {
        results.push(perc.process(tests[j]));
     }
     expect(results).toEqual(trueResults);
  });
});

describe("Perceptron", function() {
  it("Pure Random check", function() {
     var set = [];
     var divider = getRandomArbitary(1, 3) >> 0;
     var num;
     var res;
     var trueResults = [];
     var tests = [];
     for(var i = 0; i < 100; i++) {
        num = getRandomArbitary(1, 1000) >> 0;
        res = (num % divider) === 0;
        num = dec2bin(num);
        num = num.split('').map(function(item) {return parseInt(item);});
        for(var k = 0; k < num.length; k++) {
          num[k] += 1;
        }
        trueResults.push([+res]);
        set.push({in: num, out: [+res]});
     }
     var perc = new perceptron(1,20);
     train(perc, set);
     var results = [];
     trueResults = [];
     for(var j = 0; j < 10; j++) {
       num = getRandomArbitary(1, 1000) >> 0;
       res = (num % divider) === 0;
       num = dec2bin(num);
       num = num.split('').map(function(item) {return parseInt(item);});
       for(var k = 0; k < num.length; k++) {
         num[k] += 1;
       }
       trueResults.push([+res]);
       results.push(perc.process(num));
     }
     expect(results).toEqual(trueResults);
  });
});
