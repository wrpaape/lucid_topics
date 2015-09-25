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
    // var drawDottedLine = this.props.drawDottedLine;
    var drawArrow = this.props.drawArrow;
    var drawBall = this.props.drawBall;
    var drawInput = function() {
      ctxInput.clearRect(0, 0, width, height);
      plane.draw(ctxInput);
      // drawDottedLine(ctxInput, xo, yo, 2 * xo, yo);
      drawArrow(ctxInput, xo, yo, rArrow, rArrow / 6, dAlpha, '#C1FA1C');
      drawArrow(ctxInput, xo, yo, rArrow, rArrow / 3, theta, '#1DFD84');
      drawBall(ctxInput, xBall, yBall, rBall, 'blue');
    };
    var drawOutput = function() {
      ctxOutput.clearRect(0, 0, width, height);
      plane.draw(ctxOutput);
      // drawDottedLine(ctxOutput, xo, yo, 2 * xo, yo);
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
  render: function() {
    var planes = this.props.planes;
    var idSelected = this.props.idSelected;

    return(
      <div>
        <canvas id='plane-vectors-input' width='200' height='200' />
        <canvas id='plane-vectors-output' width='200' height='200' />
        <PlaneValues planes={ planes } idSelected={ idSelected } updateIndex={ this.props.updateIndex } drawDottedLine={ this.props.drawDottedLine } drawArrow={ this.props.drawArrow } />
        <NeuralNetworkModel brain={ planes[idSelected].brain } drawBall={ this.props.drawBall } pause={ this.props.pause } resume={ this.props.resume } />
      </div>
    );
  }
});
