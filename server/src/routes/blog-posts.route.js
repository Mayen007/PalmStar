const express = require('express');

const BlogPost = require('../models/blogPost.model');
const { mockBlogPosts } = require('../data/mockData');
const isMongoConnected = require('../utils/isMongoConnected');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    if (isMongoConnected()) {
      const blogPosts = await BlogPost.find().sort({ publishedAt: -1 }).lean();
      return res.json({ data: blogPosts });
    }

    return res.json({ data: mockBlogPosts });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
