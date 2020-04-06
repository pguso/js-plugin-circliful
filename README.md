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
| styles        | scss styling files for circles      |    
| tests         | unit and dom tests, coming soon...      |    

#### src folder ####

| Folder        | Description | 
| ------------- |-------------| 
| base-classes  | abstract classes for inheritance to centralize main features | 
| circle-type   | some default circles, you can add there your own      |  
| helpers       | svg and object helper       |  
| interfaces    | typescript interfaces for validation      |  


