# psu-campus-map
PSU Campus Map

v1.11
=====

* Unimplemented atomic ipad override on map infowindow popup links
* Angular.js - ngTouch 1.3.2 broken...
    * backed angular-touch library from 1.3.2 back down to 1.3.0 in bower.json
* Links in popups in Safari on iPad should work consistent with expectations.

v1.10
=====

* Implemented atomic ipad override on map infowindow popup links
** please check tour and arttour map popup links

v1.9
====

* Added feedback link in lower right corner
* Changed share icon from share icon to link icon
* Added copy button to share popup
* Added close button to share popup
* Moved right hand button group down a few pix so as not to crowd zoom buttons
* Added new view for Art Tour map popups
* Removed a bunch of dependencies from bower.json, images, etc.
* Extended building footprints out to map scale 15
* Limited app to map scale 15
* Linked print button to static PDF map
* Converted coffeescript files to javascript and adjusted gruntfile accordingly
* Worked with client to familiarize with build system
* Reduced footprint of PSU_Occupants.json file and renamed fields to more intuitive names
* Altered oblique satellite view to pure plan satellite view.
* Added building abbreviations to autosuggest search box.
* General cleaning of repository and initialization in Github for improved collaboration with client.

# How to build

Clone repository from Github
* `git clone https://github.com/psu-cpo-gis/psu-campus-map`

Navigate into new directory
* `cd psu-campus-map`

Install node dependencies (for the compilation process) (reads package.json file)
* `npm install`

Install javascript/css dependencies using bower (reads bower.json file)
* `bower i`

Execute Grunt build task (reads gruntfile.js)
* `grunt build`

Startup a server with a watch on files in the client directory
* `grunt`

