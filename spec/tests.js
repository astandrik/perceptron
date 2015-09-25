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

describe("Perceptron", function() {
  it("Try simple training set", function() {
      debugger;
     var set = [{in: [0,0,0], out: 1}, {in: [0,0,1], out: 0}, {in: [0,1,0], out: 1}, {in: [0,1,1], out:0},  {in: [1,0,0], out:1}, {in: [1,0,1], out:0}];
     var perc = new perceptron(1,3);
     train(perc, set);
     expect(perc.process([1,0,1])).toEqual([0]);
  });
});