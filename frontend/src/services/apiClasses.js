import getStoredAuthKey from "../utils/getStoredAuthKey";
import { API_URL } from "./apiURL";

// export async function getClasses() {
//   // GET from the API /animals
//   const res = await fetch(API_URL + "/classes", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const { data } = await res.json();

//   return data;
// }

export async function getClasses() {
  // GET from the API /animals
  const res = await fetch(API_URL + "/classes/details", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data } = await res.json();

  return data;
}

export async function getClass(classID) {
  // if (Number(classID) === class.id) return;
  const res = await fetch(`${API_URL}/classes/${classID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data } = await res.json();

  return data;
}

export async function getLocationsByTrainerName(trainerName) {
  // console.log("Trainer name:", trainerName);
  const response = await fetch(
    `${API_URL}/classes/locations-for-trainer/${encodeURIComponent(trainerName)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("No locations found with this trainer");
  }

  const locations = await response.json();
  // console.log(locations);
  return locations;
}

export async function getLocationsByTrainerNameAndClass(trainerName, classId) {
  const response = await fetch(
    `${API_URL}/classes/locations-for-trainer-and-class/${encodeURIComponent(trainerName)}/${encodeURIComponent(classId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("No locations found for this trainer and class");
  }

  const locations = await response.json();
  return locations;
}

export async function createClass({ newClass, authenticationKey }) {
  try {
    const res = await fetch(`${API_URL}/classes`, {
      method: "POST",
      body: JSON.stringify(newClass),
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-KEY": authenticationKey,
      },
    });
    console.log(res);

    if (!res.ok) throw Error("Class could not be created");

    const { data } = await res.json();
    console.log(data);
    return data;
  } catch {
    throw Error("Failed creating class");
  }
}

export async function deleteClass(classId) {
  const authenticationKey = getStoredAuthKey();
  const response = await fetch(`${API_URL}/classes/${classId}`, {
    method: "DELETE", // Use the DELETE HTTP method
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-KEY": authenticationKey,
    },
  });

  // Check if the deletion was not successful
  if (!response.ok) {
    // Convert the response to JSON to get the error message
    const errorData = await response.json();
    // Throw an error with the message from the response
    throw new Error(errorData.error || "Failed to delete the class.");
  }

  const data = await response.json();

  // If the response is okay, you can return the response, or just true to indicate success
  return data;
}
