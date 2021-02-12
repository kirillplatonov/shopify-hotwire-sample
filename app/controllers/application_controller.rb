class ApplicationController < ActionController::Base
  def turbo_redirect_to(options = {}, response_options = {})
    response_options[:status] = 300
    redirect_to options, response_options
  end
end
