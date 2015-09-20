class Buzzword < ActiveRecord::Base
  has_and_belongs_to_many :topics
  has_and_belongs_to_many :related, -> { order(:word) },
    class_name: Buzzword,
    join_table: :buzzwords_related,
    association_foreign_key: :related_id,
    after_add: :relate_self

  private

  def relate_self(related)
    related.related << self unless related.related.include?(self)
  end
end
