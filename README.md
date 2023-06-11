# CourtBotUI

The UI for CourtBot, a tool that makes it easier to get reminded of court dates

# Instructions on how to build on your local machine:

If you don't have Node installed, [download Node here](https://nodejs.org/en)

This project uses Node Version >= 18.16.0

After installation, run `npm install` to install dependencies

Once installation has finished, run `npm start` to start the project

# Changing/Adding behavior

I have set the frontend in a way that will proxy requests to a server on localhost:5000, so test servers should be running on that

The configure.js file has several variables and endpoints that can be changed to test the app, as well as change its behavior

For instance, the actual endpoint names can be changed, as well as using mock data to test or not
