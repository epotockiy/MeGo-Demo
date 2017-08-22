
# JL Gulp Starter 0.2
jlGulp starter is my former front-end framework using Gulp, Node, Sass, Susy, Breakpoint, SourceMaps, Browser-Sync, Autoprefixer and Uglify / Concat. This is a complete rewrite from version 0.1.

**Prior Ruby and Compass dependency have been removed and no longer required the use of any Ruby.**

## YouTube Tutorials Playlist
[![Gulp YouTube Demo Playlist](http://img.youtube.com/vi/LmdT2zhFmn4/0.jpg)](https://www.youtube.com/watch?v=LmdT2zhFmn4&list=PLv1YUP7gO_viROuRcGsDCNM-FUVgMYb_G)

## Install Packages

After cloning the project to your computer run the following command in your terminal to install all required node and bower packages.

	1.  sudo npm install && bower install	
		

## Start

	gulp

## Build

Create a deployment build with the following commands:

	gulp build

## Test App Build

To fire up a server and test the final build:

	gulp build:serve

---------------------------------------

## gulpfile.js
Javascript concatenation is done in the config object in the guilpfile.  This controls the order as well as files to be be concatenated.  I went with a simple system in anticipation of ES6 built-in modules.  The config object also controls which files are EXCLUDED from the final build.

## .bowerrc
Controls the location where bower packages will be installed.
