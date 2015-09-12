/* globals React */
'use strict';

var PlaneValues = React.createClass({
  getInitialState: function() {
    return({
      indexSelected: this.props.indexSelected
    });
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      indexSelected: nextProps.indexSelected
    });
  },
  componentDidUpdate: function() {
    var planes = this.props.planes;
    var drawDottedLine = this.props.drawDottedLine;
    var drawArrow = this.props.drawArrow;
    var plane = planes[this.state.indexSelected];
    var v = plane.v;
    var dS = plane.dS;
    var vMag = v.mag;
    var aMagActual = plane.a.actual.mag;
    var aMagDesired = plane.a.desired.mag;
    var rho = dS.mag;
    var alpha = v.angle;
    var theta = dS.angle;
    var phiActual = plane.a.actual.angle;
    var phiDesired = plane.a.desired.angle;
    var targetsCollected = plane.targetsCollected;
    var color = plane.color;
    var canvasInput = document.getElementById('plane-values-input');
    var canvasOutput = document.getElementById('plane-values-output');
    var ctxInput = canvasInput.getContext('2d');
    var ctxOutput = canvasOutput.getContext('2d');
    var width = canvasInput.width;
    var height = canvasInput.height;
    var xo1 = height / 10;
    var yo = height / 4;
    var dX = (width - 3 * xo1) / 2;
    var angle = Math.PI / 12;
    var r = dX / Math.cos(angle);
    var xo2 = width - dX - xo1;
    var heightText = 3 * xo1 / 2;
    var formatScalar = function(scalar, units) {
      return Math.round(scalar) + ' ' + units;
    };
    var formatAngle = function(angle) {
      return Math.round(angle * 180 / Math.PI) + '°';
    };
    var drawInput = function() {
      ctxInput.clearRect(0, 0, width, height);
      drawDottedLine(ctxInput, xo1, yo, xo1 + dX, yo);
      drawArrow(ctxInput, xo1, yo, r, 2 * r / 5, angle, color);
      ctxInput.font = '18px monaco, Consolas, "Lucida Console", monospace';
      ctxInput.fillStyle = color;
      ctxInput.fillText('plane', xo1, heightText);
      ctxInput.fillText('v: ' + formatScalar(vMag, 'm/s'), xo1, height - 2 * heightText - 4);
      ctxInput.fillText('⍺: ' + formatAngle(alpha), xo1, height - heightText);
      drawDottedLine(ctxInput, xo2, yo, xo2 + dX, yo);
      drawArrow(ctxInput, xo2, yo, r, 2 * r / 5, angle, 'blue');
      ctxInput.fillStyle = 'blue';
      ctxInput.fillText('target', xo2, heightText);
      ctxInput.fillText('ρ: ' + formatScalar(rho, 'm'), xo2, height - 2 * heightText - 4);
      ctxInput.fillText('θ: ' + formatAngle(theta), xo2, height - heightText);
    };
    var drawOutput = function() {
      ctxOutput.clearRect(0, 0, width, height);
      drawDottedLine(ctxOutput, xo1, yo, xo1 + dX, yo);
      drawArrow(ctxOutput, xo1, yo, r, 2 * r / 5, angle, 'fuchsia');
      ctxOutput.font = '18px monaco, Consolas, "Lucida Console", monospace';
      ctxOutput.fillStyle = 'fuchsia';
      ctxOutput.fillText('actual', xo1, heightText);
      ctxOutput.fillText('aₓ: ' + formatScalar(aMagActual, 'm/s²'), xo1, height - 2 * heightText - 4);
      ctxOutput.fillText('φₓ: ' + formatAngle(phiActual), xo1, height - heightText);
      drawDottedLine(ctxOutput, xo2, yo, xo2 + dX, yo);
      drawArrow(ctxOutput, xo2, yo, r, 2 * r / 5, angle, 'lime');
      ctxOutput.fillStyle = 'lime';
      ctxOutput.fillText('desired', xo2, heightText);
      ctxOutput.fillText('aₒ: ' + formatScalar(aMagDesired, 'm/s²'), xo2, height - 2 * heightText - 4);
      ctxOutput.fillText('φₒ: ' + formatAngle(phiDesired), xo2, height - heightText);
    };
    var draw = function() {
      drawInput();
      drawOutput();
    };

    window.requestAnimationFrame(draw);
  },
  selectPlane: function(event) {
    this.props.updateIndex(event.target.value);
  },
  render: function() {
    var planes = this.props.planes;
    var indexSelected = this.state.indexSelected;
    var plane = planes[indexSelected];

    var options = planes.map(function(plane, i) {
      return <option key={ i } value={ i } >{ window.classifier.classify(plane.color) }</option>;
    });

    return(
      <div>
        <select value={ this.state.indexSelected } onChange={ this.selectPlane }>
          { options }
        </select>
        <span>
          { '   targets collected: ' + plane.targetsCollected }
        </span>
        <div>
          <canvas id='plane-values-input' width='300' height='150' />
          <canvas id='plane-values-output' width='300' height='150' />
        </div>
      </div>
    );
  }
});
