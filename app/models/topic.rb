class Topic < ActiveRecord::Base
  mattr_accessor :all_urls, :all_paths
  has_and_belongs_to_many :buzzwords, -> { order(:word) }

  def self.all_as_json
    includes(buzzwords: :relateds).as_json(except: :filename,
      methods: [
        :urls,
        :paths
      ],
      include: {
        buzzwords: {
          only: [
            :word,
            :note
          ],
          methods: :related
        }
      }
    )
  end

  def urls
    pdf = URI.parse(all_urls[:download_file])
    pdf.query = URI.encode_www_form(path: "pdfs/#{filename}.pdf", filename: "#{filename}.pdf", type: "application/pdf")

    {
      download: {
        pdf: pdf.to_s
      },
      evaluate: all_urls[:evaluate]
    }
  end

  def paths
    {
      img: "#{filename}/"
    }
  end
end
