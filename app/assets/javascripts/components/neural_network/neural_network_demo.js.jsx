/* globals React */
'use strict';

var NeuralNetworkDemo = React.createClass({
  getInitialState: function() {
    return({
      indexSelected: 0,
      planeVectors: <div/>
    });
  },
  componentDidMount: function() {
    var canvas = document.getElementById('neural-network');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var pad = height / 10;
    var getMagnitude = this.getMagnitude;
    var randRange = function(min, max) {
      return min + (max - min) * Math.random();
    };
    var sRand = function(dir, pad) {
      var dim = dir === 'x' ? width : height;
      return randRange(pad, dim - pad);
    };
    var vNegRand = function(v, vMagMin, vMagMax) {
      return (v < 0 ? 1 : -1) * randRange(vMagMin, vMagMax);
    };
    var initializeVectors = function() {
      var pad = this.pad;
      var vMag = randRange(this.vMagMin, this.vMagMax);
      var alpha = randRange(0, 2 * Math.PI);
      this.s = {
        x: sRand('x', pad),
        y: sRand('y', pad)
      };
      this.v = {
        mag: vMag,
        angle: alpha,
        x: vMag * Math.cos(alpha),
        y: vMag * Math.sin(alpha)
      };
      this.a = {
        actual: {
          mag: 0,
          angle: NaN,
          x: 0,
          y: 0
        },
        desired: {
          mag: 0,
          angle: NaN,
          x: 0,
          y: 0
        },
      };
    };
    var updateDotVectors = function() {
      var s = this.s;
      var v = this.v;
      var vMagMin = this.vMagMin;
      var vMagMax = this.vMagMax;
      var pad = this.pad;
      s.x += v.x;
      s.y += v.y;
      if (s.x + v.x > width - pad || s.x + v.x < pad) {
        v.x = vNegRand(v.x, vMagMin, vMagMax);
      }
      if (s.y + v.y > height - pad || s.y + v.y < pad) {
        v.y = vNegRand(v.y, vMagMin, vMagMax);
      }
    };
    var updatePlaneVectors = function() {
      var s = this.s;
      var v = this.v;
      var a = this.a;
      var alpha = this.v.angle;
      var pad = this.pad;

      s.x += v.x;
      s.y += v.y;
      v.x += a.actual.x;
      v.y += a.actual.y;
      if (s.x + v.x > width - pad || s.x + v.x < pad) {
        v.x = 0;
      }
      if (s.y + v.y > height - pad || s.y + v.y < pad) {
        v.y = 0;
      }
    };

    this.setState(
      {
        Plane: function() {
          var brain = new NeuralNetwork(4, 2);
          this.brain = brain;
          this.processError = function() {
            var a = this.a;
            var dS = this.dS;
            var dV = this.dV;
            a.desired.x = (dS.x + dV.x) / 1000;
            a.desired.y = (dS.y + dV.y) / 1000;
            this.updateMagAngle(a.desired);
            var inputs = [[dV.mag], [dV.angle], [dS.mag], [dS.angle]];
            brain.processInputs(inputs);
            var aMag = brain.outputs[0];
            var phi = brain.outputs[1] % (2 * Math.PI);
            a.actual = {
              mag: aMag,
              angle: phi,
              x: aMag * Math.cos(phi),
              y: aMag * Math.sin(phi)
            };
            var diffs = [a.desired.mag - a.actual.mag, a.desired.angle - a.actual.angle];
            brain.processDiffs(diffs);
            // a.actual = a.desired;
            // console.log(brain.outputs);
            // console.log(getMagnitude(diffs[0], diffs[1]));
            // console.log(brain.layers[2].neurons[1].error);
            // if (isNaN(brain.layers[1].neurons[0].weights[0])) {
            //   console.log('weight is NaN');
            //   throw new Error();
            // } else if (isNaN(a.actual.mag)) {
            //   console.log('a is NaN');
            //   throw new Error();
            // } else if(!this.v.mag) {
            //   console.log('v is 0');
            //   throw new Error();
            // }
          };
          var ar = 1 / 3;
          var c = pad;
          var b = ar * c;
          var le = getMagnitude(b / 2, c);
          var lambda = Math.atan(b / 2 / c);
          this.updateMagAngle = function(vec) {
            vec.mag = getMagnitude(vec.x, vec.y);
            vec.angle = Math.atan(vec.y / vec.x);
            if (vec.x < 0 && vec.y >= 0) {
              vec.angle -= Math.PI;
            } else if (vec.x < 0 && vec.y < 0) {
              vec.angle += Math.PI;
            }
            if (vec.angle < 0) {
              vec.angle += 2 * Math.PI;
            }
          };
          this.initializeVectors = initializeVectors;
          this.updateVectors = updatePlaneVectors;
          this.draw = function(childCtx) {
            var context = childCtx || ctx;
            var s = this.s;
            var alpha = this.v.angle;
            context.beginPath();
            context.moveTo(s.x, s.y);
            for(var i = -1; i <= 1; i+= 2) {
              context.lineTo(s.x - le * Math.cos(alpha + i * lambda), s.y - le * Math.sin(alpha + i * lambda));
            }
            context.lineTo(s.x - le * Math.cos(alpha - lambda), s.y - le * Math.sin(alpha - lambda));
            context.lineTo(s.x - le * Math.cos(alpha + lambda), s.y - le * Math.sin(alpha + lambda));
            context.closePath();
            context.fillStyle = this.color;
            context.fill();
          };
          this.update = function() {
            this.updateVectors();
            this.updateMagAngle(this.v);
          };
          this.updateDS = function() {
            var s = this.s;
            var sTarget = this.target.s;
            this.dS = {
              x: sTarget.x - s.x,
              y: sTarget.y - s.y
            };
          };
          this.updateDV = function() {
            var v = this.v;
            var vTarget = this.target.v;
            this.dV = {
              x: vTarget.x - v.x,
              y: vTarget.y - v.y
            };
          };
          this.updateError = function() {
            this.updateDS();
            this.updateDV();
            this.updateMagAngle(this.dS);
            this.updateMagAngle(this.dV);
          };
          this.c = c;
          this.ar = ar;
          this.pad = c;
          this.vMagMin = 0.1;
          this.vMagMax = 0.1;
          this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
          this.initializeVectors();
          this.updateMagAngle(this.v);
          this.targetsCollected = 0;
        },
        Dot: function(allPlanes) {
          var radius = randRange(pad * 3 / 10, pad / 2);
          this.initializeVectors = initializeVectors;
          this.updateVectors = updateDotVectors;
          this.updateRhos = function() {
            var s = this.s;
            this.rhos = allPlanes.map(function(plane) {
              return getMagnitude(s.x - plane.s.x, s.y - plane.s.y) - radius;
            });
          };
          this.draw = function(colorSelected) {
            var s = this.s;
            var colors = this.colors;
            var arcStart = 0;
            var arcInc = 2 * Math.PI / colors.length;
            if (~colors.indexOf(colorSelected)) {
              ctx.strokeStyle = 'yellow';
              ctx.lineWidth = 8;
              ctx.setLineDash([5]);
            } else {
              ctx.strokeStyle = 'black';
              ctx.lineWidth = 1;
            }
            colors.forEach(function(color) {
              ctx.beginPath();
              ctx.arc(s.x, s.y, radius, arcStart, arcStart + arcInc, false);
              ctx.stroke();
              ctx.lineTo(s.x, s.y);
              ctx.closePath();
              ctx.fillStyle = color;
              ctx.fill();
              arcStart += arcInc;
            });
          };
          this.update = function() {
            this.colors = ['blue'];
            this.updateVectors();
            this.updateRhos();
          };

          this.radius = radius;
          this.pad = radius + pad;
          this.vMagMin = 1;
          this.vMagMax = 3;
          this.colors = ['blue'];
          this.initializeVectors();
          this.updateRhos();
        },
        clear: function() {
          ctx.clearRect(0, 0, width, height);
        }
      },
      this.setPlanes.bind(this, 1)
    );
  },
  setPlanes: function(numPlanes) {
    var Plane = this.state.Plane;
    var allPlanes = [];
    while (allPlanes.length < numPlanes) {
      allPlanes.push(new Plane());
    }
    var planes = {
      all: allPlanes,
      DrawAndUpdate: function() {
        this.all.forEach(function(plane) {
          plane.draw();
          plane.update();
        });
      }
    };

    this.setState({ planes: planes }, this.setDots.bind(this, 2));
  },
  setDots: function(numDots) {
    var allPlanes = this.state.planes.all;
    var Dot = this.state.Dot.bind(this, allPlanes);
    var allDots = [];
    while (allDots.length < numDots) {
      allDots.push(new Dot());
    }
    var dots = {
      all: allDots,
      DrawAndUpdate: function(colorSelected) {
        var allDots = this.all;
        allDots.forEach(function(dot) {
          dot.draw(colorSelected);
          dot.update();
        });
        allPlanes.forEach(function(plane, i) {
          allDots.sort(function(a, b) {
            return b.rhos[i] - a.rhos[i];
          });
          var j = allDots.length - 1;
          while (allDots[j].rhos[i] < 0) {
            plane.targetsCollected++;
            allDots[j--] = new Dot();
          }
          var target = allDots[j];
          if (target.colors[0] === 'blue') {
            target.colors[0] = plane.color;
          } else {
            target.colors.push(plane.color);
          }
          plane.target = target;
          plane.updateError();
          plane.processError();
        });
      }
    };

    this.setState({ dots: dots }, this.draw);
  },
  draw: function() {
    var planes = this.state.planes;
    var indexSelected = this.state.indexSelected;
    this.state.clear();
    planes.DrawAndUpdate();
    this.state.dots.DrawAndUpdate(planes.all[indexSelected].color);
    this.setState({
        planeVectors: <PlaneVectors planes={ planes.all.map(this.extendPlane) } indexSelected={ indexSelected } updateIndex={ this.updateIndex } pause={ this.pause } resume={ this.resume } />,
        requestId: window.requestAnimationFrame(this.draw)
      });
  },
  extendPlane: function(plane) {
    return({
      s: {
        x: 100,
        y: 100
      },
      a: {
        actual: {
          mag: plane.a.actual.mag * 3600,
          angle: plane.a.actual.angle
        },
        desired: {
          mag: plane.a.desired.mag * 3600,
          angle: plane.a.desired.angle
        }
      },
      v: {
        mag: plane.v.mag * 60,
        angle: plane.v.angle
      },
      dV: {
        mag: plane.dV.mag * 60,
        angle: plane.dV.angle
      },
      dS: {
        mag: plane.dS.mag,
        angle: plane.dS.angle
      },
      targetsCollected: plane.targetsCollected,
      brain: plane.brain,
      color: plane.color,
      draw: plane.draw
    });
  },
  getMagnitude: function(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  },
  updateIndex: function(newIndex) {
    this.setState({
      indexSelected: newIndex
    });
  },
  pause: function() {
    window.cancelAnimationFrame(this.state.requestId);
  },
  resume: function() {
    window.requestAnimationFrame(this.draw);
  },
  setRefreshRate: function(event) {
    this.setState({ refreshRate: event.target.value });
  },
   resetDemo: function() {
    this.pause();
    this.replaceState(this.getInitialState(), this.componentDidMount);
  },
  render: function() {

    return(
      <div>
        <span onClick={ this.resetDemo }>reset</span>
        <div>
          <canvas id='neural-network' width='1000' height='500' />
        </div>
        <div>
          { this.state.planeVectors }
        </div>
      </div>
    );
  }
});
