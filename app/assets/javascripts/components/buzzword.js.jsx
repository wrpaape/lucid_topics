/* globals React */
'use strict';

var Buzzword = React.createClass({
  getInitialState: function() {
    return({
      word: this.props.word,
      note: this.props.note,
      related: this.props.related
    });
  },
  resetBuzzword: function() {
    this.setState(this.props);
  },
  selectBuzzword: function(word) {
    var newBuzzword = this.props.buzzwords[word];
    this.setState({
      word: newBuzzword.word,
      note: newBuzzword.note,
      related: newBuzzword.related
    });
  },
  render: function() {
    var related = this.state.related.map(function(word, i) {
      return <i key={ this.state.word + '-' + word } onClick={ this.selectBuzzword.bind(this, word) }>{ word }</i>;
    }.bind(this));

    return(
      <li onMouseLeave={ this.resetBuzzword }>
        <i>{ this.state.word }</i>
        <p>
          { this.state.note }
        </p>
        <div>
          related:
          <span className='nav'>{ related }</span>
        </div>
      </li>
    );
  }
});
