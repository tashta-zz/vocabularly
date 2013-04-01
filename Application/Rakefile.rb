require 'net/http'
require 'uri'

desc "This task is called by the Heroku cron add-on"
task :call_page do
  uri = URI.parse('http://vocabularly.herokuapp.com/')
  Net::HTTP.get(uri)
end