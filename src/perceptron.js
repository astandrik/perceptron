
var neuron = function() {
    this.threshold = 10;
    this.sumNet = function(vector, weights) {
        var sum = 0;
        vector.forEach(function(item, i) {
            sum += item * weights[i];
        });
        return sum;
    }
    this.activeFunctionOut = function(input) {
        if(input > this.threshold) return 1;
        else return 0;
    }
    this.process = function(invector, inweights) {
        var sum = this.sumNet(invector, inweights);
        return this.activeFunctionOut(sum);
    }
    return this;
}


var perceptron = function(neuronsNumber, inVectorLength) {
    this.neurons = [];
    this.distributionMatrix = [];
    while(neuronsNumber-- > 0) {
        this.neurons.push(new neuron());    
        var weights = [];
        while(inVectorLength-- > 0) {
            weights.push(1);
        }
        this.distributionMatrix.push(weights);
    }
    this.process = function(vector) {
        var resVector = [];
        var self = this;
        this.neurons.forEach(function(item, i){
            resVector.push(item.process(vector, self.distributionMatrix[i]));
        });
        return resVector;
    }
    this.modifyWeights = function (input, errors, teta) {
        var self = this;
        errors.forEach(function(error, i) {
            self.distributionMatrix.forEach(function(elem, j) {
                elem.forEach(function(oldWeight, k) {
                    self.distributionMatrix[j][k] = oldWeight + teta * error[0] * input[i][k];
                });
            });
        });   
    }
    return this;
}

function vectorDiff(v1,v2) {
    var result = [];
    v1.forEach(function(item,i) {
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

function checkVVForNull(vVector){
    var sum = 0;
    vVector.forEach(function(item) {
        if(sumVector(item)!=0) {
            return false;
        }
    });
    return true;
}

function train(perceptron, trainingSet) {
    var result = [];
    var trueResult = [];
    var input = [];
    trainingSet.forEach(function(item, i) {
        var output = perceptron.process(item.in);
        input[i] = item.in;
        result[i]  = output;
        trueResult[i] = [item.out];
    });
    var errorVector = [];
    trueResult.forEach(function(item,i) {
        errorVector.push(vectorDiff(item, result[i]));
    });
    var teta = 0.5;
    if(!checkVVForNull(errorVector)) {
        perceptron.modifyWeights(input, errorVector, teta);
        train(perceptron, trainingSet);
    } else {
        return perceptron;
    }
}