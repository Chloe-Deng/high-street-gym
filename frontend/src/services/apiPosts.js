import { API_URL } from "./apiURL";

export async function getPosts() {
  try {
    const res = await fetch(API_URL + "/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error("Can not get posts data");

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error("Error fetch posts:", err);
  }
}

export async function createPost(newPost) {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (!res.ok) throw Error("Post could not be created");

    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating post");
  }
}

export async function deletePost({ postId, authenticationKey }) {
  try {
    const res = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-KEY": authenticationKey,
      },
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`); // or res.statusText

    return "Post deleted successfully";
  } catch (error) {
    console.error("Failed deleting post:", error);
    throw new Error("Failed deleting post");
  }
}
