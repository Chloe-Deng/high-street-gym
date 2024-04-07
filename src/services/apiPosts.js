import { API_URL } from "./apiURL";

export async function getPosts() {
  const res = await fetch(API_URL + "/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data } = await res.json();

  return data;
}

export async function createPost(newPost) {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error("Post could not be created");

    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating post");
  }
}
