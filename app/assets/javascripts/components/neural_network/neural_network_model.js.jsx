/* globals React */
'use strict';

var NeuralNetworkModel = React.createClass({
  componentDidUpdate: function() {
    var brain = this.props.brain;
    var layers = brain.layers;
    var planeColor = this.props.planeColor;
    var drawBall = this.props.drawBall;
    var canvas = document.getElementById('neural-network-model');
    var ctx = canvas.getContext('2d');
    var dXLayer = layers[1].neurons[0].x - layers[0].neurons[0].x;
    var rNeuron = dXLayer / 12;
    var drawSynapse = this.drawSynapse;
    var drawArrow = this.drawArrow;
    var drawSymbolTag = this.drawSymbolTag;
    var neurons, neuron, x1, y1, x2, y2, weight;
    var draw = function() {
      for (var i = 0; i < layers.length; i++) {
        var neurons = layers[i].neurons;
        for (var j = 0; j < neurons.length; j++) {
          neuron = neurons[j];
          x1 = neuron.x;
          y1 = neuron.y;
          if (layers[i + 1]) {
            var nextNeurons = layers[i + 1].neurons;
            for (var k = 0; k < nextNeurons.length; k++) {
              x2 = nextNeurons[k].x;
              y2 = nextNeurons[k].y;
              weight = nextNeurons[k].weights[j];
              drawSynapse(ctx, x1, y1, x2, y2, weight);
            }
          }
          drawBall(ctx, x1, y1, neuron.r, neuron.color);
        }
      }
      var inputSymbols = ['v', '⍺', 'ρ', 'θ'];
      var inputNeurons = layers[0].neurons;
      for (var m = 0; m < inputNeurons.length; m++) {
        neuron = inputNeurons[m];
        x2 = neuron.x - neuron.r;
        y2 = neuron.y;
        x1 = x2 - dXLayer / 3;
        y1 = y2;
        drawArrow(ctx, x1, y1, x2, y2, neuron.color);
        drawSymbolTag(ctx, x1, y1, inputSymbols[m], neuron.color, true);
      }
      var outputSymbols = ['Tₓ', 'φₓ'];
      var outputNeurons = layers[layers.length - 1].neurons;
      for (var n = 0; n < outputNeurons.length; n++) {
        neuron = outputNeurons[n];
        x1 = neuron.x;
        y1 = neuron.y;
        x2 = x1 + dXLayer / 3;
        y2 = y1;
        drawArrow(ctx, x1, y1, x2, y2, neuron.color);
        drawSymbolTag(ctx, x2, y2, outputSymbols[n], neuron.color);
      }
      var xBall = x1 + 3 * dXLayer / 4;
      var yBall = canvas.height / 2;
      var rBall = 3 * rNeuron / 2;
      drawBall(ctx, xBall, yBall, rBall, 'lime');
      drawSymbolTag(ctx, x2, yBall - rBall, 'Tₒ', 'lime');
      drawSymbolTag(ctx, x2, yBall + rBall, 'φₒ', 'lime');
    };

    window.requestAnimationFrame(draw);
  },
  drawSynapse: function(ctx, x1, y1, x2, y2, weight) {
    var color = weight > 0 ? 'green' : 'red';
    var lineWidth = Math.abs(weight) * 10;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  },
  drawArrow: function(ctx, x1, y1, x2, y2, color) {
    var le = (x2 - x1) / 10;
    var delta = Math.PI / 6;
    var lex = x2 - le * Math.cos(delta);
    var ley1 = y2 + le * Math.sin(delta);
    var ley2 = y2 - le * Math.sin(delta);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.lineTo(lex, ley1);
    ctx.stroke();
    ctx.moveTo(x2, y2);
    ctx.lineTo(lex, ley2);
    ctx.stroke();
    ctx.restore();
  },
  drawSymbolTag: function(ctx, xTip, yTip, symbol, color, before) {
    var fontSize = 72;
    var dX = fontSize;
    var x = before ? xTip - dX: xTip + dX / 2;
    var y = yTip + fontSize / 4;
    ctx.save();
    ctx.font = fontSize + 'px monaco, Consolas, "Lucida Console", monospace';
    ctx.fillStyle = color;
    ctx.fillText(symbol, x, y);
    ctx.restore();
  },
  render: function() {
    return(
      <div>
        <canvas id='neural-network-model' width='2000' height='1000' />
      </div>
    );
  }
});
