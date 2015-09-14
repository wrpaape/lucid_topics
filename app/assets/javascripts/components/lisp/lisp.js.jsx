/* globals React */
'use strict';

var Lisp = React.createClass({
  getInitialState: function() {
    return({
      contents: {
        'C': {
          mode: 'c_cpp',
          keys: [-1, -1, -1],
          value: '1 + 2 + 3  + 4'
        },
        'LISP': {
          mode: 'lisp',
          value: '(+ 1 2 3 4)',
          keys: [-1, -1, -1]
        }
      }
    });
  },
  componentDidMount: function () {
    var contents = this.state.contents;
    Object.keys(contents).forEach(function(lang) {
      var editor = ace.edit('editor-' + lang);
      editor.$blockScrolling = Infinity;
      editor.setTheme('ace/theme/terminal');
      editor.getSession().setMode('ace/mode/' + contents[lang].mode);
      editor.getSession().setTabSize(2);
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false
      });
    });
  },
  submitCode: function (contents, lang, key) {
    // console.log(ace.edit('editor-' + lang).getValue());
    var shift = 13;
    var rtn = 16;
    var cmdL = 91;
    var cmdR = 93;
    var ctr = 17;
    var keyCode = key.keyCode;
    contents[lang].keys.push(keyCode);
  },
  render: function() {
    var contents = this.state.contents;
    var editors = Object.keys(contents).map(function(lang) {
      return(
        <div className='editor'>
          <div>
            { lang }
          </div>
          <pre key={ 'editor-' + lang } id={ 'editor-' + lang } onKeyDown={ this.submitCode.bind(this, contents, lang) }>
            { contents[lang].value }
          </pre>
        </div>
      );
    }.bind(this));

    return(
      <div>
        <div>
          <span className='cursor-pointer' onClick={ this.props.goBack }>
            back
          </span>
        </div>
          { [this.props.downloadPdf].concat(this.props.title) }
        <div className='paragraph'>
          <p>
            What is LISP?
          </p>
          <div className='editors-wrap'>
            { editors }
          </div>
          <span>
            &nbsp;&nbsp;&nbsp;LISP is weafwefawefawe.
          </span>
        </div>
        <div className='paragraph'>
          <p>
            Features of LISP
          </p>
          <ul>
            <li>
              <p>
                the list
              </p>
              <span>
                &nbsp;&nbsp;&nbsp;LISP programs are composed of a simple data structure:
                the list (hence LIS(t) Processing). A 'list' is a nonatomic combination of objects
                enclosed by a set of parentheses (hence Lots of Irritating Stupid Parentheses).
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
