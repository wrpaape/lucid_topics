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
atoms:    [ \"I'm first\" , 42 , x , ... , \"I'm last\" ]
indices:  [     0       ,  1 , 2 , ... ,     n      ]
```

pros:
- can insert/delete an element or splice at anywhere in the list with constant speed regardless of its size

cons:
- not good for random access (can't \"look up\" an element but rather must traverse the list one by one)
*safe*
""",
    topics: ["LISP"],
    related: ["List", "Vector", "Nonatomic Data Structure"]
  },
  {
    word: "List",
    note:
"""
A list is an abstract data type that represents an ordered sequence of not necessarily unique values.
Lists are most commonly implemented as \"linked lists\", consisting of a cluster of
separated container nodes chained together by references.
*safe*

```
atoms:    [ \"I'm first\" , 42 , x , ... , \"I'm last\" ]
indices:  [     0       ,  1 , 2 , ... ,     n      ]
```

pros:
- can insert/delete an element or splice at anywhere in the list with constant speed regardless of its size

cons:
- not good for random access (can't \"look up\" an element but rather must traverse the list one by one)
*safe*
""",
    topics: ["LISP"],
    related: ["Vector"]
  },
  {
    word: "Vector",
    note:
"""
A list is an abstract data type that represents an ordered sequence of not necessarily unique values.
Lists are most commonly implemented as \"linked lists\", datastructures consisting of a cluster of
separated container nodes chained together by references.

  atoms:    [ \"I'm first\" , 42 , x , ... , \"I'm last\" ]
  indices:  [      0        ,  1 , 2 , ... ,      n       ]

pros: can increase/decrease in size at run-time
cons:
""",
    topics: ["LISP"]
  },
  {
    word: "Atom",
    note: "hello",
    topics: ["LISP"],
    related: ["Primitive Data Type"]
  },
  {
    word: "Compile",
    note: "hello",
    topics: ["LISP"],
    related: ["Debug"]
  },
  {
    word: "Fixed-Length Data Structure",
    note: "hello",
    topics: ["LISP"],
    related: ["Array", "Vector"]
  },
  {
    word: "Nonatomic Data Structure",
    note: "hello",
    topics: ["LISP"],
    related: ["List", "Array", "Vector"]
  },
  {
    word: "Debug",
    note: "hello",
    topics: ["LISP"],
    related: ["Compile"]
  },
  {
    word: "Function",
    note: "hello",
    topics: ["LISP", "Neural Networks"],
    related: ["Linear Function", "Nonlinear Function"]
  },
  {
    word: "High-Level",
    note: "hello",
    topics: ["LISP"],
    related: ["Low-Level"]
  },
  {
    word: "Low-Level",
    note: "hello",
    topics: ["LISP"],
    related: ["High-Level"]
  },
  {
    word: "Machine-Independent Programming Language",
    note: "hello",
    topics: ["LISP"],
    related: []
  },
  {
    word: "Macro",
    note: "hello",
    topics: ["LISP"],
    related: ["Program", "Task"]
  },
  {
    word: "Primitive Data Type",
    note: "hello",
    topics: ["LISP", "Databases"],
    related: ["Atom"]
  },
  {
    word: "Program",
    note: "hello",
    topics: ["LISP"],
    related: ["Macro"]
  },
  {
    word: "Object",
    note: "hello",
    topics: ["LISP"],
    related: ["Nonatomic Data Structure"]
  },
  {
    word: "Programming Pattern/Paradigm",
    note: "hello",
    topics: ["LISP", "Machine Learning"],
    related: []
  },
  {
    word: "Semantics",
    note: "hello",
    topics: ["LISP"],
    related: ["Syntax"]
  },
  {
    word: "Syntax",
    note: "hello",
    topics: ["LISP"],
    related: ["Semantics"]
  },
  {
    word: "Amplification/Gain",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Signal", "Feedback"]
  },
  {
    word: "Input/Output",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Signal", "Feedback", "Amplification/Gain"]
  },
  {
    word: "Feedback",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Amplification/Gain"]
  },
  {
    word: "Machine Learning",
    note: "hello",
    topics: ["Neural Networks"],
    related: []
  },
  {
    word: "Model",
    note: "hello",
    topics: ["Neural Networks"],
    related: []
  },
  {
    word: "Linear Function",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Function", "Nonlinear Function"]
  },
  {
    word: "Nonlinear Function",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Function", "Linear Function", "Mapping Function", "Sigmoid/Squashing Function"]
  },
  {
    word: "Parallel Processing",
    note: "hello",
    topics: ["Neural Networks"],
    related: []
  },
  {
    word: "Response Characteristics",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Signal/Feedback", "Amplification/Gain", "Input/Output"]
  },
  {
    word: "Sigmoid/Squashing Function",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Function", "Nonlinear Function"]
  },
  {
    word: "Switch",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Threshold"]
  },
  {
    word: "Threshold",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Switch"]
  },
  {
    word: "Weighted Sum",
    note: "hello",
    topics: ["Neural Networks"],
    related: ["Parameters"]
  },
  {
    word: "Association/Relationship",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Attribute/Property",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Class",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Data",
    note: "hello",
    topics: ["Databases"],
    related: ["Dataset", "Labeled Data", "Unlabeled Data"]
  },
  {
    word: "Dataset",
    note: "hello",
    topics: ["Databases"],
    related: ["Data", "Labeled Data", "Unlabeled Data"]
  },
  {
    word: "Framework",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Generalized-Hierarchy",
    note: "hello",
    topics: ["Databases"],
    related: ["Hierarchy"]
  },
  {
    word: "Hierarchy",
    note: "hello",
    topics: ["Databases"],
    related: ["Generalized-Hierarchy"]
  },
  {
    word: "Graph",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Model",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Object",
    note: "hello",
    topics: ["Databases"],
    related: ["Data Structure"]
  },
  {
    word: "Network",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Parent-Child Relationship",
    note: "hello",
    topics: ["Databases"],
    related: ["Association/Relationship", "Hierarchy"]
  },
  {
    word: "Property",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Raw Data",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Curated Data",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Resource",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Schema",
    note: "hello",
    topics: ["Databases"],
    related: ["Hierarchy"]
  },
  {
    word: "Semantics",
    note: "hello",
    topics: ["Databases"],
    related: []
  },
  {
    word: "Structured Data",
    note: "hello",
    topics: ["Databases"],
    related: ["Data", "Hierarchy"]
  },
  {
    word: "Unstructured Data",
    note: "hello",
    topics: ["Databases"],
    related: ["Data"]
  },
  {
    word: "Algorithm",
    note: "hello",
    topics: ["Machine Learning"],
    related: ["Program", "Macro", "Task"]
  },
  {
    word: "Methodology",
    note: "hello",
    topics: ["Machine Learning"],
    related: ["Program", "Macro", "Task", "Programming Pattern/Paradigm"]
  },
  {
    word: "Data(set)",
    note: "hello",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Explicitly Programmed",
    note: "hello",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Feature",
    note: "hello",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Mapping Function",
    note: "hello",
    topics: ["Machine Learning"],
    related: ["Function", "Linear Function", "Nonlinear Function"]
  },
  {
    word: "Model",
    note: "hello",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Task",
    note: "hello",
    topics: ["Machine Learning"],
    related: ["Program", "Macro"]
  },
  {
    word: "Programming Pattern",
    note: "hello",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Signal/Feedback",
    note: "hello",
    topics: ["Machine Learning"],
    related: ["Input/Output", "Amplification/Gain", "Response Characteristics"]
  },
  {
    word: "Parameters",
    note: "hello",
    topics: ["Machine Learning"],
    related: []
  },
  {
    word: "Labeled Data",
    note: "hello",
    topics: ["Machine Learning"],
    related: ["Unlabeled Data", "Data", "Dataset"]
  },
  {
    word: "Unlabeled Data",
    note: "hello",
    topics: ["Machine Learning"],
    related: ["Labeled Data", "Data", "Dataset"]
  }
]

buzzwords.map(&:create_and_assign_topics_return_lamba).each(&:call)
