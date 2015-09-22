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
indices:   [     0       ,  1 , 2 , ... ,           N             ]
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
A list is an abstract data type that represents an ordered sequence of not necessarily unique values.
Lists are most commonly implemented as \"linked lists\", consisting of a cluster of
separated container nodes chained together by references:
*safe*

```
nodes:  ==>[ 23 | ●=]==>[ \"hello world\" | ●=]==>[ my-function | ●=]==>
            atom|ref          atom      |ref         atom     |ref
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
- character string (i.e. \"Hello world, I am an atom\"), or
- numeric literal (i.e. 470)

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

1. an atom, or
2. an expression of the form `(x . y)`

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


#### *Because LISP employs S-expressions as the sole representation of source code as well as data,
LISP is homoiconic.*
*safe*
""",
    topics: ["LISP"],
    related: ["Atom (Element)", "Primitive Data Type", "List", "Syntax", "Common LISP", "Tree Data Structure", "Homoiconicity"]
  },
  {
    word: "Common LISP",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["S-expression", "List", "Atom (Element)", "Common LISP"]
  },
  {
    word: "Homoiconicity",
    note:
"""
WIP
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
WIP
""",
    topics: ["LISP"],
    related: ["Low-Level"]
  },
  {
    word: "Low-Level",
    note:
"""
WIP
""",
    topics: ["LISP"],
    related: ["High-Level"]
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
    related: ["Nonatomic Data Structure"]
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
WIP
""",
    topics: ["LISP"],
    related: ["Syntax"]
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
    topics: ["Neural Networks"],
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
    word: "Model",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Object",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: ["Data Structure"]
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
    word: "Semantics",
    note:
"""
WIP
""",
    topics: ["Databases"],
    related: []
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
    word: "Model",
    note:
"""
WIP
""",
    topics: ["Machine Learning"],
    related: []
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
  }
]

buzzwords.map(&:create_and_assign_topics_return_lamba).each(&:call)
