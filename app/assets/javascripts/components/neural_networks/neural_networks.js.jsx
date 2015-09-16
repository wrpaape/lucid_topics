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
            <Img src={ imgPath + 'artificial_neuron.jpg' } />
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
            a <strong>network</strong> of billions of neurons firing in parallel smarter
            is that the individual neuron's threshold value is tuned according to the
            feedback it receives after every synapse. This individual feedback can be
            viewed as an adjustment to error and depends on the <strong>combined</strong> effect
            of <strong>each and every</strong> neuron in the network.
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
