# README #

New implementation of circliful, without any dependencies - dependencies are only used for development.

### Run dev environment ###

Install devDependencies
~~~~
npm install
~~~~

Run webpack dev server
~~~~
npm run dev
~~~~

In the console you should see something like: "Project is running at http://localhost:9090/" call the url in the browser.

### Project structure ###

* dist (in production mode the will be the js minified version)
* src (all code for the library)
    * circle-type (some default circles, you can add there your own)
    * interfaces
* templates (at the moment there is only one, it will be used to generate in dev env the index.html)
* tests (unit and dom tests, coming soon...)

