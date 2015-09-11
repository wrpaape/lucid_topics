'use strict';

var zeros = function(length) {
 var zeros = [], i = length;
  while (i--) {
    zeros[i] = 0;
  }
  return zeros;
};

var Neuron = function(numInputs, layer) {
  if (layer) {
    this.getInitalWeights = function() {
      this.bias = 1;
      this.weights = [];
      for (var i = 0; i < numInputs; i++) {
        this.weights.push(2 * Math.random() - 1);
      }
    };
    this.updateActivation = function() {
      var a = 0;
      for (var i = 0; i < numInputs; i++) {
        a += this.inputs[i] * this.weights[i];
      }
      this.activation = a - this.bias;
    };
    this.updateOutput = function() {
      var p = 1;
      this.output = Math.pow(1 + Math.pow(Math.E, -this.activation / p), -1);
    };
    this.processInputs = function(inputs) {
      this.inputs = inputs;
      this.updateActivation();
      this.updateOutput();
    };
    this.getInitalWeights();
  } else {
    this.processInputs = function(inputs) {
      this.inputs = inputs;
      this.output = inputs;
    };
  }
};

var NeuralNetwork = function(numInputs, numOutputs) {
  var eta = 1;
  var layers = [
    {
      type: 'input',
      numNeurons: numInputs,
      neurons: []
    },
    {
      type: 'hidden',
      numNeurons: numInputs + numOutputs,
      neurons: []
    },
    {
      type: 'output',
      numNeurons: numOutputs,
      neurons: []
    }
  ];
  var numInputsForLayer = 1;
  layers.forEach(function(layer, j) {
    var numNeurons = layer.numNeurons;
    for (var i = 0; i < numNeurons; i++) {
      var neuron = new Neuron(numInputsForLayer, j);
      layer.neurons.push(neuron);
    }
    numInputsForLayer = numNeurons;
  });
  this.layers = layers;
  this.eta = eta;
  this.processLayer = function(layer) {
    layer.outputs = layer.neurons.map(function(neuron, i) {
      neuron.processInputs(layer.inputs[i]);
      return neuron.output;
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
    this.outputs = layers[layers.length - 1].outputs;
  };
  this.processDiffs = function(diffs) {
    this.diffs = diffs;
    var i = layers.length;
    while (i-- > 1) {
      var neurons = layers[i].neurons;
      for (var j = 0; j < neurons.length; j++) {
        var neuron = neurons[j];
        var output = neuron.output;
        neuron.error = output * (1 - output) * diffs[j];
        for (var k = 0; k < neuron.inputs.length; k++) {
          neuron.weights[k] += eta * neuron.error * neuron.inputs[k];
        }
      }
      diffs = zeros(neurons[0].weights.length);
      for (var m = 0; m < neurons.length; m++) {
        var neuron = neurons[m];
        for (var n = 0; n < neuron.weights.length; n++) {
          diffs[n] += neuron.error * neuron.weights[n];
        }
      }
    }
  };
};
