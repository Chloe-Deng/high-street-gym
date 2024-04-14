import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import * as Users from '../models/users.js';
import auth from '../middleware/auth.js';

// TODO: Implement input validation

const userController = Router();

userController.post('/login', (req, res) => {
  // access request body
  let loginData = req.body;
  const { email, password } = req.body;
  // console.log(loginData);

  // TODO: Implement request validation
  if (!email || !password)
    return res
      .status(400)
      .json({ status: 'fail', message: 'Please provide email and password' });

  console.log(email, password);

  Users.getByEmail(loginData.email)
    .then((user) => {
      if (bcrypt.compareSync(loginData.password, user.password)) {
        user.authenticationKey = uuid4().toString();

        Users.update(user).then((result) => {
          res.status(200).json({
            status: 200,
            message: 'user logged in',
            authenticationKey: user.authenticationKey,
            user: user,
          });
        });
      } else {
        res.status(400).json({
          status: 400,
          message: 'invalid credentials',
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: 500,
        message: 'login failed',
      });
    });
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
  const userData = req.body.user;

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

  // TODO: Implement request validation

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

/*
userController.patch(
  '/:id',
  auth(['admin', 'trainer', 'member']),
  async (req, res) => {
    // Get the user data out of the request
    //
    // Note - the user data being updated is encapsulated in a user
    // object to avoid ambiguity between the logged in user's
    // authentication key and the authentication key of the user
    // currently being updated.
    const userID = req.params.id;
    const userData = req.body.user;
    console.log(userID, userData);

    // Use ID passed in URL
    userData.id === userID;

    // TODO: Implement request validation

    // TODO: Enforce that moderators and spotters can only
    // update their own user records.

    // hash the password if it isn't already hashed
    if (userData.password && !userData.password.startsWith('$2a')) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Convert the user data into a User model object
    const user = Users.newUser(
      userData.id,
      userData.email,
      userData.password,
      userData.role,
      userData.firstName,
      userData.lastName,
      userData.authenticationKey
    );

    // Use the update model function to update this user in the DB
    Users.update(user)
      .then((user) => {
        res.status(200).json({
          status: 200,
          message: 'Updated user',
          user: user,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          status: 500,
          message: 'Failed to update user',
        });
      });
  }
);
*/

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

    // 将userID添加到userData对象中，确保更新正确的用户记录
    userData.id = userID;

    // 调用更新函数
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

  // TODO: Implement request validation

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
