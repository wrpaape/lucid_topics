module Lisp
  extend ActiveSupport::Concern

  SBCL = %q(sbcl --noinform --noprint --no-userinit --disable-debugger --disable-ldb --lose-on-corruption)
  LISP = SBCL

  class Proxy
    attr_accessor :module_name # @return [Symbol]

    ##
    # @param  [Symbol] module_name
    def initialize(module_name = nil, &block)
      @module_name = module_name
      block.call(self) if block_given?
    end

    ##
    # @private
    def method_missing(method_name, *args, &block)
      method_name = method_name.to_s.gsub('_', '-').to_sym
      super # TODO: invoke the corresponding Lisp function
    end
  end

  ##
  # Evaluates the given Lisp `expr` string, returning its result as a Ruby
  # value when possible.
  #
  # Boolean, integer, and float return values are currently marshalled into
  # Ruby values.
  #
  # @param  [String] expr
  # @return [Object]
  def self.evaluate(expr)
    case result = SXP::Reader::CommonLisp.read(execute(%Q((format *standard-output* "~S" #{expr}))))
      when :T   then true
      when :NIL then nil
      else result
    end
  end

  ##
  # Executes a given string of Lisp `code`, returning either the standard
  # output or standard error of the Lisp process depending on its exit
  # status.
  #
  # @param  [String] code
  # @return [String]
  def self.execute(code)
    pid, stdin, stdout, stderr = Open4.popen4(LISP)
    stdin.puts(code.to_s)
    stdin.flush.close
    _, status = Process.waitpid2(pid)
    status.exitstatus.zero? ? stdout.read : stderr.read
  end
end
