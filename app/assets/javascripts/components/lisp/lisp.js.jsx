/* globals React */
'use strict';

var Lisp = React.createClass({
  getInitialState: function() {
    return({
      contents: {
        'Pascal': {
          mode: 'pascal',
          keys: [-1, -1, -1],
          value: '/* Pascal */' +
          '\nvar temp, result: matrix;' +
          '\nadd(b.c, temp);' +
          '\nmult(a, temp, result);' +
          '\nreturn(result);'
        },
        'LISP': {
          mode: 'lisp',
          keys: [-1, -1, -1],
          value: ';;; LISP' +
          '\n(mult a (add b c))'
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
          <h3>
            { lang }
          </h3>
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
          <h3>
            What is LISP?
          </h3>
          <p>
            (Homoiconic code)
          </p>
        </section>
        <section>
          <h3>
            Powerful Features of LISP
          </h3>
          <h4>
            the list
          </h4>
          <p>
            LISP programs are composed of a simple data structure:
            the list (hence <strong>LIS</strong>t <strong>P</strong>rocessing).
            A 'list' is a nonatomic combination of objects enclosed by a set of
            parentheses (hence <strong>L</strong>ots of <strong>I</strong>rritating <strong>
            S</strong>tupid <strong>P</strong>arentheses).
          </p>
          <p>
            The list is a very versatile data structure, and while lists can be implemented in
            any language, Lisp makes it easy to use them. Many AI applications involve lists of
            constantly changing size, making fixed-length data structures like vectors harder to use.
          </p>
          <h4>
            the first-class function
          </h4>
          <p>
            Functions in LISP can not only be "called," or applied to arguments,
            they can also be manipulated just like any other kind of object.
            LISP was the first to implement this programming pattern of passing
            and returning of functions (called <strong>lambda expressions</strong>)
            within a program. Lambda expressions allow for the manipulation of and
            creation of new functions <strong>at run time</strong>. This powerful
            technique or <strong>closure</strong> is not possible in most
            programming languages.
          </p>
        </section>
        <section>
          <h3>
            Why is LISP used for solving AI problems?
          </h3>
          <h4>
            legacy
          </h4>
          <p>
            First, LISP is the most popular language
            for AI programming, particularly in the United States.
            If you're going to learn a language, it might as well be
            one with a growing literature, rather than a dead tongue.
          </p>
          <h4>
            flexibility
          </h4>
          <p>
            In particular, LISP makes it easy to
            define new languages especially targeted to the problem
            at hand. This is especially handy in AI applications, which
            often manipulate complex information that is most easily
            represented in some novel form. LISP is one of the few
            languages that allows full flexibility in defining and
            manipulating programs as well as data.
          </p>
          <p>
            LISP has a powerful macro facility, which
            can be used to extend the basic language. When new styles of
            programming were invented, other languages died out; LISP
            simply incorporated the new styles by defining some new macros.
            The macro facility is possible because LISP programs are composed
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
            with LISP you <strong>extend</strong> the language to fit your problem.
          </p>
          <h4>
            prototypability
          </h4>
          <p>
            LISP makes it very easy to develop a working program fast.
            LISP programs are concise and are uncluttered by low-level
            detail. Common LISP offers an unusually large number of
            useful predefined objects, including over 700 functions.
            The programming environment (such as debugging tools,
            incremental compilers, integrated editors, and interfaces
            to window systems) that surround LISP systems are usually
            very good. And the dynamic, interactive nature of LISP
            makes it easy to experiment and change a program while it
            is being developed.
          </p>
          <h3>
            <strong>In sum, these factors allow a programmer to delay
            making decisions.</strong>
          </h3>
          <p>
            The ability to delay decisions-or more accurately, to make
            temporary, nonbinding decisions-is usually a good thing,
            because it means that irrelevant details can be ignored.
          </p>
        </section>
        <section>
          <h4>
            Prolog
          </h4>
          <p>
            It must be mentioned that in Europe and Japan,
            Prolog has been as popular as LISP for AI work. Prolog shares most
            of LISP's advantages in terms of flexibility and conciseness.
            More recently LISP has gained popularity worldwide, and Prolog
            has become more well known in the United States. As a result,
            the average AI worker today is likely to be bilingual.
          </p>
        </section>
      </div>
    );
  }
});
