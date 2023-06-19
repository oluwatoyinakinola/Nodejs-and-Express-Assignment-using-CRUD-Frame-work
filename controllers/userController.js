const User = require('../models/User');

// Display the user form
exports.showForm = (req, res) => {
  res.render('userForm');
};

// Add a new user
exports.addUser = async (req, res) => {
  const { fullName, stateOfOrigin, dateOfBirth, age, gender } = req.body;
  const newUser = new User({
    fullName,
    stateOfOrigin,
    dateOfBirth,
    age,
    gender,
  });

  try {
    await newUser.save();
    res.redirect('/users');
  } catch (error) {
    console.error('Failed to add user:', error);
    res.redirect('/');
  }
};

// Displaying  all users
exports.showAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('userList', { users });
  } catch (error) {
    console.error('Failed to retrieve users:', error);
    res.render('userList', { users: [] });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.redirect('/users');
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.redirect('/users');
  }
};

// Delete all users
exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.redirect('/users');
  } catch (error) {
    console.error('Failed to delete all users:', error);
    res.redirect('/users');
  }
};

// Displaying the user update form
exports.showUpdateForm = (req, res) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      res.render('userUpdate', { user });
    })
    .catch((err) => {
      console.error('Failed to retrieve user:', err);
      res.redirect('/users');
    });
};

// Update a user
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { fullName, stateOfOrigin, dateOfBirth, age, gender } = req.body;

  User.findByIdAndUpdate(userId, {
    fullName,
    stateOfOrigin,
    dateOfBirth,
    age,
    gender,
  })
    .then(() => {
      res.redirect('/users');
    })
    .catch((err) => {
      console.error('Failed to update user:', err);
      res.redirect('/users');
    });
};