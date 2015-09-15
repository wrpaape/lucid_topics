class Topic < ActiveRecord::Base
  mattr_accessor :all_urls

  def self.all_as_json
    all.as_json(except: :filename, methods: :urls)
  end

  def urls
    pdf = URI.parse(all_urls[:download_file])
    pdf.query = URI.encode_www_form( path: "pdfs/#{filename}.pdf", filename: "#{filename}.pdf", type: "application/pdf")

    {
      download: {
        pdf: pdf.to_s
      },
      evaluate: all_urls[:evaluate]
    }
  end
end
