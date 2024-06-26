import { API_URL } from "./apiURL";

export async function login(email, password) {
  const response = await fetch(API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) throw Error("Failed logging in");

  const APIResponseObject = await response.json();
  // console.log(APIResponseObject);

  return APIResponseObject;
}

export async function logout(authenticationKey) {
  const response = await fetch(API_URL + "/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) throw Error("Can not logout");

  const APIResponseObject = await response.json();

  return APIResponseObject;
}

export async function getAllUsers(authenticationKey) {
  // GET from the API /users
  const response = await fetch(API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });

  if (!response.ok) throw Error("Can not get the users data.");

  const data = await response.json();

  return data.users;
}

export async function getUserByID(userID, authenticationKey) {
  try {
    const response = await fetch(`${API_URL}/users/${userID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-KEY": authenticationKey,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user data.");
    }

    const data = await response.json();

    return data.user;
  } catch (error) {
    console.error("getUserByID error:", error.message);
    throw error; 
  }
}

export async function getByAuthenticationKey(authenticationKey) {
  const response = await fetch(
    API_URL + "/users/authentication/" + authenticationKey,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const APIResponseObject = await response.json();

  return APIResponseObject.user;
}

// Send PATCH request to the backend API to update user info
export async function updateUser({ user, authenticationKey }) {
  const userId = user.id;
  const updatedFields = { ...user };
  delete updatedFields.id; // Remove the id as it should not be in the update fields

  const response = await fetch(API_URL + "/users/" + userId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
    body: JSON.stringify(updatedFields), // Send the updated fields directly
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const patchUserResult = await response.json();
  // console.log(patchUserResult);

  return patchUserResult;
}

// export async function updateUser({ user, authenticationKey }) {
//   const response = await fetch(API_URL + "/users/" + user.id, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "X-AUTH-KEY": authenticationKey,
//     },
//     body: JSON.stringify({ user }),
//   });

//   const patchUserResult = await response.json();
//   console.log(patchUserResult);

//   return patchUserResult;
// }

export async function createUser({ user, authenticationKey }) {
  try {
    const response = await fetch(API_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-KEY": authenticationKey,
      },
      body: JSON.stringify(user),
    });

    // console.log(response);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "You are not authorized to perform this action! Please log in as administrator",
        );
      } else {
        throw new Error(response.statusText || "Error creating user");
      }
    }

    const postUserResult = await response.json();
    return postUserResult;
  } catch (error) {
    console.error("Error in createUser:", error.message);

    throw error;
  }
}

export async function deleteUser({ userID, authenticationKey }) {
  const response = await fetch(API_URL + "/users/" + userID, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
    // body: JSON.stringify({}),
  });

  if (!response.ok) {
    if (response.status === 403)
      throw new Error(`You are not authorized to perform this task!`);
  }

  const deleteResult = await response.json();

  return deleteResult;
}

export async function registerUser(newUser) {
  const response = await fetch(API_URL + "/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const user = await response.json();

  return user;
}
