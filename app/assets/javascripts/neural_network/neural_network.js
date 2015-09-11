'use strict';

var Neuron = function(numInputs) {
  // var rateCrossOver = 0.7;
  // var rateMutation = 0.1;
  var c = 0.001;
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
    var p = 1.0;
    this.output = Math.pow(1 + Math.pow(Math.E, -this.activation / p), -1);
  };
  this.processInputs = function(inputs) {
    this.inputs = inputs;
    this.updateActivation();
    this.updateOutput();
  };

  this.getInitalWeights();
};

var NeuralNetwork = function(numInputs, dimInput) {
  var layers = [
    {
      type: 'input',
      numNeurons: numInputs,
      neurons: []
    },
    {
      type: 'hidden',
      numNeurons: 3,
      neurons: []
    },
    {
      type: 'output',
      numNeurons: dimInput,
      neurons: []
    }
  ];
  // var weights = [];
  layers.forEach(function(layer, j) {
    var numNeurons = layer.numNeurons;
    for (var i = 0; i < numNeurons; i++) {
      var neuron = new Neuron(dimInput);
      layer.neurons.push(neuron);
      // if (j) {
      //   weights.push.apply(weights, neuron.weights);
      // }
    }
    dimInput = numNeurons;
  });
  this.layers = layers;
  // this.weights = weights;
  this.processLayer = function(layer) {
    layer.outputs = layer.neurons.map(function(neuron, i) {
      neuron.processInputs(layer.inputs[i]);
      return neuron.output;
    });
  };
  this.updateWeights = function() {
    var i = layers.length;
    var outputsDesired = this.inputs[i - 1];
    while (i-- > 1) {
      layers[i].neurons.forEach(function(neuron) {

      });
    }
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
    this.updateWeights();
  };

  // this.encodeGenome = function() {
  //   this.layers.forEach(function(layer) {

  //   });
  // };
};
