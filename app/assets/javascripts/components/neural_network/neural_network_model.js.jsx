/* globals React */
'use strict';

var NeuralNetworkModel = React.createClass({
  componentDidUpdate: function() {
    var brain = this.props.brain;
    var coords = this.props.neuronCoords;
    var drawBall = this.props.drawBall;
    var canvas = document.getElementById('neural-network-model');
    var ctx = canvas.getContext('2d');
    var dXLayer = coords[1][0][0] - coords[0][0][0];
    var rNeuron = dXLayer / 12;
    var xy1, xy2;
    for (var i = 0; i < coords.length; i++) {

      for (var j = 0; j < coords[i].length; j++) {
        xy1 = coords[i][j];
        if (coords[i + 1]) {
          for (var k = 0; k < coords[i + 1].length; k++) {
            xy2 = coords[i + 1][k];
            this.drawLine(ctx, xy1, xy2, 'white', 1);
          }
        }
        drawBall(ctx, xy1[0], xy1[1], rNeuron, 'orange');
      }
    }
    var inputLayer = coords[0];
    for (var m = 0; m < inputLayer.length; m++) {
      xy2 = [inputLayer[m][0] - rNeuron, inputLayer[m][1]];
      xy1 = [xy2[0] - dXLayer / 3, xy2[1]];
      this.drawArrow(ctx, xy1, xy2, 'purple');
    }

    var outputLayer = coords[coords.length - 1];
    for (var n = 0; n < outputLayer.length; n++) {
      xy1 = [outputLayer[n][0] + rNeuron, outputLayer[n][1]];
      xy2 = [xy1[0] + dXLayer / 3, xy1[1]];
      this.drawArrow(ctx, xy1, xy2, 'magenta');
    }

  },
  drawLine: function(ctx, xy1, xy2, color, lineWidth) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(xy1[0], xy1[1]);
    ctx.lineTo(xy2[0], xy2[1]);
    ctx.stroke();
    ctx.restore();
  },
  drawArrow: function(ctx, xy1, xy2, color) {
    var le = (xy2[0] - xy1[0]) / 10;
    var delta = Math.PI / 6;
    var lex = xy2[0] - le * Math.cos(delta);
    var ley1 = xy2[1] + le * Math.sin(delta);
    var ley2 = xy2[1] - le * Math.sin(delta);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(xy1[0], xy1[1]);
    ctx.lineTo(xy2[0], xy2[1]);
    ctx.stroke();
    ctx.lineTo(lex, ley1);
    ctx.stroke();
    ctx.moveTo(xy2[0], xy2[1]);
    ctx.lineTo(lex, ley2);
    ctx.stroke();
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
