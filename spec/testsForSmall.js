describe("Perceptron", function() {
  it("Try very simple training set", function() {
      var set = [{in: [1,1], out: 0}, {in: [1,2], out: 0}, {in: [2,1], out: 1}];
     var perc = new perceptron(2);
     perc.trainOnSet(set);
     expect(perc.process([2,2])).toEqual(1);
  });
});

describe("Perceptron", function() {
  it("Try simple training set", function() {
      debugger;
     var set = [{in: [0,0,0], out: 1}, {in: [0,0,1], out: 0}, {in: [0,1,0], out: 1}, {in: [0,1,1], out:0},  {in: [1,0,0], out:1}, {in: [1,0,1], out:0}];
     var perc = new perceptron(3);
     perc.trainOnSet(set);
     expect(perc.process([1,0,1])).toEqual(0);
  });
});