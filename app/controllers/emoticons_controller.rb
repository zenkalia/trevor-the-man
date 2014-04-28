class EmoticonsController < ApplicationController
  def block_editor
    @emoticons = Emoticon.all
  end
end