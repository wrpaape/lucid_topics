class String
  def titleize
    titlecase({ underscore: false, humanize: false })
  end
end