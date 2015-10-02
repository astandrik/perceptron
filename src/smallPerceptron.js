var vmath= {
    vectorSum : function (v1,v2) {
        var v = v1.slice();
        for(var i = 0; i < v1.length; i++) {
            v[i] += v2[i];
        }
        return v;
    },
    vectorMultiply : function (v1,v2) {
        var v = v1.slice();
        for(var i = 0; i < v1.length; i++) {
            v[i] *= v2[i];
        }
        return v;
    },
    sigma: function (x) {
        return (1/(1+Math.exp(-1 * x)));
    },
    dsigma: function (x) {
        return vmath.sigma(x) * (1 - vmath.sigma(x)); 
    },
    vectorDiff : function (v1,v2) {
        var v = v1.slice();
        for(var i = 0; i < v1.length; i++) {
            v[i] -= v2[i];
        }
        return v;
    }
}

function createArr(size, val) {
    var v = [];
    for(var i = 0; i < size; i++) {
        v.push(val);
    }
    return v;
}

var perceptron = function(inputLength) {
    this.inputLength = inputLength;
    this.w = createArr(inputLength, 1);
    this.summator = function(input) {
        var sum = 0;
        var self = this;
        input.forEach(function(item,i) {
            sum += self.w[i] * item;
        });
        return sum;
    }
    this.activation = vmath.sigma;
    
    this.derivActivation = vmath.dsigma;
    
    this.process = function(input) {
        var sum = this.summator(input);
        return this.activation(sum);
    }
    
    this.trainOnSet = function(set) {
        var errSet = createArr(set.length, 1);
        var i = 0;
        var self = this;
        while(errSet.reduce(function(sum, cur) { 
            return sum += cur * cur;      
        }, 0) > 0.001) {
            if(i++ > 10000) return;
            errSet = [];
            set.forEach(function(item,i) {
                errSet.push(self.trainOnOne(item));
            });
        }
    }
    this.trainOnOne = function(set) {
        var input = set.in;
        var teta = 0.5;
        var i = 1;
        var u = this.summator(this.w);
        var err = this.process(input) - set.out;
        err *= teta;
        e = createArr(this.inputLength, err);
        var deriv = createArr(this.inputLength, this.derivActivation(u));
        this.w = vmath.vectorDiff(this.w, vmath.vectorMultiply (vmath.vectorMultiply(e, deriv), input));
        return this.process(input) - set.out;
    }
    return this;
}