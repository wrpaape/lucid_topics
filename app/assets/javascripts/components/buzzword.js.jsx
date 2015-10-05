/* globals React */
'use strict';

var Buzzword = React.createClass({
  componentWillMount: function () {
  },
  getInitialState: function() {
    return({
      show: false,
      word: this.props.word,
      note: this.props.note,
      related: this.props.related
    });
  },
  toggleShow: function() {
    this.setState({
      show: !this.state.show
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
  formatMd: function(md) {
    return md.replace(/▓/g, '<br />').replace(/(<img[^>]*src=')([^>]*)('[^>]*>)/g, function(match, imgOpen, path, imgClose) {
      return imgOpen + Img.assetPath('buzzwords/' + path) + imgClose;
    });
  },
  formatRelated: function() {
    var related = this.state.related.map(function(word, i) {
      return <i key={ this.state.word + '-' + word } onClick={ this.selectBuzzword.bind(this, word) }>{ word }</i>;
    }.bind(this));

    return related[0] ? <p>related:<span className='nav'>{ related }</span></p> : null;
  },
  render: function() {
    return(
      <li onMouseLeave={ this.resetBuzzword }>
        <p className='nav'>
          <span onClick={ this.toggleShow }>{ this.state.show ? '[-] ' : '[+] ' }</span><i>{ this.state.word }</i>
        </p>
        <div className={ this.state.show }>
        { this.formatRelated() }
        <span dangerouslySetInnerHTML={ {__html: this.formatMd(marked(this.state.note)) } } />
        </div>
      </li>
    );
  }
});
