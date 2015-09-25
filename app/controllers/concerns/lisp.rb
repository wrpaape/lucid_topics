module Lisp
  extend ActiveSupport::Concern

  SBCL = %q( --noinform --noprint --no-userinit --disable-debugger --disable-ldb --lose-on-corruption)
  SBCL.prepend(ENV["RAILS_ENV"] == "production" ? %q(sbcl/sbcl-1.0.54-x86-64-linux/run-sbcl.sh) : %q(sbcl))
  
  def self.evaluate(expr)
    execute(%Q((format *standard-output* "~S" #{expr})))
  end

  def self.execute(code)
    pid, stdin, stdout, stderr = Open4.popen4(SBCL)
    stdin.puts(code.to_s)
    stdin.flush.close
    _, status = Process.waitpid2(pid)
    status.exitstatus.zero? ? stdout.read : stderr.read
  end
end
