class Hash
  def create_and_assign_topics
    query = { filename: delete(:topics) } if has_key?(:topics)
    Buzzword.create(self).topics << Topic.where(query)
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
    word: "test",
    note: "hello",
    topics: %w(lisp databases machine_learning)
  },
  {
    word: "test2",
    note: "hi",
    topics: %w(machine_learning lisp neural_networks)
  },
  {
    word: "test3",
    note: "hey",
    topics: %w(lisp)
  },
  {
    word: "test4",
    note: "ola",
    topics: %w(lisp databases)
  },
  {
    word: "test5",
    note: "ola"
  }
]

buzzwords.each(&:create_and_assign_topics)
