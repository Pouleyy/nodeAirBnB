# AirBnB like in NodeJS
## Ingésup project

## Features
- Create user, login (no token ATM)
- Create location, update, book, get location /w paramaters (price & city)

## Prerequisites
- [Node.js](https://nodejs.org) & [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com)

### Setup (before anything else)
```bash
$ npm install
#In order to install all depedencies
```

### Launch
```bash
$ npm start
#Launch on port 9000 by default
```
##### Populate
* At launch it will populate your database /w fake data. All the data are in /helpers in JSON file. It's easier to test /w data in DB


### Endpoint

#### User 
* Create a user, you need to put his username, password and mail in the body. Username and mail must be unique.
```
POST : /users
```

* Log a user, you need to put his username, password and mail in the body.
```
PUT : /users/login
```

#### Location
* Get all location
```
GET : /location/
```

* Get some location /w parameters
```
GET : /location?city=CityName&price=priceLTE
```
* Create a location, you need to put its name, city, price per night, description and the owner username.
```
POST : /location
```
* Get a location by its name
```
GET : /location/:name
```
* Get all location create by a user 
```
GET : /location/owner/:ownername
```
* Book a location for a day
```
PUT : /location/:name/book/:year/:month/:day
```
