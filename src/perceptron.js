function sigma(x) {
  return (1/(1+Math.exp(-1 * x)));
}


var neuron = function(vector) {
  this.distributionVector = vector;
  this.sumNet = function(vector) {
    var sum = 0;
    var self = this;
    if(!vector) {
      debugger;
    }
    vector.forEach(function(item, i) {
      sum += item * (self.distributionVector)[i];
    });
    return sum;
  };
  this.activeFunctionOut = function(input) {
    return sigma(input);
  };
  this.activeDerivative = function(input) {
    return (sigma(input)*(1 - sigma(input)));
  };
  this.process = function(invector, inweights) {
    var sum = this.sumNet(invector, inweights);
    return this.activeFunctionOut(sum);
  };
  return this;
};

var perceptron = function(neuronsNumber, inVectorLength) {
  this.neurons = [];
  this.counter = 0;
  this.inVectorLength = inVectorLength;
  while (neuronsNumber-- > 0) {
    var weights = [];
    while (inVectorLength-- > 0) {
      weights.push(1);
    }
    this.neurons.push(new neuron(weights));
  }
  this.process = function(vector) {
    var resVector = [];
    var self = this;
    this.neurons.forEach(function(item, i) {
      resVector.push(item.process(vector));
    });
    return resVector;
  };
  this.modifyWeights = function(input, errors, teta) {
    var self = this;
    errors.forEach(function(err, i) {
      self.neurons.forEach(function(neuron, j) {
        var e = err[0];
        var sum = neuron.sumNet(input[i]);
        var derivative = neuron.activeDerivative(sum);
        var errFunc = e * derivative;
        neuron.distributionVector.forEach(function(weight, k) {
          neuron.distributionVector[k] = weight + teta * errFunc * input[i][k];
        });
      });
    });
  };
  return this;
};

function vectorDiff(v1, v2) {
  var result = [];
  v1.forEach(function(item, i) {
    result[i] = v1[i] - v2[i];
  });
  return result;
}

function sumVector(vector) {
  sum = 0;
  vector.forEach(function(item) {
    sum += item;
  });
  return sum;
}

function sumVectorOfVector(vVector) {
  var sum = 0;
  vVector.forEach(function(item) {
    sum += sumVector(item);
  });
  return sum;
}

function vectorNumberMultiply(vector, number) {
  var res = vector.map(function(item) { return item * number; });
  return res;
}

function vectorMultiply(v1, v2) {
  var res = 0;
  v1.forEach(function(item, i) {
    res += item  * v2[i];
  });
  return res;
}

<<<<<<< HEAD
function checkVVForNull(vVector){
    var sum = 0;
    vVector.forEach(function(item) {
        if(sumVector(item)!= 0) {
            return false;
        }
    });
    return true;
=======
function checkVVErrFunc(vVector) {
  var sum = 0;
  var flag = true;
  vVector.forEach(function(item) {
      sum += sumVector(item) * sumVector(item);
  });
  return sum;
>>>>>>> 52ba052b822acbdcf0e57cc153709aef99c65577
}


function train(perceptron, trainingSet) {
  trainingSet.forEach(function(set) {
    while (set.in.length < perceptron.inVectorLength) {
      set.in.unshift(1);
    }
  });
  while(1) {
    var result = [];
    var trueResult = [];
    var input = [];
    perceptron.counter++;
    if(perceptron.counter > 5000) {
      return perceptron;
    }
    trainingSet.forEach(function(item, i) {
      var output = perceptron.process(item.in);
      input[i] = item.in;
      result[i]  = output;
      trueResult[i] = [item.out];
    });
    var errorVector = [];
    trueResult.forEach(function(item, i) {
      errorVector.push(vectorDiff(item, result[i]));
    });
    var teta = 0.5;
    if (checkVVErrFunc(errorVector) > 0.0001) {
      perceptron.modifyWeights(input, errorVector, teta);
    } else {
      return perceptron;
    }
  }
}
