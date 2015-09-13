/* globals React */
'use strict';

var Triplestore = React.createClass({
  render: function() {
    return(
      <div>
        <div>
          <span className='cursor-pointer' onClick={ this.props.goBack }>
            back
          </span>
        </div>
        <div>
          lorem
        </div>
      </div>
    );
  }
});
