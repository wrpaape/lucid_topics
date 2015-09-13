'use strict';

var Neuron = function(numInputs, indexLayer, indexNeuron) {
  var neuronColors = [['#1DFD84', '#C1FA1C'], 'aqua', 'fuchsia'];
  if (indexLayer) {
    this.color = neuronColors[indexLayer];
    this.getInitalWeights = function() {
      this.weights = [];
      for (var i = 0; i < numInputs + 1; i++) {
        this.weights.push(2 * Math.random() - 1);
      }
      this.bias = this.weights[numInputs];
    };
    this.updateActivation = function() {
      this.activation = 0;
      for (var i = 0; i < numInputs + 1; i++) {
        this.activation += this.inputs[i] * this.weights[i];
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
      for (var i = 0; i < this.weights.length; i++) {
        this.weights[i] += eta * this.error * this.inputs[i];
      }
      this.bias = this.weights[this.weights.length - 1];
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
      neuron.r = rNeuron;
      layer.neurons.push(neuron);
      yNeuron += dYNeuron;
    }
    numInputsForLayer = numNeurons;
     xNeuron += dXLayer;
  });
  this.layers = layers;
  this.eta = 1;
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
        diff += neuron.error * neuron.weights[m];
      }
      neuron = hiddenLayer.neurons[m];
      neuron.updateError(diff);
      neuron.updateWeights(this.eta);
    }
  };
};
