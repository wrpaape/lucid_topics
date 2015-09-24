'use strict';

var Neuron = function(numInputs, indexLayer, indexNeuron) {
  var neuronColors = [['#C1FA1C', '#1DFD84'], 'aqua', 'fuchsia'];
  if (indexLayer) {
    this.color = neuronColors[indexLayer];
    this.getInitalWeights = function() {
      this.weights = [];
      var weight;
      for (var i = 0; i < numInputs + 1; i++) {
        weight = { value: 2 * Math.random() - 1 };
        this.updateWeightColor(weight);
        this.updateWeightWidth(weight);
        this.weights.push(weight);
      }
      this.bias = this.weights[numInputs].value;
    };
    this.updateWeightColor = function(weight) {
      weight.color = weight.value < 0 ? 'red' : 'green';
    };
    this.updateWeightWidth = function(weight) {
      weight.width = Math.ceil(Math.abs(weight.value) * 10);
    };
    this.updateActivation = function() {
      this.activation = 0;
      for (var i = 0; i < numInputs + 1; i++) {
        this.activation += this.inputs[i] * this.weights[i].value;
      }
    };
    this.updateOutput = function() {
      this.output = Math.pow(1 + Math.pow(Math.E, -this.activation), -1);
    };
    this.processInputs = function(inputs) {
      this.inputs = inputs.concat(-1);
      this.updateActivation();
      this.updateOutput();
    };
    this.updateError = function(diff) {
      this.error = this.output * (1 - this.output) * diff;
    };
    this.updateWeights = function(eta) {
      var weight;
      for (var i = 0; i < this.weights.length; i++) {
        weight = this.weights[i];
        weight.value += eta * this.error * this.inputs[i];
        this.updateWeightColor(weight);
        this.updateWeightWidth(weight);
      }
      this.bias = this.weights[this.weights.length - 1].value;
      var newR = this.r0 + this.bias * 10;
      this.r = newR < 0 ? 1 : newR;
    };
    this.getInitalWeights();
  } else {
    this.color = neuronColors[0][Math.floor(indexNeuron / 2)];
    this.processInputs = function(inputs) {
      this.inputs = inputs;
      this.output = inputs;
    };
  }
};

var NeuralNetwork = function(numInputs, numOutputs) {
  this.eta = 1;
  var layers = [
    {
      type: 'input',
      numNeurons: numInputs,
      neurons: []
    },
    {
      type: 'hidden',
      numNeurons: numInputs + numOutputs - 0,
      neurons: []
    },
    {
      type: 'output',
      numNeurons: numOutputs,
      neurons: []
    }
  ];
  var width = 2000;
  var height = 1000;
  var dXLayer = width / (layers.length + 1);
  var rNeuron = dXLayer / 12;
  var xNeuron = 3 * dXLayer / 4;
  var yNeuron, dYNeuron;
  var numInputsForLayer = 1;
  layers.forEach(function(layer, i) {
    var numNeurons = layer.numNeurons;
    dYNeuron = height / numNeurons;
    yNeuron = dYNeuron / 2;
    for (var j = 0; j < numNeurons; j++) {
      var neuron = new Neuron(numInputsForLayer, i, j);
      neuron.x = xNeuron;
      neuron.y = yNeuron;
      neuron.r0 = rNeuron;
      neuron.r = rNeuron;
      layer.neurons.push(neuron);
      yNeuron += dYNeuron;
    }
    numInputsForLayer = numNeurons;
     xNeuron += dXLayer;
  }.bind(this));
  this.layers = layers;
  this.processLayer = function(layer) {
    layer.outputs = layer.neurons.map(function(neuron, i) {
      neuron.processInputs(layer.inputs[i]);
      return neuron.output;
    });
  };
  this.updateOutputs = function() {
    this.outputs = layers[layers.length - 1].neurons.map(function(neuron) {
      return neuron.activation;
    });
  };
  this.processInputs = function(inputs) {
    this.inputs = inputs;
    var inputLayer = layers[0];
    inputLayer.inputs = inputs;
    this.processLayer(inputLayer);
    for (var i = 1; i < layers.length; i++) {
      var layer = layers[i];
      layer.inputs = [];
      for (var j = 0; j < layer.numNeurons; j++){
        layer.inputs.push(layers[i - 1].outputs);
      }
      this.processLayer(layer);
    }
    this.updateOutputs();
  };
  this.processDiffs = function(diffs) {
    var i = layers.length - 1;
    var outputLayer = layers[i];
    var hiddenLayer = layers[i - 1];
    var neuron, diff;
    for (var j = 0; j < outputLayer.neurons.length; j++) {
      neuron = outputLayer.neurons[j];
      diff = diffs[j];
      neuron.updateError(diff);
      neuron.updateWeights(this.eta);
    }
    for (var m = 0; m < hiddenLayer.neurons.length; m++) {
      diff = 0;
      for (var n = 0; n < outputLayer.neurons.length; n++) {
        neuron = outputLayer.neurons[n];
        diff += neuron.error * neuron.weights[m].value;
      }
      neuron = hiddenLayer.neurons[m];
      neuron.updateError(diff);
      neuron.updateWeights(this.eta);
    }
  };
};
