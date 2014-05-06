class EmoticonsController < ApplicationController

  before_action :get_emoticons, only: [:index, :block_editor]

  def get_emoticons
    @emoticons = Emoticon.all
  end

  def index
    respond_to do |format|
      format.html { render json: @emoticons }
      format.json { render json: @emoticons }
    end
  end

  def block_editor
    respond_to do |format|
      format.js
    end
  end
end