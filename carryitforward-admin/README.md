# Carry if Forward Admin Server
Administration server for Carry it Forward

# Requirements
## Platform
This project is designed to be run on Ubuntu v16 / Ubuntu v18 and is not guaranteed to work on other platforms

## Additional Packages
This project requires the following systems / tools to be installed on your local environment
- Nodejs v10+

# Installation
Installation is done with npm
```
npm install
```

# Running
There are several modes of operation for this server.

## Production
When running for production the [carryitforward-admin service file](carryitforward-admin.service) should be used to run this project as a service. This will run the server as a daemon and ensure that the nodejs server reboots automatically in case of a critical failure. It will also assist with logging

Alternatively, the server can be started in production mode as a standard process with the following command:
```
$ make start
```

## Testing
When testing, always run the server with the following command:
```
$ npm run start-debug
```
This will run the server in "debug mode", which will bypass normal security checks and allow for local development. Once the server is running in debug mode it's pages can be accessed at `localhost:3000`

**NOTE: This process must _NEVER_ be run in debug mode in a live environment**

# Development
This is a standard Express server generated with the [Express Application Generator](https://expressjs.com/en/starter/generator.html) and follows a standard Express-style directory structure

## Front End
Front end files can be found in the following directories
- EJS Files: [views](views)
- SCSS Files: [public/stylesheets](public/stylesheets)
- JavaScript Files: [public/javascripts](public/javascripts)
- Images: [public/images](public/images)

All front-end files live reload by default and do not require a server restart to take effect

### EJS and SCSS
EJS and SCSS were chosen because valid HTML _is_ valid EJS and valid CSS _is_ valid SCSS. This connection ensures seamless development for those with raw HTML and CSS experience, as well as ensure similar development and production page formatting
