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
    note: "hello",
    topics: ["LISP"],
    related: ["List", "Vector"]
  },
  {
    word: "List",
    note: "hello",
    topics: ["LISP"],
    related: ["Vector"]
  },
  {
    word: "Vector",
    note: "hello",
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
    related: [""]
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
    related: [""]
  },
  {
    word: "Low-Level",
    note: "hello",
    topics: ["LISP"],
    related: [""]
  },
  {
    word: "Machine-Independent Programming Language",
    note: "hello",
    topics: ["LISP"],
    related: [""]
  },
  {
    word: "Macro",
    note: "hello",
    topics: ["LISP"],
    related: [""]
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
    related: [""]
  },
  {
    word: "Object",
    note: "hello",
    topics: ["LISP"],
    related: [""]
  },
  {
    word: "(Programming) Pattern",
    note: "hello",
    topics: ["LISP"],
    related: [""]
  },
  {
    word: "Semantics",
    note: "hello",
    topics: ["LISP"],
    related: [""]
  },
  {
    word: "Syntax",
    note: "hello",
    topics: ["LISP"],
    related: [""]
  },
  {
    word: "Amplification/Gain",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Input/Output",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Feedback",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "(Machine) Learning",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Model",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Linear Function",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Nonlinear Function",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Parallel Processing",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Response Characteristics",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Sigmoid/Squashing Function",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Switch",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Threshold",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Weight(ed Sum)",
    note: "hello",
    topics: ["Neural Networks"],
    related: [""]
  },
  {
    word: "Association/Relationship",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Attribute/Property",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Class",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Data(set)",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Framework",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "(Generalized-)Hierarchy",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Graph",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Model",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Object",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Network",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Parent-Child Relationship",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Property",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Raw/Curated Data",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Resource",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Schema",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Semantics",
    note: "hello",
    topics: ["Databases"],
    related: [""]
  },
  {
    word: "Structured Data",
    note: "hello",
    topics: ["Databases"],
    related: ["Data", "Unstructured Data"]
  },
  {
    word: "Unstructured Data",
    note: "hello",
    topics: ["Databases"],
    related: ["Data"]
  },
  {
    word: "Algorithm/Methodology",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "Data(set)",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "Explicitly Programmed",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "Feature",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "Learning",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "Mapping Function",
    note: "hello",
    topics: ["Machine Learning"],
    related: ["Function"]
  },
  {
    word: "Model",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "(Non)linear",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "Program/Task",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "(Programming) Pattern",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "Signal/Feedback",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "(Tunable) Parameters",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  },
  {
    word: "(Un)labeled Data",
    note: "hello",
    topics: ["Machine Learning"],
    related: [""]
  }
]

buzzwords.map(&:create_and_assign_topics_return_lamba).each(&:call)
