# Upcoming Movies web app
Web application developed like a test code for a Full Stack position in ArcTouch.

This MVP uses the TMDb database to show the upcoming movies.

[Live demo](http://upcoming-movies-web-app.herokuapp.com/)<br/>[Public API](http://upcoming-movies-web-app-server.herokuapp.com)

# Architecture
## Front-end
- The front-end was built using ReactJS.
- Although the complexity of the MVP doesn't require the use of Redux, it was used with the intention to allow the project grown in a solid base.
- The project was created using the create-react-app package.

### Libraries
- axios: Library used to access the back-end API to read the list of movies and its details.
- react-bootstrap and bootstrap: Graphics Libraries to use the Bootstrap framework in the visual identity. 
- react-router-dom: Library used to handle the routing between the application pages.
- react-redux, redux, redux-saga and reduxsauce: Libraries used to allow the use of Redux to handle the state of the application components.

## Back-end
- The back-end was built using NodeJS.
- As a cache database was used MongoDB (better to store the data format received from TMDb and faster for the quantity of data that will be stored).

### Libraries
- express: The framework used to export the API.
- mongoose: Library used to access the MongoDB database.
- axios: Library used to access the TMDb API to read the list of movies and it details.
- config: Library used to handle the config file of the application.
- cors: Library used to allow cross-origin resource sharing.
- md5: Library used to calculate hashes using the MD5 algorithm.
- body-parser and method-override: Libraries that be part of the boilerplate, but not used actually.

## How to build the project
- You must have NPM or YARN installed in your environment.
### Front-end
- development mode: `$ yarn start` or `$ npm start`
- production release: `$ yarn build` or `$ npm build`

### Back-end
- to execute: `$ yarn start` or `$ npm start`