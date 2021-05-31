# frozen_string_literal: true

class MessagesController < AuthenticatedController
  def create
    @message = params[:message]
    turbo_redirect_to home_path, notice: @message
  end
end
