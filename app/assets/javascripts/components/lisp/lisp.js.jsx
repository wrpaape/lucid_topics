/* globals React */
'use strict';

var Lisp = React.createClass({
  getInitialState: function() {
    return({
      contents: {
        'C': {
          mode: 'c_cpp',
          keys: [-1, -1, -1],
          value: '/* 1 + 2 + 3 + 4 */'
        },
        'LISP': {
          mode: 'lisp',
          value: ';; (+ 1 2 3 4)',
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
        <div key={ 'editor-' + lang }>
          <div>
            { lang }
          </div>
          <pre id={ 'editor-' + lang } onKeyDown={ this.submitCode.bind(this, contents, lang) }>
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
        <section>
          <p>
            What is LISP?
          </p>
          <p>
            LISP is weafwefawefawe.
          </p>
        </section>
        <section>
          <p>
            Powerful Features of LISP
          </p>
          <ul>
            <li>
              <p>
                the list
              </p>
              <p>
                LISP programs are composed of a simple data structure:
                the list (hence LIS(t) Processing). A 'list' is a nonatomic combination of objects
                enclosed by a set of parentheses (hence Lots of Irritating Stupid Parentheses).
              </p>
            </li>
            <li>
              <p>
                the function
              </p>
              <p>
                Of course, other languages have functions, but Lisp is rare
                in allowing the creation of new functions <strong>while a
                program is running</strong>
              </p>
            </li>
          </ul>
        </section>
        <section>
          <p>
            Why is LISP used for solving AI problems?
          </p>
          <ul>
            <li>
              <p>
                popularity
              </p>
              <p>
                First, Lisp is the most popular language
                for AI programming, particularly in the United States.
                If you're going to learn a language, it might as well be
                one with a growing literature, rather than a dead tongue.
              </p>
            </li>
            <li>
              <p>
                flexibility
              </p>
              <p>
                In particular, Lisp makes it easy to
                define new languages especially targeted to the problem
                at hand. This is especially handy in AI applications, which
                often manipulate complex information that is most easily
                represented in some novel form. Lisp is one of the few
                languages that allows full flexibility in defining and
                manipulating programs as well as data.
              </p>
              <p>
                Lisp has a powerful macro facility, which
                can be used to extend the basic language. When new styles of
                programming were invented, other languages died out; Lisp
                simply incorporated the new styles by defining some new macros.
                The macro facility is possible because Lisp programs are composed
                of a simple data structure: the list.
              </p>
              <p>
                All programming languages, by definition,
                provide a means of defining programs, but many other
                languages limit the ways in which a program can be used, or
                limit the range of programs that can be defined, or require
                the programmer to explicitly state irrelevant details.
              </p>
              <div>
                { editors }
              </div>
              <p>
                In other languages you fit your problem <strong>to</strong> the language;
                with Lisp you <strong>extend</strong> the language to fit your problem
              </p>
            </li>
            <li>
              <p>
                prototypability
              </p>
              <p>
                Lisp makes it very easy to develop a working program fast.
                Lisp programs are concise and are uncluttered by low-level
                detail. Common Lisp offers an unusually large number of
                useful predefined objects, including over 700 functions.
                The programming environment (such as debugging tools,
                incremental compilers, integrated editors, and interfaces
                to window systems) that surround Lisp systems are usually
                very good. And the dynamic, interactive nature of Lisp
                makes it easy to experiment and change a program while it
                is being developed.
              </p>
            </li>
            <li>
              <p>
                Prolog
              </p>
              <p>
                It must be mentioned that in Europe and Japan,
                Prolog has been as popular as Lisp for AI work. Prolog shares most
                of Lisp's advantages in terms of flexibility and conciseness.
                Recently, Lisp has gained popularity worldwide, and Prolog
                is becoming more well known in the United States. As a result,
                the average AI worker today is likely to be bilingual.
              </p>
            </li>
          </ul>
        </section>
      </div>
    );
  }
});
