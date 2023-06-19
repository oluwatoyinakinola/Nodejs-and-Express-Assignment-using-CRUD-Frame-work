const express = require('express');
const app = express();
const userController = require('./controllers/userController');
const methodOverride = require('method-override');
const port = 3010; 
require('./db');


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"))

// Setting  EJS as the view engine
app.set('view engine', 'ejs');

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Creatiing the routes
app.get('/', userController.showForm);

// Adding a new user
app.post('/users', userController.addUser);

// Display all users
app.get('/users', userController.showAllUsers);

// Delete a user
app.get('/users/:id/delete', userController.deleteUser);

// Delete all users
app.get('/users/deleteAll', userController.deleteAllUsers);

// Rendering the user update form
app.get('/users/:id/update', userController.showUpdateForm);

// Updating a user
app.post('/users/:id/update', userController.updateUser);
