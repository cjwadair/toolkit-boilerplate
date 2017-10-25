![Toolkit boilerplate](https://github.com/cjwadair/toolkit-boilerplate/blob/master/app/images/toolkit-logo-horizontal-new.jpg)

![Logos](https://github.com/cjwadair/toolkit-boilerplate/blob/master/app/images/logo-display.jpg)

##Front End Boilerplate for Web Development

Front-end boilerplate for Gulp with everything you need to get projects up and running quickly.

Supports and uses gulp, sass, nunjucks, es6/es7 and service workers. Features include:

* **Responsive, Mobile-first design**
* **Optimized for Performance**: concatenated and minified Javascript, CSS, HTML and Images out of the box for leaner, faster loading pages
* **Code Linting**:
* **Support for ES6 and ES7**: via the babel-preset-env plugins
* **Built in HTTP server with hot reloading**
* **Cross Device Synchronization**: easily test on multiple devices (run 'gulp serve' from the command line and open the URL on other devices that are connected to your network)
* **Offline Support**: using built-in service worker set up
* **Progressive Web App enabled**: scores 100/100 on Lighthouse tests [note: needs to be completed]
* **Simple and easy to use templating**: uses [Nunjucks](https://mozilla.github.io/nunjucks/) to enable development of complex sites and applications without the additional overhead of a framework

##Installation

First download or clone this repo, then run:

 `$ npm install`

to install dev dependencies. Use sudo if needed.

Toolkit requires Node.js and Gulp to run. See below for instructions on how to download and install these dependencies if required.

##Prerequisites

### [Node.js](https://nodejs.org)

Bring up a terminal and type:

`$ node --version`

Version 0.12.0 or greater is required. If you require Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

### [Gulp](http://gulpjs.com)

Bring up a terminal and type:

`$ gulp --version`

If Gulp is installed it should return a version number at or above 3.9.x. If you need to install/upgrade Gulp, open up a terminal and type in the following:

`$ npm install --global gulp`


##Available Commands

###Run in Development Mode

`$ gulp serve`

Starts a server in development mode and prints out IP addresses for testing locally as well as on additional devices that are connected to your network. Pages reload automatically when you save changes.  

`serve` does not use [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
caching, so your site will stop being available when the web server stops running.

###Run in Production Mode

`$ gulp serve:dist`

Builds and optimizes your files start and serves a fully a production version of your site from the dist folder. Service worker is enabled in production mode but hot loading is not enabled.

###Bundle for Production

run `gulp`

All of the files you need will be in /dist with your images optimized, css compressed and js compressed

##Browser Support

The last two versions of the following browsers:

* Chrome
* Edge
* Firefox
* Safari 7+
* Opera
* Internet Explorer 9+

##More Information

Additional documentation and resources are coming soon. In the meantime, please check the following sites for more information on the components of Toolkit:

- [Progressive Web Applications](https://developers.google.com/web/progressive-web-apps/)
- [Google Pagespeed Insights](https://developers.google.com/speed/pagespeed/insights/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [Gulp](https://gulpjs.com)
- [Sass](http://sass-lang.com/)

##Contributing

Contributions, questions and comments are all welcome and encouraged. Please check the issues log for more infomation (coming soon).

##License

The MIT License (MIT)
Copyright 2017 Chris Adair
