import { db } from '../database.js';

export function Post(id, postAt, postTitle, postContent, userName) {
  return {
    id,
    postAt,
    postTitle,
    postContent,
    userName,
  };
}

export async function getPosts(page = 1, limit = 1) {
  const offset = (page - 1) * limit;

  const query = `
    SELECT 
      p.id, 
      p.post_at, 
      p.post_title, 
      p.post_content, 
      u.first_name AS userName
    FROM 
      posts p
    INNER JOIN 
      users u ON p.post_user_id = u.id
  `;

  try {
    const [posts] = await db.query(query, [parseInt(limit), parseInt(offset)]);
    return posts.map(
      (post) =>
        new Post(
          post.id,
          post.post_at,
          post.post_title,
          post.post_content,
          post.userName
        )
    );
  } catch (error) {
    console.error('Error fetching posts with user names:', error);
    throw error;
  }
}

export async function createPost(newPost) {
  const { postTitle, postContent, userName } = newPost;

  try {
    const [users] = await db.query(
      'SELECT id FROM users WHERE first_name = ?',
      [userName]
    );
    if (users.length === 0) {
      throw new Error('User not found');
    }
    const userId = users[0].id;

    const insertQuery = `
      INSERT INTO posts ( post_title, post_content, post_user_id) 
      VALUES ( ?, ?, ?)
    `;
    const [result] = await db.query(insertQuery, [
      postTitle,
      postContent,
      userId,
    ]);

    return {
      id: result.insertId,
      postAt: new Date().toISOString(),
      postTitle,
      postContent,
      userName,
    };
  } catch (error) {
    console.error('Error creating new post:', error);
    throw error;
  }
}

export async function deletePost(postId) {
  try {
    // First, attempt to delete the post by ID
    const deleteQuery = `DELETE FROM posts WHERE id = ?`;
    const [result] = await db.query(deleteQuery, [postId]);

    // Check if the delete operation was successful
    if (result.affectedRows === 0) {
      throw new Error(
        'No post found with the given ID, or it has already been deleted.'
      );
    }

    // Return a success message
    return { message: 'Post deleted successfully', postId };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
