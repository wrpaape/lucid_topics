class Buzzword < ActiveRecord::Base
  before_create :ensure_titleize!,
    :strip_single_newlines!,
    :force_line_breaks_at_headers!
  has_and_belongs_to_many :topics
  has_and_belongs_to_many :relateds, -> { order(:word) },
    class_name: Buzzword,
    join_table: :buzzwords_related,
    association_foreign_key: :related_id,
    before_add: :throw_dupes,
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

  def ensure_titleize!
    self.word = self.word.titleize
  end

  def strip_single_newlines!
    self.note = self.note.strip.split("\n*safe*").map.with_index { |sec, i| i % 2 == 0 ? sec.gsub(/(?<!\n)\n(?!\n)/, " ") : sec }.join
  end

  def force_line_breaks_at_headers!
    note.gsub!(/(?<=[^\n]\n\n)(\n*)(?=\n#)/, "<br /> ")
  end

  def throw_dupes(other)
    throw :dupe if relateds.include?(other)
  end

  def relate_self(other)
    other.relateds << self unless other.relateds.include?(self)
  end
end
