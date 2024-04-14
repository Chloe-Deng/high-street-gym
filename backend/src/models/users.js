import { db } from '../database.js';
import bcrypt from 'bcryptjs';

export function newUser(
  id,
  email,
  password,
  role,
  firstName,
  lastName,
  authenticationKey
) {
  return {
    id,
    email,
    password,
    role,
    firstName,
    lastName,
    authenticationKey,
  };
}

export async function getAll() {
  const [allUserResults] = await db.query('SELECT * FROM users');

  return await allUserResults.map((userResult) =>
    newUser(
      userResult.id.toString(),
      userResult.email,
      userResult.password,
      userResult.role,
      userResult.first_name,
      userResult.last_name,
      userResult.authentication_key
    )
  );
}

export async function getByID(userID) {
  const [userResults] = await db.query(
    'SELECT * FROM users WHERE id = ?',
    userID
  );

  if (userResults.length > 0) {
    const userResult = userResults[0];
    return Promise.resolve(
      newUser(
        userResult.id.toString(),
        userResult.email,
        userResult.password,
        userResult.role,
        userResult.first_name,
        userResult.last_name,
        userResult.authentication_key
      )
    );
  } else {
    return Promise.reject('no results found');
  }
}

export async function getByEmail(email) {
  const [userResults] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    email
  );

  if (userResults.length > 0) {
    const userResult = userResults[0];
    return Promise.resolve(
      newUser(
        userResult.id.toString(),
        userResult.email,
        userResult.password,
        userResult.role,
        userResult.first_name,
        userResult.last_name,
        userResult.authentication_key
      )
    );
  } else {
    return Promise.reject('no results found');
  }
}

export async function getByAuthenticationKey(authenticationKey) {
  const [userResults] = await db.query(
    'SELECT * FROM users WHERE authentication_key = ?',
    authenticationKey
  );

  if (userResults.length > 0) {
    const userResult = userResults[0];
    return Promise.resolve(
      newUser(
        userResult.id.toString(),
        userResult.email,
        userResult.password,
        userResult.role,
        userResult.first_name,
        userResult.last_name,
        userResult.authentication_key
      )
    );
  } else {
    return Promise.reject('no results found');
  }
}

export async function create(user) {
  delete user.id;

  return db
    .query(
      'INSERT INTO users (email, password, role, first_name, last_name) ' +
        'VALUES (?, ?, ?, ?, ?)',
      [user.email, user.password, user.role, user.firstName, user.lastName]
    )
    .then(([result]) => {
      return { ...user, id: result.insertId };
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function update(user) {
  return db
    .query(
      'UPDATE users SET ' +
        'email = ?, ' +
        'password = ?, ' +
        'role = ?, ' +
        'first_name = ?, ' +
        'last_name = ?, ' +
        'authentication_key = ? ' +
        'WHERE id = ?',
      [
        user.email,
        user.password,
        user.role,
        user.firstName,
        user.lastName,
        user.authenticationKey,
        user.id,
      ]
    )
    .then(([result]) => {
      return { ...user, id: result.insertId };
    });
}

export const updateUser = async (user) => {
  const fieldsToUpdate = [];
  const params = [];

  // 字段到数据库列的映射
  const fieldMapping = {
    email: 'email',
    password: 'password',
    role: 'role',
    firstName: 'first_name',
    lastName: 'last_name',
    authenticationKey: 'authentication_key',
  };

  // 动态构建更新语句的部分
  for (const [key, column] of Object.entries(fieldMapping)) {
    if (user[key] !== undefined) {
      fieldsToUpdate.push(`${column} = ?`);
      params.push(
        key === 'password' ? bcrypt.hashSync(user[key], 10) : user[key]
      );
    }
  }

  if (!fieldsToUpdate.length) {
    throw new Error('No fields provided for update.');
  }

  // 添加用户ID到参数数组末尾，用于WHERE子句
  params.push(user.id);
  const sql = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;

  try {
    const [result] = await db.query(sql, params);
    if (result.affectedRows === 0) {
      throw new Error('No user found with the given ID.');
    }
    return { ...user, updateStatus: 'success' };
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

export async function deleteByID(userID) {
  return db.query('DELETE FROM users WHERE id = ?', userID);
}
