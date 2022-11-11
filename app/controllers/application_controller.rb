# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_host

  def turbo_redirect_to(options = {}, response_options = {})
    if Rails.configuration.force_iframe
      redirect_to options, response_options.merge(status: 200)
    else
      respond_to do |format|
        format.html { redirect_to options, response_options }
        format.turbo_stream { redirect_to options, response_options.merge(status: 200) }
      end
    end
  end

  private

  def set_host
    @host = params[:host]
  end
end
