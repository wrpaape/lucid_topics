class Hash
  def create_and_assign_topics_return_lamba
    related = delete(:related)
    query = { title: delete(:topics) } if has_key?(:topics)
    buzzword = Buzzword.create(self)
    buzzword.topics << Topic.where(query)
    -> { catch(:dupe) { buzzword.relateds << Buzzword.where(word: related) } }
  end
end

Topic.create([
  {
    title: "LISP",
    component: "Lisp",
    filename: "lisp"
  },
  {
    title: "Neural Networks",
    component: "NeuralNetworks",
    filename: "neural_networks"
  },
  {
    title: "Databases",
    component: "Databases",
    filename: "databases"
  },
  {
    title: "Machine Learning",
    component: "MachineLearning",
    filename: "machine_learning"
  }
])

buzzwords = [
  {
    word: "Array",
    note:
"""
An array is data structure consisting of a collection of elements or atoms with each
atom identified by a unique index or key. The simplest type of data structure is the linear or
one-dimensional array, which can be modeled as a continuous container housing its atoms in
a series of numbered boxes:
*safe*

```
elements:  [ \"I'm first\" , 42 , x , ... , \"I will always be last\" ]
indices:   [      0      ,  1 , 2 , ... ,            N            ]
```

pros:
- excels at random access \"look ups\"
- sequencial iteration over its elements is noticeably faster than other data structures
- light on memory

cons:
- (traditionally) dimension is fixed at runtime
- consequencially, insert/delete/append operations not possible


#### *better at \"getting\" and \"setting\", but flexibility/adaptability is inhibited by fixed length*
*safe*
""",
    topics: ["LISP"],
    related: ["List", "Vector", "Nonatomic Data Structure", "Fixed-Length Data Structure"]
  },
  {
    word: "List",
    note:
"""
A list is an abstract data type that represents an ordered sequence of not necessarily unique atoms
(and elements). Lists are most commonly implemented as \"linked lists\", consisting of a cluster of
separated container nodes chained together by references:
*safe*

```
nodes:  ==>[ 23 | ●=]==>[ \"hello world\" | ●=]==>[ my-function | ●=]==>
            atom|ref          atom      |ref        element   |ref
```

pros:
- can insert/delete an element or splice at anywhere in the list with constant speed regardless of its size
- has no fixed length, program will not be limited by or crash due to \"index out of bounds\" error
- moderate memory cost

cons:
- not good for random access (can't \"look up\" an element but rather must traverse the list one by one)
- same inefficient tranversal must be made for appending an element at the list end


#### *better at adding and removing, worse at \"getting\" and \"setting\"*
*safe*
""",
    topics: ["LISP"],
    related: ["Array", "Vector", "Nonatomic Data Structure", "S-expression"]
  },
  {
    word: "Vector",
    note:
"""
A vector is a sequencial container data structure similar to the array with
the exception that they can change in size. Just like array, vectors use contiguous
storage locations (indices or keys) for their elements:
*safe*

```
elements:  [ \"I'm first\" , foo , bar , ... , \"I'm last (for now)\" ]
indices:   [     0       ,  1  ,  2  , ... ,          n           ]
```

*safe*
However, vectors consume more memory than arrays as the dynamic allocation
of their storage must be handled internally.
*safe*

pros:
- excels at random access \"look ups\" and sequencial iteration (same as array)
- robust handling of data as its size can change dynamically

cons:
- though append is supported, insert/delete operations still not possible
- memory intensive


#### *shares the retrieval speed of the array and the variable length of the list, but must occupy more memory as compensation*
*safe*
""",
    topics: ["LISP"],
    related: ["Array", "List", "Nonatomic Data Structure"]
  },
  {
    word: "Atom (Element)",
    note:
"""
While the definition of the atom can vary depending on language and context,
the original definition by John McCarthy applies most appropriately to LISP:

> It was assumed that there existed *\"an infinite set of distinguishable atomic symbols\"*
which can be represented as *\"strings of captial Latin letters and digits with single embedded blanks\"*.
*safe*

In other words, an atom is one of two fundamental units of data expression:
- character string (i.e. `\"Hello world, I am an atom\"`), or
- numeric literal (i.e. `470`)


*safe*
That being said, the term *atom* is often loosely interpretted and commonly referred to as
an *element*, a broader term including fundamental units such as functions and variables.
In most practical contexts *atom* and *element* can be used interchangably.
""",
    topics: ["LISP"],
    related: ["Primitive Data Type", "S-expression", "List", "Common LISP"]
  },
  {
    word: "Primitive Data Type",
    note:
"""
In computer science, a primitive data type can be classified as either a *basic type*, which is
provided by a programming language as a basic building block, or a *built-in type*,
for which the programming language provides built-in support. In LISP, an atom is the basic primitive
data type, while nonatomic data structures such as a list are considered built-in types.
""",
    topics: ["LISP"],
    related: ["Atom (Element)", "Nonatomic Data Structure", "List"]
  },
  {
    word: "S-expression",
    note:
"""
An S-expression (**S**ymbolic **expression**) is a notation for nested list (tree-structured) data
invented for and popularized by LISP. Using standard LISP parentheses syntax, an S-expression
is classically defined as:

*safe*
1. an atom, or
2. an expression of the form `(x . y)`
*safe*

where `(x . y)` is a list containing a \"dotted pair\" with `.` denoting that the node
housing the atom `x` references the node housing the atom `y`. Recalling the
visual model of a list, fundamentally `(x . y)` can be expressed as a two node sequence:
*safe*

```
nodes:  [ x | ●=]==>[ y ]
        atom|ref    atom
```

*safe*
in Common LISP. In Scheme, the second principle dialect of LISP, the S-expression
of `(x . y)` would be expressed as `(x . (y . NIL))`, where a reference to NIL indicates
the end of a list:
*safe*

```
nodes:  [ x | ●=]==>[ y | ●=]==>NIL
        atom|ref    atom|ref
```


#### *Because LISP employs S-expressions as the sole representation of source code as well as data, LISP is homoiconic.*
*safe*
""",
    topics: ["LISP"],
    related: ["Atom (Element)", "Primitive Data Type", "List", "Syntax", "Common LISP", "Tree Data Structure"]
  },
  {
    word: "Common LISP",
    note:
"""
Known for its extreme flexibility, excellent support for a healthy selection of programming paradigms, and fast
prototyping capabilities, Common LISP has vied with Scheme as the more popular of the two principal LISP dialects
since its standardized release in 1986. Common LISP has a large standard library of predefined functions and other
tools \"out-of-the-box\" that aid in getting new programs up and running quickly rather than having to start
completely from scratch.
""",
    topics: ["LISP"],
    related: ["S-expression", "List", "Atom (Element)", "Common LISP"]
  },
  {
    word: "Data Driven Programming",
    note:
"""
Rather than the traditional means of defining a series of steps to be taken when processessing input data from program start to end,
data-driven programming is a programming paradigm characterized by **reacting** to the data provided (usually through pattern matching)
followed by the processing steps defined for handling that particular chunk of data.
""",
    topics: ["LISP"],
    related: ["S-expression", "List", "Common LISP"]
  },
  {
    word: "Tree Data Structure",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["S-expression", "List", "Common LISP"]
  },
  {
    word: "Compile",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["Debug"]
  },
  {
    word: "Fixed-Length Data Structure",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["Array"]
  },
  {
    word: "Nonatomic Data Structure",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["List", "Array", "Vector"]
  },
  {
    word: "Debug",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["Compile"]
  },
  {
    word: "Function",
    note:
"""
WIP
""",
    topics: ["LISP", "Neural Networks"],
    related: ["Linear Function", "Nonlinear Function"]
  },
  {
    word: "High-Level",
    note:
"""
High-Level is a term used to classify a description of a system that is more abstracted,
describes overall goals and systemic features, and is typically more concerned
with the system as a whole, or larger components of it. LISP, for example, is
considered a high-level programming language because it allows a programmer to
not concern themselves with the \"1s and 0s\" or more concrete details of interacting
with a computer such as memory allocation.
""",
    topics: ["LISP", "Neural Networks"],
    related: ["Low-Level"]
  },
  {
    word: "Low-Level",
    note:
"""
Low-Level is a term used to classify a description of a system that delves into
the function of individual components and how they operate, favoring detail rather
than overview. A low-level description of the sensation of touch, for instance, would
cover the anatomy of an individual neuron.
""",
    topics: ["LISP"],
    related: ["High-Level"]
  },
  {
    word: "Ontology",
    note:
"""
In computer science and information science, an ontology is a formal naming and definition of the types, properties, and interrelationships
of the entities that really or fundamentally exist for a particular domain of discourse.
It is thus a practical application of philosophical ontology, with a taxonomy. Ontologies
are created to aid in reducing complexity and organizing information so that problem solving
techniques can be applied more practically on large and loosely structured datasets.
*safe*

Most ontologies describe **individuals** (instances), **classes** (concepts), **attributes**, and **relations**:
<dl>
  <dt>**individuals**</dt>
    <dd>instances or objects (the basic or \"ground level\" objects)</dd>
    <dd>`Reid Paape`, `Frost Bank Tower`</dd>
  <dt>**classes**</dt>
    <dd>sets, collections, concepts, classes in programming, types of objects, or kinds of things</dd>
    <dd>`Person`, `Office Building`</dd>
  <dt>**attributes**</dt>
    <dd>aspects, properties, features, characteristics, or parameters that objects (and classes) can have</dd>
    <dd>`clumsy`, `515 ft`</dd>
  <dt>**relations**</dt>
    <dd>ways in which classes and individuals can be related to one another</dd>
    <dd>`is a`, `is located in`</dd>
</dl>

*safe*
Ontologies are usually visualized in one of two ways:

<div class='inline'>
  **graph**<br /><sup>(better for creating mappings)</sup>
  <img src='graph.png'>
</div><div class='inline'>
  **indented tree**<br /><sup>(better for evaluating mappings)</sup>
  <img src='indented_tree.png'>
</div>
""",
    topics: ["LISP", "Databases"],
    related: ["Semantics", "Common LISP", "Ontology Language"]
  },
  {
    word: "Ontology Language",
    note:
"""
Ontology languages are formal languages used to construct ontologies. They allow the encoding
of knowledge about specific domains and often include reasoning rules that support the
processing of that knowledge.
*safe*

\"defining an individual\" by declaring instance \"Reid Paape\" a member of a class \"Person\" in three ontology languages:
<dt>The Web Ontology Language (OWL)</dt>
```
<owlx:Individual owlx:name=\"Reid Paape\"> 
  <owlx:type owlx:name=\"Person\" />
</owlx:Individual>``` 
<dt>Resource Description Framework (RDF) using FOAF (friend of a friend) ontology</dt>
```
<foaf:Person>
  <foaf:name>Reid Paape</foaf:name>
</foaf:Person>
```
<dt>CycL</dt>
```
(\#$isa \#$ReidPaape \#$Person) \\;
```
*safe*
""",
    topics: ["LISP", "Databases"],
    related: ["Semantics", "Common LISP", "Ontology"]
  },
  {
    word: "Machine-Independent Programming Language",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: []
  },
  {
    word: "Macro",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["Program", "Task"]
  },
  {
    word: "Program",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["Macro"]
  },
  {
    word: "Object",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["Nonatomic Data Structure", "Data Structure"]
  },
  {
    word: "Programming Pattern/Paradigm",
    note:
"""
WIP
""",
    topics: ["LISP", "Machine Learning"],
    related: []
  },
  {
    word: "Semantics",
    note:
"""
Generally speaking, semantics is the study of meaning, or more formally, <em>the
relation between signs and the things to which they infer</em>. A semantic query of a
triplestore database will enable the retrieval of both explicitly and implicitly derived information
based on syntactic, semantic and structural information contained in the data. A purely statistical
learning model such as an artificial neural network does **not** adhere to
a semantic methodology as it will approximate or mimic a target behavior but will not
understand the meaning of that behavior per se.
""",
    topics: ["LISP", "Machine Learning", "Databases"],
    related: ["Syntax"]
  },
  {
    word: "Statistical Model",
    note:
"""
A statistical model is a mathematical model which is modified or trained by the input of data points,
such as an artificial neural network.
Statistical models are often but not always probabilistic. Take, for instance, Claude Shannon's proposed
probabilistic models of communication:

If you have a vocabulary of `100000` words and a second-order Markov model in which the probability of a
word depends on the previous two words, then you need a quadrillion (`10e15`) probability values to specify
the model. The only feasible way to learn these `10e15` values is to gather statistics from data and introduce
some smoothing method for the many cases where there is no data. Therefore, most (but not all) probabilistic
models are trained. Also, many (but not all) trained models are probabilistic.

As another example, consider the Newtonian model of gravitational attraction, which says that the force between
two objects of mass <span class='math'>m<sub>1</sub></span> and <span class='math'>m<sub>2</sub></span>
a distance <span class='math'>r</span> apart is given by:
<p class='equation math'>
  F = G m<sub>1</sub> m<sub>2</sub> / r<sup>2</sup>
</p>
where <span class='math'>G</span> is the universal gravitational constant. This is a trained model because the
gravitational constant <span class='math'>G</span> is determined by statistical inference over the results of a
series of experiments that contain stochastic experimental error. It is also a deterministic (non-probabilistic)
model because it states an exact functional relationship.
""",
    topics: ["Machine Learning", "Neural Networks"],
    related: ["Syntax", "Mathematical Model", "Probabilistic model", "Trained Model"]
  },
  {
    word: "Mathematical Model",
    note:
"""
A mathematical model specifies a relation among variables, either in functional form that maps inputs
to outputs (e.g. <span class='math'>y = m x + b</span>) or in relation form (e.g. the following
<span class='math'>(x, y)</span> pairs are part of the relation).
""",
    topics: ["Machine Learning", "Neural Networks"],
    related: ["Syntax", "Statistical Model", "Probabilistic model", "Trained Model"]
  },
  {
    word: "Probabilistic Model",
    note:
"""
A probabilistic model specifies a probability distribution over possible values of random variables, e.g.,
<span class='math'>P(x, y)</span>, rather than a strict deterministic relationship, e.g., <span class='math'>y = f(x)</span>.

""",
    topics: ["Machine Learning", "Neural Networks"],
    related: ["Syntax", "Mathematical Model", "Statistical model", "Trained Model"]
  },
  {
    word: "Trained Model",
    note:
"""
A trained model uses some training/learning algorithm to take as input a collection of possible models and a
collection of data points (e.g. <span class='math'>(x, y)</span> pairs) and select the best model. Often
this is in the form of choosing the values of parameters (such as <span class='math'>m</span> and <span class='math'>b</span>
  above) through a process of statistical inference.
""",
    topics: ["Machine Learning", "Neural Networks"],
    related: ["Syntax", "Mathematical Model", "Probabilistic model", "Statistical Model"]
  },
  {
    word: "Syntax",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["Semantics"]
  },
  {
    word: "Amplification/Gain",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Signal", "Feedback"]
  },
  {
    word: "Input/Output",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Signal", "Feedback", "Amplification/Gain"]
  },
  {
    word: "Feedback",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Amplification/Gain"]
  },
  {
    word: "Machine Learning",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: []
  },
  {
    word: "Model",
    note:
"""
WIP
""",
    topics: ["Neural Networks", "Databases", "Machine Learning"],
    related: []
  },
  {
    word: "Linear Function",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Function", "Nonlinear Function"]
  },
  {
    word: "Nonlinear Function",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Function", "Linear Function", "Mapping Function", "Sigmoid/Squashing Function"]
  },
  {
    word: "Parallel Processing",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: []
  },
  {
    word: "Response Characteristics",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Signal/Feedback", "Amplification/Gain", "Input/Output"]
  },
  {
    word: "Sigmoid/Squashing Function",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Function", "Nonlinear Function"]
  },
  {
    word: "Switch",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Threshold"]
  },
  {
    word: "Threshold",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Switch"]
  },
  {
    word: "Weighted Sum",
    note:
"""
WIP
""",
    topics: ["Neural Networks"],
    related: ["Parameters"]
  },
  {
    word: "Association/Relationship",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Attribute/Property",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Class",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Data",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: ["Dataset", "Labeled Data", "Unlabeled Data"]
  },
  {
    word: "Dataset",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: ["Data", "Labeled Data", "Unlabeled Data"]
  },
  {
    word: "Framework",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Generalized-Hierarchy",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: ["Hierarchy"]
  },
  {
    word: "Hierarchy",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: ["Generalized-Hierarchy"]
  },
  {
    word: "Graph",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Network",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Parent-Child Relationship",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: ["Association/Relationship", "Hierarchy"]
  },
  {
    word: "Property",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Raw Data",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Curated Data",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Resource",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Schema",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: ["Hierarchy"]
  },
  {
    word: "Structured Data",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: ["Data", "Hierarchy"]
  },
  {
    word: "Unstructured Data",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: ["Data"]
  },
  {
    word: "Algorithm",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: ["Program", "Macro", "Task"]
  },
  {
    word: "Methodology",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: ["Program", "Macro", "Task", "Programming Pattern/Paradigm"]
  },
  {
    word: "Data(set)",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Explicitly Programmed",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Feature",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Mapping Function",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: ["Function", "Linear Function", "Nonlinear Function"]
  },
  {
    word: "Task",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: ["Program", "Macro"]
  },
  {
    word: "Programming Pattern",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Signal/Feedback",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: ["Input/Output", "Amplification/Gain", "Response Characteristics"]
  },
  {
    word: "Parameters",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Labeled Data",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: ["Unlabeled Data", "Data", "Dataset"]
  },
  {
    word: "Unlabeled Data",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: ["Labeled Data", "Data", "Dataset"]
  },
  {
    word: "Semantic Web (Web 3.0, Linked Data Web, Web of Data)",
    note:
"""
The Semantic Web represents the next major evolution in connecting information.
It enables data to be linked from a source to any other source and to be
**understood by computers so that they can perform increasingly sophisticated tasks
on our behalf.**

The word semantic itself implies **meaning** or **understanding**. As such, the fundamental
difference between Semantic Web technologies and other technologies related to data (such as
relational databases or the World Wide Web itself) is that the Semantic Web is concerned with
the **meaning** and not the structure of data.

This fundamental difference engenders a completely different outlook on how storing, querying,
and displaying information might be approached.  Some applications, such as those that refer
to a large amount of data from many different sources, benefit enormously from this feature.
Others, such as the storage of high volumes of highly structured transactional data, do not.
""",
    topics: ["Machine Learning", "Databases", "LISP"],
    related: ["Common LISP", "Ontology", "Ontology Language", "Semantics"]
  }
]

buzzwords.map(&:create_and_assign_topics_return_lamba).each(&:call)
