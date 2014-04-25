require 'carrierwave/processing/mime_types'
require 'securerandom'

CarrierWave.configure do |config|

  if Rails.env.test?
    config.enable_processing = false
  elsif !Rails.env.development?
    config.storage = :fog
    config.fog_credentials = {
      :provider               => 'AWS',
      :aws_access_key_id      => ENV['S3_KEY'],
      :aws_secret_access_key  => ENV['S3_SECRET'],
      :region                 => 'eu-west-1'
    }
    config.fog_directory  = ENV['S3_BUCKET']
    config.fog_public     = true
  end
end


class CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  include CarrierWave::MimeTypes

  process :set_content_type
  process :optimize

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}".tap do |s|
      s.prepend "test_" if Rails.env.test?
    end
  end

  def filename
    return unless original_filename
    @random_filename ||= [model ? model_random_id : random_id,
                          file.extension].join('.')
  end

  def optimize
    manipulate! do |img|
      return img unless img.mime_type.match(/jpe?g/)

      img.strip
      img.combine_options do |c|
        c.quality "80"
        c.depth "8"
        c.interlace "plane"
      end

      img
    end
  end

private
  def model_random_id
    var = :"@#{mounted_as}_random_id"
    model.instance_variable_get(var) || model.instance_variable_set(var, random_id)
  end

  def random_id
    SecureRandom.urlsafe_base64(32)
  end
end
