const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const healthRouter = require('./routes/health.route');
const inquiriesRouter = require('./routes/inquiries.route');
const blogPostsRouter = require('./routes/blog-posts.route');
const authRouter = require('./routes/auth.route');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({ message: 'PalmStar API' });
});

app.use('/api/health', healthRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/blog-posts', blogPostsRouter);
app.use('/api/auth', authRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
