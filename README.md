# backend-server
Admin Panel Back-end Server

## First steps

npm init -y 

Global Install npm i nodemon 

## Mongo Connection
Create a cluster in Mongo DB Atlas  
Set MongoDB Compas  
If you get problems to connet go to + ADD IP ADDRESS => ADD CURRENT IP ADDRESS and set IP 0.0.0.0/0

Then install and set mongoose [https://mongoosejs.com/] in database/config.js

Install npm i dotenv, and config Environment variables

Install npm i cors and set it

## Creation of user model

Create de model and then routes and separete controllers

### Install express-validator

Set validators and middleware

## Encrypt password

npm i bcryptjs

npm i express-validator

## Generate JWT

npm i jsonwebtoken

Then implement middleware to use token

### Create Models and Routes

Create model and routes for Hospitals and Doctors

## Pagination

Create pagination and then generate diferent ways to searchs.

## To upload files

npm i express-fileupload form [https://www.npmjs.com/package/express-fileupload]

## Generate Unique Identificators

npm install uuid form [https://www.npmjs.com/package/uuid]

## Use library Server-index - NodeJS

var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));

## Login Google [https://developers.google.com/identity/sign-in/web/sign-in]

Create a project and set credentials

npm install google-auth-library --save

## Publish Docs with Postman

You can generate an automatic documentation with postman using publish docs and then publish collection