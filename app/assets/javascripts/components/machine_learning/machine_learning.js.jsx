/* globals React */
'use strict';

var MachineLearning = React.createClass({
  render: function() {
    return(
      <div>
        <h5>
          <span onClick={ this.props.goBack }>
            back
          </span>
        </h5>
        { [this.props.downloadPdf].concat(this.props.title) }
        <section>
          <h3>
            What is Machine Learning?
          </h3>
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
        </section>
      </div>
    );
  }
});
