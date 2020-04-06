# README #

New implementation of circliful, without any dependencies - dependencies are only used for development.

### Run dev environment ###

Install devDependencies
~~~~
npm install
~~~~

Run webpack dev server
~~~~
npm run start:dev
~~~~

In the console you should see something like: "Project is running at http://localhost:9090/" call the url in the browser.

### Build javascript files ### 

~~~~
npm run build
~~~~

### Project structure ###

| Folder        | Description | 
| ------------- |-------------| 
| dist          | minified css and js version for implementing in script tag | 
| docs          | md documentation files      |  
| public        | content-base for webpack dev server, contains some circliful examples      |    
| src           | all code for the library      |    
| style        | scss styling files for circles      |    
| test        | unit and dom tests, coming soon...      |    

#### src folder ####

| Folder        | Description | 
| ------------- |-------------| 
| base-class  | basic classes to centralize main features | 
| circle-type   | some default circles, you can add there your own      |  
| helper       | svg and object helper       |  
| interface    | typescript interfaces for validation      |  


