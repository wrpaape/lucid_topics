class Buzzword < ActiveRecord::Base
  has_and_belongs_to_many :topics
  has_and_belongs_to_many :relateds, -> { order(:word) },
    class_name: Buzzword,
    join_table: :buzzwords_related,
    association_foreign_key: :related_id,
    before_add: :check_dupes,
    after_add: :relate_self

  def self.all_as_json
    Hash[
      pluck(:word).zip(
        all.as_json(
          only: [
            :word,
            :note
          ],
          methods: :related
        )
      )
    ]
  end

  def related
    relateds.pluck(:word)
  end

  private

  def check_dupes(other)
    throw :dupe if relateds.include?(other)
  end

  def relate_self(other)
    other.relateds << self unless other.relateds.include?(self)
  end
end
