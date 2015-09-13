/* globals React */
'use strict';

var PlaneVectors = React.createClass({
  componentDidUpdate: function() {
    var plane = this.props.planes[this.props.idSelected];
    var theta = plane.dS.angle;
    var dAlpha = plane.dV.angle;
    var phiActual = plane.a.actual.angle;
    var phiDesired = plane.a.desired.angle;
    var canvasInput = document.getElementById('plane-vectors-input');
    var canvasOutput = document.getElementById('plane-vectors-output');
    var ctxInput = canvasInput.getContext('2d');
    var ctxOutput = canvasOutput.getContext('2d');
    var width = canvasInput.width;
    var height = canvasInput.height;
    var xo = width / 2;
    var yo = height / 2;
    var rBall = canvasInput.width / 25;
    var rArrow = xo - 4 * rBall;
    var xBall = xo + (rArrow + 2 * rBall) * Math.cos(theta);
    var yBall = yo + (rArrow + 2 * rBall) * Math.sin(theta);
    var drawDottedLine = this.drawDottedLine;
    var drawArrow = this.drawArrow;
    var drawBall = this.drawBall;
    var drawInput = function() {
      ctxInput.clearRect(0, 0, width, height);
      plane.draw(ctxInput);
      drawDottedLine(ctxInput, xo, yo, 2 * xo, yo);
      drawArrow(ctxInput, xo, yo, rArrow, rArrow / 6, dAlpha, '#1DFD84');
      drawArrow(ctxInput, xo, yo, rArrow, rArrow / 3, theta, '#C1FA1C');
      drawBall(ctxInput, xBall, yBall, rBall, 'blue');
    };
    var drawOutput = function() {
      ctxOutput.clearRect(0, 0, width, height);
      plane.draw(ctxOutput);
      drawDottedLine(ctxOutput, xo, yo, 2 * xo, yo);
      drawArrow(ctxOutput, xo, yo, rArrow, rArrow / 6, phiActual, 'fuchsia');
      drawArrow(ctxOutput, xo, yo, rArrow, rArrow / 3, phiDesired, 'lime');
      drawBall(ctxOutput, xBall, yBall, rBall, 'blue');
    };
    var draw = function() {
      drawInput();
      drawOutput();
    };

    window.requestAnimationFrame(draw);
  },
  drawDottedLine: function(ctx, x1, y1, x2, y2) {
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.setLineDash([10]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  },
  drawArrow: function(ctx, xo, yo, r, rArc, phi, color) {
    var le = r / 10;
    var lambda = Math.PI / 6;
    var rx = r * Math.cos(phi) + xo;
    var ry = r * Math.sin(phi) + yo;
    var delta1 = phi - lambda;
    var delta2 = Math.PI / 2 - phi - lambda;
    var lex1 = rx - le * Math.cos(delta1);
    var ley1 = ry - le * Math.sin(delta1);
    var lex2 = rx - le * Math.sin(delta2);
    var ley2 = ry - le * Math.cos(delta2);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xo, yo);
    ctx.lineTo(rx, ry);
    ctx.stroke();
    ctx.lineTo(lex1, ley1);
    ctx.stroke();
    ctx.moveTo(rx, ry);
    ctx.lineTo(lex2, ley2);
    ctx.stroke();
    ctx.moveTo(xo + rArc, yo);
    ctx.arc(xo, yo, rArc, 0, phi, false);
    ctx.stroke();
    ctx.restore();
  },
  drawBall: function(ctx, x, y, r, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  render: function() {
    var planes = this.props.planes;
    var idSelected = this.props.idSelected;

    return(
      <div>
        <canvas id='plane-vectors-input' width='200' height='200' />
        <canvas id='plane-vectors-output' width='200' height='200' />
        <PlaneValues planes={ planes } idSelected={ idSelected } updateIndex={ this.props.updateIndex } drawDottedLine={ this.drawDottedLine } drawArrow={ this.drawArrow } />
        <NeuralNetworkModel brain={ planes[idSelected].brain } drawBall={ this.drawBall } pause={ this.props.pause } resume={ this.props.resume } />
      </div>
    );
  }
});
