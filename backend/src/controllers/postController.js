import { Router } from 'express';
import * as Posts from './../models/posts.js';
import auth from '../middleware/auth.js';

const postController = Router();

postController.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;

  const posts = await Posts.getPosts(page, limit);

  res.status(200).json({
    status: 'Success',
    message: 'Get all posts',
    results: posts.length,
    data: posts,
  });
});

postController.post('/', async (req, res) => {
  const { postTitle, postContent, userName } = req.body;

  if (!postTitle || !postContent || !userName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newPost = await Posts.createPost({
      date: new Date(),
      postTitle,
      postContent,
      userName,
    });

    res.status(201).json({
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (error) {
    console.error('Error creating new post:', error);
    res
      .status(500)
      .json({ message: 'Error creating new post', error: error.message });
  }
});

postController.delete('/:id', auth(['admin', 'trainer']), async (req, res) => {
  try {
    // Extract the postId from the URL parameters
    const { id } = req.params;
    // console.log(id);

    // Call the deletePost function with the postId
    await Posts.deletePost(id);

    res.status(200).json({
      status: 'success',
      message: 'Deleted the post',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default postController;
