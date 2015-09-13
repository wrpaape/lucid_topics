/* globals React */
'use strict';

var NeuralNetworks = React.createClass({
  getInitialState: function() {
    return({
      demo: null
    });
  },
  selectDemo: function() {
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
            <span className='cursor-pointer' onClick={ this.selectDemo }>
              see demo
            </span>
          </div>
        </div>
        { demo }
      </div>
    );
  }
});
