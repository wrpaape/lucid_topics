/* globals React */
'use strict';

var NeuralNetworks = React.createClass({
  getInitialState: function() {
    return({
      demo: null
    });
  },
  componentDidMount: function() {
    var canvas = document.getElementById('approximator');
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var pad = height / 20;
    var rBall = pad - 2;
    var x0 = 0.4;
    var xf = 8.75;
    var yMin = -3.26;
    var yMax = 4.723;
    var xScale = (width - 2 * pad) / (xf - x0);
    var yScale = (height - 2 * pad) / (yMax - yMin);
    var maxError = 2.592 * yScale;
    var dx = (xf - x0) / 2000;
    var xAll = [], yDesired = [], yActual = [];
    for (var x = 0.4; x < 8.75; x += dx) {
      xAll.push((x - x0) * xScale + pad);
      yDesired.push((this.outputDesired(x) - yMin) * yScale + pad);
      yActual.push((this.outputActual(x) - yMin) * yScale + pad);
    }
    // // draw bg
    // var lineFromTo = function(x1, y1, x2, y2, color) {
    //   ctx.save();
    //   ctx.strokeStyle =  color;
    //   ctx.lineWidth = 4;
    //   ctx.beginPath();
    //   ctx.moveTo(x1, y1);
    //   ctx.lineTo(x2, y2);
    //   ctx.stroke();
    //   ctx.restore();
    // };
    // for (var i = 1; i < xAll.length; i++) {
    //   lineFromTo(xAll[i - 1], yActual[i - 1], xAll[i], yActual[i], 'fuchsia');
    //   if (i % 10 === 0 || i === xAll.length - 1) {
    //     lineFromTo(xAll[i - 10], yDesired[i - 10], xAll[i - 5], yDesired[i - 5], 'lime');
    //   }
    // }
    // ctx.font = '36px monospace';
    // ctx.fillStyle = '#FF00FF';
    // ctx.fillText('actual', 1854, 22 + pad);
    // ctx.fillStyle = '#00FF00';
    // ctx.fillText('desired', 1830, 22 + pad + 44);

    var widthLegend = 175;   
    var heightLegend = 100;
    var cyclesSpec = new Rainbow();
    cyclesSpec.setNumberRange(0, xAll.length);
    cyclesSpec.setSpectrum('#FF00FF', '#00FF00');
    var errorSpec = new Rainbow();
    errorSpec.setNumberRange(0, maxError);
    errorSpec.setSpectrum('green', 'yellow', 'red');
    var xRepsCounter = width / 2 - 150;
    var xError = width / 2 + 150;
    var yStats = 2 * height / 5 + 20;
    var yA, yD, error;
    var draw = function(i) {
      x = xAll[i];
      yA = yActual[i];
      yD = yDesired[i];
      error = yD - yA;
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.fillRect(x, 0, Math.max(0, width - widthLegend - x), height, 'black');
      ctx.fillRect(x, heightLegend, width - x, height - heightLegend, 'black');
      this.drawRepsCounter(ctx, xRepsCounter, yStats, i, '#' + cyclesSpec.colourAt(i));
      this.drawError(ctx, xError, yStats, 1.25 * error, '#' + errorSpec.colourAt(Math.abs(error)));
      this.drawBall(ctx, x, yA, rBall, '#FF00FF');
      this.drawCircle(ctx, x, yD, rBall, '#00FF00');
      ctx.restore();
    }.bind(this);

    var animate = function(i) {
      window.requestAnimationFrame(draw.bind(null, i));
      i += (i + 1 < xAll.length) ? 1 : -i;
      setTimeout(animate.bind(null, i), 0);
    };
    animate(0);
  },
  outputDesired: function(x) {
    return (Math.pow((x - 8), 4) * Math.pow((x - 2), 3) * Math.pow((x - 5), 2) * (x - 0.5)) / 12000 + 1;
  },
  outputActual: function(x) {
    return this.outputDesired(x) - 4 * Math.pow(Math.E, -x / 1.5) * Math.cos(6 * Math.PI * x + 0.5);
  },
  drawRepsCounter: function(ctx, x, y, numCycles, color) {
    ctx.save();
    ctx.font = '36px monospace';
    ctx.fillStyle = color;
    ctx.fillText('cycles: ' + numCycles, x, y);
    ctx.restore();
  },
  drawError: function(ctx, x, y, error, color) {
    ctx.save();
    ctx.font = '36px monospace';
    ctx.fillStyle = color;
    ctx.fillText('error: ', x, y);
    ctx.fillRect(x + 158, y - 10, 100, error, color);
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
  drawCircle: function(ctx, x, y, r, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.setLineDash([5]);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  },
  seeDemo: function() {
    this.setState({
      demo: <NeuralNetworksDemo goBack={ this.quitDemo } goHome={ this.goBack } drawBall={ this.drawBall } />
    });
  },
  quitDemo: function(callback) {
    this.setState({ demo: null }, callback);
  },
  goBack: function() {
    this.quitDemo(this.props.goBack);
  },
  render: function() {
    var demo = this.state.demo;
    var imgPath = this.props.paths.img;

    return(
      <div>
        <div className={ !demo }>
          <div className='nav header'>
            <span onClick={ this.goBack }>
              back
            </span>
            { this.props.downloadPdf }
            <span onClick={ this.seeDemo }>
              demo
            </span>
          </div>
          { this.props.title }
          <section>
            <h3>
              What is a Neural Network?
            </h3>
            <p>
              (Artificial) Neural Networks are a family of statistical learning models
              inspired by the central nervous system and are used to estimate or
              approximate functions that can depend on a large number of inputs and
              are generally unknown.
            </p>
            <Img src={ imgPath + 'neuron.png' } />
            <Img src={ imgPath + 'basic_diagram.png' } />
            <p>
              Artificial neural networks are generally presented
              as systems of interconnected "neurons" which exchange messages between each
              other. The connections have numeric weights that can be tuned based on
              experience, making neural networks <strong>adaptive to inputs
              </strong> and thus <strong>capable of learning</strong>.
            </p>
          </section>
          <section>
            <h3>
              The Brain
            </h3>
            <p>
              Our brains are made up of ~100 billion tiny interconnected units called neurons.
              The behavior of a single neuron can, with much hand-waving, be modeled as a simple
              combinatorial switch. Its job is to accumulate incoming synapses
              (electrical inputs from other neurons) and compare their total "value"
              to some intrinsic threshold value. If the computed incoming value exceeds
              this threshold, the switch is thrown and the neuron fires, relaying a
              new synapse to one or more downstream neurons.
            </p>
            <p>
              What makes a neuron smarter than a simple switch, or rather, what makes
              a <strong>network</strong> of billions of neurons firing together smarter
              is that the individual neuron's response characteristics to incoming synapses
              are adjusted slightly according to the feedback it receives after every synapse. This
              individual feedback can be viewed as an adjustment to error and depends on the <strong>
              combined</strong> effect of <strong>each and every</strong> neuron in the network.
            </p>
            <p>
              Accordingly, a network of neurons is "connectionist" and not "procedural."
              This means that the path of a neural network from an input of, let's say,
              a singed fingertip, to an output response of yanking one's hand out from an
              open flame is <strong>not linear</strong>. Rather, the ensuing hand-yank
              reaction to pain, while depending on each neuron's unique reaction,
              is the result of the entire network processing <strong>collectively</strong> and <strong>
              in parallel</strong>. The eventual reinforced behavior of avoiding skin contact
              with fire, however, is the result of the <strong>individual tuning</strong> of
              each neuron over a (usually) short series of painful episodes.
            </p>
            <p>
              So how did the cavemen finally learn to keep their hands out of the fire?
              At the risk of offending the biologists and mathematicians still
              hard at work mapping the magic behind the nervous system, the functionality
              of a neural network, at least as an abstract concept, is simpler than it
              may appear.
            </p>
          </section>
          <section>
            <h3>
              The Feedforward-Backpropogation Network
            </h3>
            <p>
              It turns out neural networks of the animal kingdom come in all shapes, sizes,
              and configurations tailored to the ecological niche occupied by their host.
              Our friends the mathematicians have taken the models that mimick these natural
              systems and stripped them down to their lean and mean components in order to
              assume (typically) a much more specialized role than a living nervous system.
              Accordingly, hundreds of models were born from Math World possessing a particular
              scope of problem-solving capabilities, with some better suited than others at
              solving any particular problem. We will be venturing just deep enough into Math
              World to cover the very basics of "the quintessential" neural network model:
              Feedforward-Backpropogation.
            </p>
            <Img src={ imgPath + 'f_b_network.jpg' } />
            <p>
              Feedforward-Backpropogation is not indicative of the layered configuration
              of this neural network, but rather "feedforward" describes the method
              of collective processing while "backpropogation" refers to how the network
              adjusts the behavior of its neurons individually in response to error
              (its learning algorithm).
            </p>
            <p>
              Let's focus on a single neuron in one of our cavemen's neural network.
              Let's say this neuron is hooked up so that it receives input synapses
              from two upstream neurons and fires off its output synapse to a single neuron
              downstream. Biological details aside, our neuron should look something like this:
            </p>
            <Img src={ imgPath + 'perceptron.png' } />
            <p>
              It turns out the properties of each synapse of this simple neuron can be
              modeled by the assignment of a simple decimal number. This number is referred
              to as a <strong>weight</strong> in Math World, and its function is not unlike the weight that
              teachers implement when grading their assignments: a failed test is usually
              more costly to a student's overall GPA than a forgotten homework worksheet.
              But while a heavier weight implies greater importance to a graded assignment,
              a "heavier" weight simply implies <strong>greater amplification</strong>. To diverge even further
              from this analogy, weights assigned to inputs in a feedforward-backpropogation
              network can be negative and of magnitude greater than one as opposed to the familiar
              10%-20%-70% grading system. The steps this neuron will take to process its
              inputs, however, have much in common with those taken by a teacher at the
              end of each semester.
            </p>
            <p>
              Returning to our caveman you're probably wondering how the process by which
              he learns to stop burning himself can be expressed in anything resembling a
              GPA and if those know-it-all mathematicians in their ivory towers aren't just
              toying with the commoners and are keeping the real recipe that makes programs
              like IBM's Watson tick to themselves. Fortunately the feedforward-backpropogation
              model is not just some cruel joke, but as it turns out the caveman scenario can
              be broken down into the ebbing and flowing of decimal point numbers.
            </p>
            <p>
              Let's study our simple neuron, or perceptron as its called in the math community. As the
              fundamental unit of the neural network, its sole function is to read in numbers,
              do some calculations, and spit out a new set of numbers as output. We'll get to
              how their combined effort results in the magic phenomenon we call learning soon enough,
              but for now a little math:
            </p>
            <Img src={ imgPath + 'artificial_neuron.jpg' } />
            <p className='equation'>
              <span className='math'>a = x<sub>1</sub>w<sub>1</sub> + x<sub>2</sub>w<sub>2</sub> + x<sub>3</sub>w<sub>3</sub>... + x<sub>n</sub>w<sub>n</sub> + (-1)w<sub>n+1</sub></span>
            </p>
            <p>
              or if you're familiar with summation notation:
            </p>
            <p className='equation'>
              <span className='math'>a = <span className='sigma'>&Sigma;</span>&nbsp;x<sub>i</sub>w<sub>i</sub> + (-1)w<sub>n+1</sub></span>
            </p>
            <p>
              The value, a, represents the activation value of our neuron's input and its calculation is
              the first step in computing its output. Just like a GPA the activation value is a simple
              weighted sum. But where does that last element in the series come from? If you recall from earlier
              that each neuron has some "intrinsic threshold value" to compare to, this is it. One way of
              viewing how our neuron uses this value to judge its weighted input is through the equation:
            </p>
            <p className='equation'>
              <span className='math'>x<sub>1</sub>w<sub>1</sub> + x<sub>2</sub>w<sub>2</sub> + x<sub>3</sub>w<sub>3</sub>... + x<sub>n</sub>w<sub>n</sub> >= t</span>
            </p>
            <p>
              With the weighted sum of its inputs calculated on the left hand side, our neuron's output
              depends on whether or not this value meets or exceeds the threshold. For reasons that will
              soon be made clear, this comparison is better expressed for the purpose of
              constructing our model by treating the threshold as an additional weight like so:
            </p>
            <p className='equation'>
              <span className='math'>x<sub>1</sub>w<sub>1</sub> + x<sub>2</sub>w<sub>2</sub> + x<sub>3</sub>w<sub>3</sub>... + x<sub>n</sub>w<sub>n</sub> + (-1)t >= 0</span>
            </p>
            <p>
              The last term of the left side of our activation equation, <span className='math'>(-1)t</span> , is usually referred to as
              the <strong>bias</strong> of a neuron, and it's purpose is to offset our activation function to allow for output values
              outside the range of <span className='math'>0</span> to <span className='math'>1</span>.<br />So what is an activation function?
            </p>
            <p>
              As it turns out, the original explanation of our neuron's role in the network needs to be
              tweaked for our demonstration. The "combinatorial switch" model limits the output of our
              neurons to just 2 values: "fire" or "don't fire" depending whether activation was achieved or not.
              While a binary output could be implemented to reproduce our caveman's learning process
              (ouch => wrong, not ouch => right), in many applications of machine learning there exists
              a gray area where the "rightness" of an output must be evaluated with an analog <strong>error
              </strong> Consider the basic control flow of a neural network undergoing <strong>supervised learning</strong>.
            </p>
            <Img src={ imgPath + 'nn_controller.png' } />
            <p>
              In the case of our caveman learning not to roast his hand, the role of supervisor said to be <strong>training
              </strong> the neural network would be played by his sensory system.  For every case where an input of
              "desire to touch fire" results in the output state of "hand in fire", the network will:
              <ol>
                <li>
                  receive a jolt of pain or <strong>error signal</strong> from the sensory receptors
                </li>
                <li>
                  process this pain through some sort of <strong>learning algorithm</strong> (typically
                  modeled by backpropogation), and
                </li>
                <li>
                  adjust the individual weights of each neuron in accordance to the error signal so that
                  next time Ogg has the urge to "grab pretty flame" he will be a little less inclined to
                  follow through.
                </li>
              </ol>
            </p>
            <p>
              Simple enough, at least from an abstract point of view. But how could this model be applied to
              cases where a neural network's performance can't adaquately be qualified with a simple
              "right" or "wrong?"
            </p>
            <p>
              Consider the implementation of a neural network as the steering control of a robot programmed
              to collect moving targets in a 2D plane:
            </p>
            <Img src={ imgPath + 'neural_network_demo.png' } />
            <p>
              With the sensory input of relative postion and velocity of the nearest target, the desired output of
              our robot's neural network needs to be a steering force or thrust with the proper magnitude and
              direction that will result in the target's interception. In other words, this neural network is
              used to approximate a continuous <strong>mapping function</strong> that bridges the unknown gap
              between "there's the target" to "got it!" This is the power of the feedforward-backpropogation
              network. According to the <strong>Universal Approximation Theorem</strong>:
            </p>
            <h3>
              <strong>The standard multilayer feed-forward network with a single hidden layer is a universal
              approximator.</strong>
            </h3>
            <p>
              This means that provided there exists some dependence of the desired output on the given input, be it known or unknown,
              with enough "training" cycles a neural network will converge toward a solution connecting these
              two states:
            </p>
            <canvas id='approximator' width='2000' height='400' />
          </section>
        { this.props.buzzwordBank }
        </div>
        { demo }
      </div>
    );
  }
});
