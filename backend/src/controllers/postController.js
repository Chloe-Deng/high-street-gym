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
  // 从请求体中获取帖子数据
  const { postTitle, postContent, userName } = req.body;

  // 验证必要的数据是否已提供
  if (!postTitle || !postContent || !userName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // 调用 createPost 函数尝试创建新帖子，并获取返回的帖子详情
    const newPost = await Posts.createPost({
      date: new Date(),
      postTitle,
      postContent,
      userName,
    });

    // 如果创建成功，返回 201 状态码和新创建的帖子详情
    res.status(201).json({
      message: 'Post created successfully',
      data: newPost,
    });
  } catch (error) {
    // 处理发生的错误，可能是因为找不到用户、数据库错误等
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

    // Send a success response
    res.status(200).json({
      status: 'success',
      message: 'Deleted the post',
    });
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

export default postController;
