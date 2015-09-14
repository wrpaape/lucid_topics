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
          { [this.props.downloadPdf].concat(this.props.title) }
          <p>
            &nbsp;&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vestibulum vitae ex ac dui vehicula tristique in vel ex.
            Maecenas enim mi, vehicula eget ante vitae, mollis imperdiet arcu.
            Vestibulum at nibh sed velit commodo rhoncus vitae vitae mauris.
            Cras fringilla rutrum turpis, egestas feugiat erat efficitur ac.
            Sed eu quam tristique, vehicula risus et, venenatis orci.
            Vivamus quis semper purus, sit amet feugiat dui.
            Pellentesque ullamcorper commodo hendrerit.
            Proin efficitur, ligula accumsan sodales venenatis, elit augue euismod risus, in commodo odio ex sed odio.
            Integer fermentum gravida nisi sed elementum.
            Pellentesque tristique molestie ullamcorper.
            Nam est libero, rhoncus nec sagittis quis, scelerisque sollicitudin elit.
            Aenean iaculis nunc dui, et interdum dui condimentum eu.
            In auctor tellus vitae efficitur tincidunt.
            Donec elementum facilisis elit, at lobortis urna cursus at.
          </p>
          <span className='cursor-pointer' onClick={ this.seeDemo }>
            see demo
          </span>
        </div>
        { demo }
      </div>
    );
  }
});
