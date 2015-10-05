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
          lineStart: 1,
          loading: false,
          value:
          '{' +
          '\n  ***********************************************' +
          '\n  *         HANDLING MATRICES IN PASCAL         *' +
          '\n  ***********************************************' +
          '\n}' +
          '\n// First define functions add and mult:' +
          '\n' +
          '\n// adds two matrices x and y, then returns the result' +
          '\nFunction add(x : matrix; y : matrix) : matrix;' +
          '\nvar a, b, result : matrix;' +
          '\nbegin' +
          '\n    a := x;' +
          '\n    b := y;' +
          '\n' +
          '\n    new(result);' +
          '\n    result^.m := a^.m;' +
          '\n    result^.n := a^.n;' +
          '\n' +
          '\n    for m := 1 to a^.m do for n := 1 to a^.n do' +
          '\n        result^.mat[m, n] := a^.mat[m, n] + b^.mat[m, n];' +
          '\n    add := result;' +
          '\nend;' +
          '\n' +
          '\n' +
          '\n// multiplies two matrices x and y, then returns the result' +
          '\nFunction mult(x : matrix; y : matrix) : matrix;' +
          '\nvar a, b, result : matrix;' +
          '\nbegin' +
          '\n    a := x;' +
          '\n    b := y;' +
          '\n' +
          '\n    new(result);' +
          '\n    result^.m := a^.m;' +
          '\n    result^.n := b^.n;' +
          '\n' +
          '\n    for m:= 1 to a^.m do' +
          '\n        for n := 1 to b^.n do' +
          '\n        begin' +
          '\n        result^.mat[m,n] := 0;' +
          '\n        for i := 1 to a^.n do' +
          '\n        result^.mat[m,n] := a^.mat[m,i] * b^.mat[i,n] + result^.mat[m,n];' +
          '\n        end;' +
          '\n    mult := result;' +
          '\nend;' +
          '\n' +
          '\n// Next intialize variables a, b,' +
          '\n// and c and storage variables temp' +
          '\n// and result as matrix type' +
          '\nvar a, b, c, temp, result: matrix;' +
          '\ntemp := add(b, c);' +
          '\nresult := mult(a, result);' +
          '\nreturn(result);'
        },
        'lisp': {
          title: 'LISP',
          mode: 'lisp',
          keys: [-1, -1, -1],
          output: '',
          lineStart: 39,
          loading: false,
          value:
          ';;; *********************************************' +
          '\n;;; *         HANDLING MATRICES IN LISP         *' +
          '\n;;; *********************************************' +
          '\n;;; First define functions add and mult:' +
          '\n' +
          '\n;;; adds two matrices x and y, then returns the result' +
          '\n(defun add (x y)' +
          '\n    (let ((sum (make-array (array-dimensions x))))' +
          '\n        (dotimes (i (array-total-size x))' +
          '\n            (setf (row-major-aref sum i)' +
          '\n                (+ (row-major-aref x i)' +
          '\n                   (row-major-aref y i))))' +
          '\n    sum))' +
          '\n' +
          '\n;;; multiplies two matrices x and y, then returns the result' +
          '\n(defun mult (x y &key' +
          '\n    (product (make-array' +
          '\n        (list (nth 0 (array-dimensions x))' +
          '\n            (nth 1 (array-dimensions y))))))' +
          '\n    (let ((m (nth 0 (array-dimensions x)))' +
          '\n        (n (nth 1 (array-dimensions y)))' +
          '\n        (common (nth 0 (array-dimensions y))))' +
          '\n        (dotimes (i m product)' +
          '\n            (dotimes (j n)' +
          '\n                (setf (aref product i j) 0.0)' +
          '\n                (dotimes (k common)' +
          '\n                    (incf (aref product i j)' +
          '\n                        (* (aref x i k) (aref y k j))))))))' +
          '\n' +
          '\n;;; Next set the values of matrices a, b,' +
          '\n;;; and c:' +
          '\n' +
          '\n(setf a' +
          '\n    (make-array \'(2 3)' +
          '\n        :initial-contents \'((1 0 1) (1 2 3))))' +
          '\n(setf b' +
          '\n    (make-array \'(2 3)' +
          '\n        :initial-contents \'((-2 2 3) (-1 0 4))))' +
          '\n(setf c' +
          '\n    (make-array \'(3 2)' +
          '\n        :initial-contents \'((2 2) (0 -1) (0 3))))' +
          '\n' +
          '\n;;; With the definitions and setting taken' +
          '\n;;; care of, a × ( b + c ) can be computed' +
          '\n;;; with a single pair of S-expressions:' +
          '\n' +
          '\n  (mult a (add b c))' +
          '\n  ;;  returns => #2A((0.0 4.0 3.0) (-4.0 4.0 17.0))' +
          '\n' +
          '\n;;; where #2A indicates that the result' +
          '\n;;; is a 2D array (a matrix). Incidentally' +
          '\n;;; if a, b, and c where simple numbers:' +
          '\n' +
          '\n  (setf a 25)' +
          '\n  (setf b 42)' +
          '\n  (setf c -4)' +
          '\n' +
          '\n;;; the computation of a × ( b + c ) would' +
          '\n;;; look the same after swapping the matrix' +
          '\n;;; functions for the basic multiplication' +
          '\n;;; and addition functions * and +:' +
          '\n' +
          '\n  (* a (+ b c))' +
          '\n  ;;  returns => 950' +
          '\n' +
          '\n;;; As such...' +
          '\n' +
          '\n;;; *********************************************' +
          '\n;;; *        DATA STRUCTURES ARE HANDLED        *' +
          '\n;;; *    IDENTICALLY TO PRIMITIVE DATA TYPES    *' +
          '\n;;; *            IN LISP EXPRESSIONS            *' +
          '\n;;; *********************************************'
        },
        'homoiconic': {
          title: 'A Homoiconic Language',
          mode: 'lisp',
          keys: [-1, -1, -1],
          output: '',
          lineStart: 0,
          value:
          ';;; With LISP we can define a function, square, that:' +
          '\n' +
          '\n;;; 1) receives a an argument, x,' +
          '\n;;; 1) multiplies that argument by itself, and' +
          '\n;;; 3) returns the result of that expression x²' +
          '\n' +
          '\n  (defun square (x) (* x x))' +
          '\n  ;;  returns => SQUARE' +
          '\n' +
          '\n;;; Notice that the entire definition can be broken' +
          '\n;;; down into embedded lists enclosed in parentheses' +
          '\n;;; called S-expressions:' +
          '\n' +
          '\n;;; (defun square (x) (* x x)) is a list where:' +
          '\n' +
          '\n;;;   - defun is the operator that denotes the definition of,' +
          '\n;;;     a new function' +
          '\n;;;   - square is symbol to which the function will be assigned,' +
          '\n;;;   - (x) is a list of arguments that square will receive, and' +
          '\n;;;   - (* x x) is a list comprising the function body where' +
          '\n;;;     the first element or "atom", *, is the operator to be' +
          '\n;;;     performed on the arguments specified as the remaining' +
          '\n;;;     atoms, x and x' +
          '\n' +
          '\n;;; This is possible because...' +
          '\n' +
          '\n;;; ******************************************************************' +
          '\n;;; *               ALL PROGRAMS AND EVERYTHING WITHIN               *' +
          '\n;;; *                    ARE DATA ONE IN THE SAME                    *' +
          '\n;;; ******************************************************************'
        },
        'prototypable': {
        title: 'A Prototypable Language',
        mode: 'lisp',
        keys: [-1, -1, -1],
        output: '',
        lineStart: 20,
        loading: false,
        value:
          ';;; **************** RANDOM PLATE GENERATOR FUNCTIONS ****************' +
          '\n' +
          '\n(defun rand-elt (choices)' +
          '\n    (elt choices (random (length choices))))' +
          '\n' +
          '\n(defun rand-btwn (min max)' +
          '\n    (+ min (random (coerce (- max min) \'float))))' +
          '\n' +
          '\n(defun rand-plate ()' +
          '\n    (let* ((rand-shape (rand-elt (mapcar #\'car shapes-areas)))' +
          '\n        (rand-dims (loop :repeat' +
          '\n            (if (eq rand-shape \'trapezoid) 3' +
          '\n                (if (find rand-shape \'(square circle)) 1 2))' +
          '\n            :collect (rand-btwn dim-min dim-max))))' +
          '\n    (cons rand-shape rand-dims)))' +
          '\n' +
          '\n(defun samp-plates (num-plates)' +
          '\n    (loop :repeat num-plates :collect (rand-plate)))' +
          '\n' +
          '\n;;; **************** RANDOM PLATE GENERATOR FUNCTIONS ****************' +
          '\n' +
          '\n;;; Recall our new function, square, from the example above:' +
          '\n' +
          '\n  (defun square (x) (* x x))' +
          '\n  ;;  returns => SQUARE' +
          '\n' +
          '\n;;; We can expect that if we pass the value 3 to square, it' +
          '\n;;; will return the result of the expression 3 * 3, or 3²:' +
          '\n' +
          '\n  (square 3)' +
          '\n  ;;  returns => 9' +
          '\n' +
          '\n;;; Simple enough. With this we can calculate the square of any' +
          '\n;;; value we pass to it.  Nothing your dime-a-dozen traditional' +
          '\n;;; programming language can\'t handle.' +
          '\n' +
          '\n;;; However, suppose we needed to write a program that needed to' +
          '\n;;; calculate the average surfce area of a large set of 2d plates.' +
          '\n;;; For the purposes of our simple program, a plate can be' +
          '\n;;; adequately represented by two properties:' +
          '\n' +
          '\n;;;   1) shape (i.e. square, circle, etc..)' +
          '\n;;;   2) dimension (some positive number, i.e. radius = 2.2)' +
          '\n' +
          '\n;;; Our program must not only account for a wide range of valid' +
          '\n;;; dimensions, but needs to handle a variety of shapes as well.' +
          '\n;;; the structure of our program might look something like this:' +
          '\n' +
          '\n;;; 1) read input set of plates' +
          '\n;;; 2) calculate the area of each plate' +
          '\n;;; 3) calculate the average of these areas' +
          '\n;;; 4) return output average' +
          '\n' +
          '\n;;; ******************************************************************' +
          '\n;;; *   HERE\'S WHERE LISP DEPARTS FROM THE TRADITIONAL PROGRAMMING   *' +
          '\n;;; *                           PARADIGM                             *' +
          '\n;;; ******************************************************************' +
          '\n' +
          '\n;;; If we were abiding to the imperative programming patterns of' +
          '\n;;; traditional programming languages, the structure of our' +
          '\n;;; "calculate area" step would involve writing a named function' +
          '\n;;; for calculating the area of every expected shape in advance' +
          '\n;;; (i.e. area-square, area-circle, ...), followed by a gigantic' +
          '\n;;; conditional statement:' +
          '\n' +
          '\n;;;   is this plate a square? => call area-square using plate dim' +
          '\n;;;   is this plate a circle?  => call area-circle using plate dim' +
          '\n;;;   .' +
          '\n;;;   .' +
          '\n;;;   .' +
          '\n;;;   is this plate a (last expected shape)? => ...' +
          '\n' +
          '\n;;; Such repetition is tedious and brittle in response to change of' +
          '\n;;; input:  What if sometime in the future our program needed' +
          '\n;;; to handle a new shape? What if the area of this new shape' +
          '\n;;; depended on more than one dimension (i.e. rectangle)?' +
          '\n;;; Updating our program would require 3 fixes:' +
          '\n' +
          '\n;;; 1) write new function for shape' +
          '\n;;; 2) bolt another condition to giant statement to handle the shape' +
          '\n;;; 3) tweak all parts of program that depended on plates having just' +
          '\n;;;    one dimension' +
          '\n;;; 4) debug and recompile the entire program' +
          '\n' +
          '\n;;; Simple enough if we\'re dealing with just 3 shapes, however,' +
          '\n;;; the additional time and effort required for fix #3 exponentiates' +
          '\n;;; with the size of the program and soon grows out of hand. Fix' +
          '\n;;; #4 additionally becomes bothersome in larger programs, and' +
          '\n;;; seems especially wasteful if our plate calculator were just a' +
          '\n;;; tiny function of a much larger program.' +
          '\n' +
          '\n;;; As you can see, the design process of programming in a' +
          '\n;;; traditionallanguage relies heavily on the knowledge of the exact' +
          '\n;;; nature of its input ahead of time and becomes unmaintainable when' +
          '\n;;; dealing with data whose nature is dynamic, patternless, or unknown.' +
          '\n' +
          '\n;;; A program written in LISP, however, can conquer these datasets' +
          '\n;;; practically and with elegantly fewer lines of code. LISP\'s' +
          '\n;;; homoiconicity makes it simple to implement the "data-driven"' +
          '\n;;; programming paradigm, meaning that:' +
          '\n' +
          '\n;;; *****************************************************************' +
          '\n;;; *   A LISP program can better                                   *' +
          '\n;;; *                                                               *' +
          '\n;;; *                      RESPOND TO THE DATA                      *' +
          '\n;;; *                                                               *' +
          '\n;;; *   at run time rather than needing to                          *' +
          '\n;;; *                                                               *' +
          '\n;;; *                      ANTICIPATE THE DATA                      *' +
          '\n;;; *                                                               *' +
          '\n;;; *   beforehand in its design.                                   *' +
          '\n;;; *****************************************************************' +
          '\n' +
          '\n;;; With this philosophy in mind, here\'s how our plate calculator in' +
          '\n;;; LISP might look:' +
          '\n' +
          '\n(defparameter shapes-areas' +
          '\n    (list (cons \'square #\'(lambda (s) (square s)))' +
          '\n        (cons \'circle #\'(lambda (r) (* pi (square r))))' +
          '\n        (cons \'triangle #\'(lambda (b h) (* 1/2 b h)))' +
          '\n        (cons \'rectangle #\'(lambda (w l) (* w l)))' +
          '\n        (cons \'ellipse #\'(lambda (a b) (* pi a b)))' +
          '\n        (cons \'trapezoid #\'(lambda (b1 b2 h) (* 1/2 (+ b1 b2) h)))))' +
          '\n(defparameter dim-min 0)' +
          '\n(defparameter dim-max 100)' +
          '\n' +
          '\n(defun avg (list)' +
          '\n    (/ (apply #\'+ list) (length list)))' +
          '\n' +
          '\n(defun area-plate (plate)' +
          '\n    (apply (cdr (assoc (car plate) shapes-areas))' +
          '\n        (cdr plate)))' +
          '\n' +
          '\n(avg (mapcar #\'area-plate (samp-plates 10)))' +
          '\n' +
          '\n;;; Aside from samp-plates used to generator some test data' +
          '\n;;; (defined at the top of the editor), just two functions,' +
          '\n;;; avg and area-plate, can handle the calculation of 6' +
          '\n;;; different shapes of plates having anywhere from 1 to' +
          '\n;;; 3 characteristic dimensions. This flexibility is made' +
          '\n;;; possible by the incorporation of LISP\'s lambda' +
          '\n;;; (anonymous function) macro, which allows the function' +
          '\n;;; area-plate to...' +
          '\n' +
          '\n;;; *****************************************************************' +
          '\n;;; *                     CHANGE DURING RUNTIME                     *' +
          '\n;;; *****************************************************************' +
          '\n' +
          '\n;;; according to the area formula of its argument plate\'s shape.' +
          '\n' +
          '\n;;; In addition to the advantages of brevity and diminished' +
          '\n;;; repetition, the only change to our program required to handle' +
          '\n;;; an additional shape would involve adding a new entry to the' +
          '\n;;; parameter shapes-areas, which serves as a look-up table' +
          '\n;;; associating a plate\'s shape with its proper area formula.' +
          '\n;;; As such, only the parameter shapes-areas need be recompiled,' +
          '\n;;; decoupling the traditional wastefulness of needing to' +
          '\n;;; recompile the entire program for every tweak.'
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
      editor.getSession().setTabSize(4);
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: false
      });
      editor.resize(true);
      editor.scrollToLine(contents[thisEditor].lineStart);
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
      contents[thisEditor].loading = true;
      this.setState({ contents: contents },
        ajax.get(
          this.props.urls.evaluate[contents[thisEditor].mode],
          { input: ace.edit('editor-' + thisEditor).getValue().replace(/\n;;;.*/g, '') },
          function(output) {
            contents[thisEditor].output = output;
            contents[thisEditor].keys = [-1, -1, -1];
            contents[thisEditor].loading = false;
            this.setState({ contents: contents }, document.body.removeAttribute('class'));
          }.bind(this),
          true
        )
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
      var editorClass = 'ace_editor ace_dark ace-terminal-theme';
      var outputClass = '';
      if (contents[thisEditor].loading) {
        editorClass += ' loading';
        outputClass += ' loading';
      }
      return(
        <div key={ 'editor-' + thisEditor } className={ 'editor ' + thisEditor }>
          <h3>
            { contents[thisEditor].title }
          </h3>
          <pre id={ 'editor-' + thisEditor } className={ editorClass } onKeyDown={ this.submitCode.bind(this, contents, thisEditor) }>
            { contents[thisEditor].value }
          </pre>
          <code>
            <abbr title='hold (cmd or ctr) + shift + return to evaluate'>
              returns =>&nbsp;
            </abbr>
            <div className={ outputClass }>
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
            widespread use today (FORTRAN takes first with a '57 birhday).
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
            the novice entry barrier, LISP's development strove to push the
            limits of language design. Posing questions about program notation,
            language semantics, and the simplest possible language syntax, LISP
            did not emerge as an improvement on previous programming languages but rather is said
            to have evolved "straight from mathematics".
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
            write programs that manipulate other programs (called <strong>metaprogramming</strong>)
            or <strong>define whole new languages</strong>.
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
            b</var> + <var>c</var> ) where <var>a</var>, <var>b</var>, and <var>
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
            as <strong>S-expressions</strong> or embedded lists:
          </p>
          <div>
            { editors[2] }
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
            a program while it is being developed:</strong>.
          </p>
          <div>
            { editors[3] }
          </div>
          <h3>
            <strong>In sum, these factors allow a programmer to delay
            making decisions.</strong>
          </h3>
          <p>
            The ability to delay decisions-or more accurately, to make
            temporary, nonbinding decisions-is usually a good thing
            because it means that irrelevant details can be ignored, and,
            in sum, results in an elegantly succinct and robust program.
          </p>
        </section>
        <section>
          <h3>
            CycL
          </h3>
          <p>
            WIP
          </p>
        </section>
        <section>
          <h3>
            Prolog
          </h3>
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
