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

    return(
      <div>
        <div className={ !demo }>
          <div>
            <span className='cursor-pointer' onClick={ this.goBack }>
              back
            </span>
          </div>
          <div>
            <a className='cursor-pointer' href={ this.props.topic.urls.pdf }>
              download pdf
            </a>
          </div>
          <div>
            <span className='cursor-pointer' onClick={ this.seeDemo }>
              see demo
            </span>
          </div>
          <div>
            lorem
          </div>
        </div>
        { demo }
      </div>
    );
  }
});
