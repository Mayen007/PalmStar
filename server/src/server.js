const mongoose = require('mongoose');

const app = require('./app');
const env = require('./config/env');

async function connectMongoIfConfigured() {
  if (!env.mongoUri) {
    return;
  }

  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

async function startServer() {
  await connectMongoIfConfigured();

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}

startServer();
