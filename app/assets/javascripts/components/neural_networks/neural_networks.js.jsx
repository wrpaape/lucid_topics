/* globals React */
'use strict';

var NeuralNetworks = React.createClass({
  getInitialState: function() {
    return({
      demo: null
    });
  },
  seeDemo: function() {
    this.setState({
      demo: <NeuralNetworksDemo goBack={ this.quitDemo } goHome={ this.goBack } />
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
          <div>
            <span className='cursor-pointer' onClick={ this.goBack }>
              back
            </span>
          </div>
          { [this.props.downloadPdf].concat(this.props.title) }
          <section>
            <h3>
              What is a Neural Network?
            </h3>
            <p>
              (Artificial) Neural Networks are a family of statistical learning models
              inspired by the central nervouse system and are used to estimate or
              approximate functions that can depend on a large number of inputs and
              are generally unknown.
            </p>
            <Img src={ imgPath + 'neuron.png' } />
            <Img src={ imgPath + 'basic_diagram.png' } />
            <p>
              artificial neural networks are generally presented
              as systems of interconnected "neurons" which exchange messages between each
              other. The connections have numeric weights that can be tuned based on
              experience, making neural nets <strong>adaptive to inputs
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
              and configurations according to the ecological niche occupied by their host.
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
              to as a weight in Math World, and its function is not unlike the weight that
              teachers implement when grading their assignments: a failed test is usually
              more costly to a student's overall GPA than a forgotten homework worksheet.
              But while a heavier weight implies greater importance to a graded assignment,
              a "heavier" weight simply implies greater amplification. To diverge even further
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
              Back to our simple neuron, or perceptron as its called in the math community. As the
              fundamental unit of the neural network, its sole function is to read in numbers,
              do some calculations, and spit out a new set of numbers as output. We'll get to
              how their combined effort results in the magic phenomenon we call learning soon enough,
              but for now a little math:
            </p>
            <Img src={ imgPath + 'artificial_neuron.jpg' } />
            <p>
              a = x1w1 + x2w2 + x3w3... + xnwn + (-1)wn+1
            </p>
            <p>
              or if you're familiar with summation notation:
            </p>
            <Img src={ imgPath + 'a_sum.gif' } />
            <p>
              The value, a, represents the activation value of our neuron's input and its calculation is
              the first step in computing its output. Just like a GPA the activation value is a simple
              weighted sum. But where does that last element in the series come from? If you recall from earlier
              that each neuron has some "intrinsic threshold value" to compare to, this is it. One way of
              viewing how our neuron uses this value (called bias) to judge its weighted input is through the equation:
            </p>
            <p>
              x1w1 + x2w2 + x3w3... + xnwn >= t
            </p>
            <p>
              With the weighted sum of its inputs calculated on the left hand side, our neuron's output
              depends on whether or not this value meets or exceeds the threshold. For reasons lurking
              uncomfortably deep in Math World, this comparison is better expressed for the purpose of
              constructing our model by treating the threshold as an additional weight as so:
            </p>
            <p>
            </p>
          </section>
          <span className='cursor-pointer' onClick={ this.seeDemo }>
            see demo
          </span>
        </div>
        { demo }
      </div>
    );
  }
});
