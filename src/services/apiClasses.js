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

export async function createClass(newClass) {
  try {
    const res = await fetch(`${API_URL}/classes`, {
      method: "POST",
      body: JSON.stringify(newClass),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error("Class could not be created");

    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating class");
  }
}
