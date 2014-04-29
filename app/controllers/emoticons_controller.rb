class EmoticonsController < ApplicationController
  def block_editor
    @emoticons = Emoticon.all
    respond_to do |format|
      format.js
    end
  end
end