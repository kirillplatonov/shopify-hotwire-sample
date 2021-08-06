class ApplicationController < ActionController::Base
  def turbo_redirect_to(options = {}, response_options = {})
    respond_to do |format|
      format.html { redirect_to options, response_options }
      format.turbo_stream { redirect_to options, response_options.merge(status: 200) }
    end
  end
end
