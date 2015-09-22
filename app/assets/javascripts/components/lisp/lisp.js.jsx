/* globals React */
'use strict';

var Lisp = React.createClass({
  getInitialState: function() {
    return({
      contents: {
        'pascal': {
          title: 'Pascal',
          mode: 'pascal',
          keys: [-1, -1, -1],
          output: '',
          value: '(* Pascal *)' +
          '\nvar temp, result: matrix;' +
          '\nadd(b.c, temp);' +
          '\nmult(a, temp, result);' +
          '\nreturn(result);'
        },
        'lisp': {
          title: 'LISP',
          mode: 'lisp',
          keys: [-1, -1, -1],
          output: '',
          value: ';;; LISP' +
          '\n;;; first define functions add and mult:' +
          '\n' +
          '\n(defun add (m1 m2)' +
          '\n  (let ((sum (make-array (array-dimensions m1))))' +
          '\n    (dotimes (i (array-total-size m1))' +
          '\n      (setf (row-major-aref sum i) ' +
          '\n            (+ (row-major-aref m1 i)' +
          '\n               (row-major-aref m2 i))))' +
          '\n  sum))' +
          '\n' +
          '\n(defun mult' +
          '\n  (a-matrix' +
          '\n   b-matrix' +
          '\n   &key' +
          '\n   (product' +
          '\n     (make-array' +
          '\n       (list (nth 0 (array-dimensions a-matrix))' +
          '\n             (nth 1 (array-dimensions b-matrix))))))' +
          '\n  (let ((m (nth 0 (array-dimensions a-matrix)))' +
          '\n        (n (nth 1 (array-dimensions b-matrix)))' +
          '\n        (common (nth 0 (array-dimensions b-matrix))))' +
          '\n    (dotimes (i m product)' +
          '\n      (dotimes (j n)' +
          '\n        (setf (aref product i j) 0.0)' +
          '\n        (dotimes (k common)' +
          '\n          (incf (aref product i j)' +
          '\n                (* (aref a-matrix i k) (aref b-matrix k j))))))))' +
          '\n' +
          '\n;;; next define matrices a, b, and c:' +
          '\n' +
          '\n(defvar a' +
          '\n  (make-array \'(2 3)' +
          '\n    :initial-contents \'((1 0 1) (1 2 3))))' +
          '\n(defvar b' +
          '\n  (make-array \'(2 3)' +
          '\n    :initial-contents \'((-2 2 3) (-1 0 4))))' +
          '\n(defvar c' +
          '\n  (make-array \'(3 2)' +
          '\n    :initial-contents \'((2 2) (0 -1) (0 3))))' +
          '\n' +
          '\n;;; now our result to a × ( b + c ) can be computed:' +
          '\n' +
          '\n(mult a (add b c))'
        },
        'homoiconic': {
          title: 'A Homoiconic Language',
          mode: 'lisp',
          keys: [-1, -1, -1],
          output: '',
          value:
          ';;;***************************************************************' +
          '\n;;;* ALL PROGRAMS AND EVERYTHING WITHIN ARE DATA ONE IN THE SAME *' +
          '\n;;;***************************************************************' +
          '\n' +
          '\n;;;  First we can define a function, \'foo\', that:' +
          '\n' +
          '\n;;;  1) receives a an argument, x,' +
          '\n;;;  1) adds the value 1 to that argument,' +
          '\n;;;  3) returns the result of that expression, x + 1' +
          '\n' +
          '\n  (defun foo (x) (+ x 1))' +
          '\n  ;;  returns => FOO' +
          '\n' +
          '\n;;;  Notice that the entire definition can be broken' +
          '\n;;;  down into embedded lists enclosed in parentheses:' +
          '\n' +
          '\n;;;  (defun foo (x) (+ x 1)) is a list where:' +
          '\n' +
          '\n;;;    - defun is the operator that denotes the definition of,' +
          '\n;;;      a new function' +
          '\n;;;    - foo is variable which will be assigned the function,' +
          '\n;;;    - (x) is a list of arguments that foo will receive, and' +
          '\n;;;    - (+ x 1) is a list comprising the function body where' +
          '\n;;;      the first element or \'atom,\' +, is the operator to be' +
          '\n;;;      performed on the arguments specified in the remaining' +
          '\n;;;      list atoms, x and 1' +
          '\n' +
          '\n;;;  Thus we can expect that if we pass the value 3 to foo,' +
          '\n;;;  foo will return the result of the expression 3 + 1, or 4:' +
          '\n' +
          '\n  (foo 3)' +
          '\n  ;;  returns => 4' +
          '\n' +
          '\n;;;  In this fashion we can define a new function, \'bar\', that' +
          '\n;;;  instead adds 2 to x:' +
          '\n' +
          '\n  (defun bar (x) (+ x 2))' +
          '\n  ;;  returns => BAR' +
          '\n  (bar 3)' +
          '\n  ;;  returns => 5' +
          '\n' +
          '\n;;;***************************************************************' +
          '\n;;;* here\'s where LISP departs from the traditional programming  *' +
          '\n;;;* paradigm:                                                   *' +
          '\n;;;***************************************************************' +
          '\n' +
          '\n;;;' +
          '\n;;;' +
          '\n' +
          '\n  (setf (symbol-function \'foo) #\'bar)' +
          '\n ;;  returns => #<FUNCTION BAR (X) (DECLARE (SYSTEM::IN-DEFUN BAR)) (BLOCK BAR (+ X 2))>' +
          '\n  (foo 3)' +
          '\n  ;;  returns => 5'
        }
      }
    });
  },
  componentDidMount: function () {
    var contents = this.state.contents;
    Object.keys(contents).forEach(function(thisEditor, i) {
      var editor = ace.edit('editor-' + thisEditor);
      editor.$blockScrolling = Infinity;
      editor.setTheme('ace/theme/terminal');
      editor.getSession().setMode('ace/mode/' + contents[thisEditor].mode);
      editor.getSession().setTabSize(2);
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false
      });
      if (i < 2) {
        editor.resize(true);
        editor.scrollToLine(editor.getValue().match(/\n/g).length);
      }
    });
  },
  submitCode: function (contents, thisEditor, key) {
    var sft = 13;
    var rtn = 16;
    var cmdL = 91;
    var cmdR = 93;
    var ctr = 17;
    contents[thisEditor].keys = contents[thisEditor].keys.slice(-2).concat(key.keyCode);
    var last3 = contents[thisEditor].keys;
    var submitted = [cmdL, cmdR, ctr].map(function(key) {
      return [key, sft, rtn];
    }).some(function(keys) {
      return !(!~last3.indexOf(keys[0]) || !~last3.indexOf(keys[1]) || !~last3.indexOf(keys[2]));
    });
    if (submitted) {
      var evalUrl = this.props.urls.evaluate[contents[thisEditor].mode];
      ajax.get(
        evalUrl,
        { input: ace.edit('editor-' + thisEditor).getValue() },
        function(output) {
          contents[thisEditor].output = output;
          contents[thisEditor].keys = [-1, -1, -1];
          this.setState({
            contents: contents
          });
        }.bind(this),
        true
      );
    } else {
      this.setState({
        contents: contents
      });
    }
  },
  render: function() {
    var contents = this.state.contents;
    var editors = Object.keys(contents).map(function(thisEditor) {
      return(
        <div key={ 'editor-' + thisEditor } className={ 'editor ' + thisEditor }>
          <h3>
            { contents[thisEditor].title }
          </h3>
          <pre id={ 'editor-' + thisEditor } onKeyDown={ this.submitCode.bind(this, contents, thisEditor) }>
            { contents[thisEditor].value }
          </pre>
          <code>
            <abbr title='hold (cmd or ctr) + shift + return to evaluate'>
              output:&nbsp;&nbsp;
            </abbr>
            <div>
              { contents[thisEditor].output }
            </div>
          </code>
        </div>
      );
    }.bind(this));

    return(
      <div>
        <div className='nav header'>
          <span onClick={ this.props.goBack }>
            back
          </span>
          { this.props.downloadPdf }
        </div>
        { this.props.title }
        <section>
          <h3>
            What is LISP?
          </h3>
          <p>
            LISP is the first programming language to arise from a family
            of languages developed for the purpose of expressing mathematical
            notation with minimal semantics and syntax. Developed in 1958,
            LISP is the second-oldest high-level programming language in
            widespread use today (FORTRAN takes first with a birthday in '57).
          </p>
          <h4>
            A Brief History
          </h4>
          <p>
            In the late 1950s the first machine-independent languages were
            created with the the intention of expanding accessibility. As a
            result, design of these languages, such as FORTRAN, BASIC, and C,
            wound up borrowing heavily from older ideas and one another, and
            were "...thrown together in a way that lacked any real beauty."
          </p>
          <p>
            Independent from the design purposes of pragmaticality or reducing
            the novice entry barrier were a
          </p>
        </section>
        <section>
          <h3>
            Powerful Features of LISP
          </h3>
          <h4>
            Uniform Syntax
          </h4>
          <p>
            The syntax of Lisp programs is simple. This makes the language easy to learn,
            and very little time is wasted correcting typos. In addition, it is easy to
            write programs that <strong>manipulate other programs</strong> or <strong>
            define whole new languages</strong>.
          </p>
          <h4>
            The List
          </h4>
          <p>
            LISP programs are composed of a simple data structure:
            the list (hence <strong>LIS</strong>t <strong>P</strong>rocessing).
            A list is a nonatomic combination of objects enclosed by a set of
            parentheses (hence <strong>L</strong>ots of <strong>I</strong>rritating <strong>
            S</strong>tupid <strong>P</strong>arentheses).
            The list is a very versatile data structure, and while lists can be implemented in
            any language, Lisp makes it easy to use them. Many AI applications involve lists of
            constantly changing size, making fixed-length data structures like arrays harder to use.
          </p>
          <h4>
            The First-Class Function
          </h4>
          <p>
            Functions in LISP can not only be "called," or applied to arguments,
            they can also be manipulated just like any other kind of object.
            LISP was the first to implement this programming pattern of passing
            and returning of functions (called <strong>lambda expressions</strong>)
            within a program. Lambda expressions allow for the manipulation of and
            creation of new functions <strong>at run time</strong>. This powerful
            technique or <strong>closure</strong> is not possible in most
            traditional programming languages.
          </p>
          <h4>
            Interactive Environment
          </h4>
          <p>
            Traditionally, a programmer would write a complete program, compile it,
            correct any errors detected by the compiler, and then run and debug it.
            For long programs, waiting for the compiler occupied a large portion of
            the debugging time. In Lisp one normally writes a few small functions at
            a time, getting feedback from the Lisp system after evaluating each one.
            Accordingly, LISP has an <strong>interactive environment</strong> rather
            than a batch mode of interaction common among traditional languages
            and is condusive to prototyping and agile development.
          </p>
        </section>
        <section>
          <h3>
            Why is LISP used for solving AI problems?
          </h3>
          <p>
            AI programming is largely exploratory programming; the aim
            is often to discover more about the problem area rather than
            to meet a clearly defined specification. This is in contrast
            to a more traditional notion of programming, where the problem
            is completely specified before the first line of code is written.
          </p>
          <h4>
            Legacy
          </h4>
          <p>
            First, LISP is the <strong>most popular language
            for AI programming</strong>, particularly in the United States.
            If you're going to learn a language, it might as well be
            one with a growing literature, rather than a dead tongue.
          </p>
          <h4>
            Flexibility
          </h4>
          <p>
            In particular, LISP makes it easy to
            define new languages especially <strong>targeted to the problem
            at hand</strong>. This is especially handy in AI applications, which
            often manipulate complex information that is most easily
            represented in some novel form. LISP is one of the few
            languages that allows full flexibility in defining and
            manipulating programs as well as data.
          </p>
          <p>
            All programming languages, by definition,
            provide a means of defining programs, but many other
            languages limit the ways in which a program can be used, or
            limit the range of programs that can be defined, or require
            the programmer to explicitly state irrelevant details. Time
            spent providing type declarations and allocating storage adds
            up in longer programs, and these minutiae are <strong>avoided entirely</strong> in
            LISP. For instance, take the trivial problem of computing <var>a</var> × ( <var>
            b</var> + <var>c</var> ) when <var>a</var>, <var>b</var>, and <var>
            c</var> are matrices. Compare below how this is addressed in Pascal, a more
            traditional language, versus LISP.
          </p>
          <div>
            { editors.slice(0, 2) }
          </div>
          <p>
            In other languages you fit your problem <strong>to</strong> the language;
            with LISP you <strong>extend</strong> the language to fit your problem.
          </p>
          <h4>
            Homoiconicity
          </h4>
          <p>
            Homoiconicity is a fancy computer science term where a program is
            homoiconic if its internal representation can be inferred by reading
            the text's layout. In other words, the primary representation of the
            program is also a data structure in a primitive type of the language
            itself. LISP was the first language to incorporate this trait,
            as LISP programs and all objects and data within are represented
            as embedded lists:
          </p>
          <div>
            { editors.slice(-1) }
          </div>
          <h4>
            Extensibility
          </h4>
          <p>
            LISP has a powerful macro facility, which
            can be used to extend the basic language. When new styles of
            programming were invented, other languages died out;
            LISP simply <strong>incorporated the new styles</strong> by
            defining some new macros. The macro facility is possible because
            LISP programs are composed of a simple data structure: the list.
          </p>
          <h4>
            Prototypability
          </h4>
          <p>
            LISP makes it very easy to develop a working program fast.
            LISP programs are concise and are uncluttered by low-level
            detail. Common LISP, the most widely adopted LISP 'dialect,'
            offers an unusually large number of
            useful predefined objects, including over 700 functions.
            The programming environment (such as debugging tools,
            incremental compilers, integrated editors, and interfaces
            to window systems) that surround LISP systems are usually
            very good. And the dynamic, interactive nature of LISP
            makes it <strong>easy to experiment and change
            a program while it is being developed</strong>.
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
        { this.props.buzzwordBank }
      </div>
    );
  }
});
