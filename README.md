# Send Email App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). This project provides functionality to accept the necessary information and send emails. It includes both the front end and back end. 

## How to build
1. Download source code
```sh 
git clone https://github.com/Natasha023/send-email 
```
2. Go to the folder: 
```sh
cd send-email
```
3. Install dependencies:  
```sh
npm install
```
4. Global install nodemon: 
```sh 
npm install -g nodemon
```
5. Run back end:
```sh 
nodemon src/server/server.js
```
6. Run front end: 
```sh
npm start
```
## How to deploy
1. Add homepage into package.json
```
"homepage": "https://natasha023.github.io/send-email/build" 
```
2. Add these lines of code to package.json script part: 
```diff
"script":{
    + "predeploy": "npm run build",
    + "deploy": "gh-pages -d build" 
```
3. install gh-pages
```sh
npm install --save-dev gh-pages
```
4. deploy website 
```sh
npm run deploy
```

## Technical choices
1. Use create-react-app to create the project
2. Use antd React UI library for front end styling
3. Use axios to interact with back end
4. Use nodemon to monitor for any changes of source and automatically restart server.
5. Use express for routes, to handling requests and views.

## Functionalities Introduction
1. Only one sender is allowed.
2. Support for multiple recipients which should be seperate by ';'.
3. Support for multiple CCs and BCCs which should be seperate by ';'.
4. Dynamically add form fields.
5. Form field input value validation.
6. Support for failover.

##TODOS
1. Should write unit test and E2E test cases
2. Should input index.js and index.css into client folder
3. Styling should be better
4. Should have more logs for errors and more comments

