import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import * as Users from '../models/users.js';
import auth from '../middleware/auth.js';

const userController = Router();

userController.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  if (!email || !password)
    return res
      .status(400)
      .json({ status: 'fail', message: 'Please provide email and password' });

  try {
    const user = await Users.getByEmail(email);
    // console.log(user);
    if (!user) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'User not found' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log(passwordIsValid);
    if (!passwordIsValid) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Invalid credentials' });
    }

    const authenticationKey = uuid4().toString();
    user.authenticationKey = authenticationKey;

    await Users.update(user);
    res.status(201).json({
      status: 'success',
      message: 'User logged in',
      authenticationKey,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during login',
    });
  }
});

userController.post('/logout', (req, res) => {
  const authenticationKey = req.get('X-AUTH-KEY');
  Users.getByAuthenticationKey(authenticationKey)
    .then((user) => {
      user.authenticationKey = null;
      Users.update(user).then((user) => {
        res.status(200).json({
          status: 200,
          message: 'user logged out',
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: 'failed to logout user',
      });
    });
});

userController.get('/', auth(['admin', 'trainer']), async (req, res) => {
  const users = await Users.getAll();

  res.status(200).json({
    status: 200,
    result: users.length,
    message: 'User list',
    users: users,
  });
});

userController.get('/:id', auth(['admin', 'trainer', 'member']), (req, res) => {
  const userID = req.params.id;
  // console.log(userID);

  // TODO: Implement request validation

  // TODO: Enforce that trainer and member users
  // can only get them selves.

  Users.getByID(userID)
    .then((user) => {
      res.status(200).json({
        status: 200,
        message: 'Get user by ID',
        user: user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: 'Failed to get user by ID',
      });
    });
});

userController.get('/authentication/:authenticationKey', (req, res) => {
  const authenticationKey = req.params.authenticationKey;

  Users.getByAuthenticationKey(authenticationKey)
    .then((user) => {
      res.status(200).json({
        status: 200,
        message: 'Get user by authentication key',
        user: user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: 'Failed to get user by authentication key',
      });
    });
});

userController.post('/', auth(['admin']), (req, res) => {
  // Get the user data out of the request
  const userData = req.body;
  // console.log(userData);

  // TODO: Implement request validation

  // hash the password if it isn't already hashed
  if (!userData.password.startsWith('$2a')) {
    userData.password = bcrypt.hashSync(userData.password);
  }

  // Convert the user data into an User model object
  const user = Users.newUser(
    null,
    userData.email,
    userData.password,
    userData.role,
    userData.firstName,
    userData.lastName,
    null
  );

  // Use the create model function to insert this user into the DB
  Users.create(user)
    .then((user) => {
      res.status(200).json({
        status: 200,
        message: 'Created user',
        user: user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: 'Failed to create user',
      });
    });
});

userController.post('/register', (req, res) => {
  // Get the user data out of the request
  const userData = req.body;

  // hash the password
  userData.password = bcrypt.hashSync(userData.password);

  // Convert the user data into an User model object
  const user = Users.newUser(
    null,
    userData.email,
    userData.password,
    'member',
    userData.firstName,
    userData.lastName,
    null
  );

  // Use the create model function to insert this user into the DB
  Users.create(user)
    .then((user) => {
      res.status(200).json({
        status: 200,
        message: 'Registration successful',
        user: user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: 'Registration failed',
      });
    });
});

userController.patch(
  '/:id',
  auth(['admin', 'trainer', 'member']),
  async (req, res) => {
    const userID = req.params.id;
    const userData = req.body;

    // console.log(userID, userData);

    // 确认请求中的userID和URL中的userID匹配，防止潜在的安全问题
    if (userData.id && userData.id !== userID) {
      return res.status(400).json({
        status: 'fail',
        message: 'User ID does not match the one in the URL.',
      });
    }

    userData.id = userID;

    try {
      const updatedUser = await Users.updateUser(userData);
      res.status(200).json({
        status: 200,
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        status: 500,
        message: 'Failed to update user',
        error: error.message,
      });
    }
  }
);

userController.delete('/:id', auth(['admin']), (req, res) => {
  const userID = req.params.id;

  Users.deleteByID(userID)
    .then((result) => {
      res.status(200).json({
        status: 200,
        message: 'User deleted',
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 500,
        message: 'Failed to delete user',
      });
    });
});

export default userController;
