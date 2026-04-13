const express = require('express');

const User = require('../models/user.model');
const { validateLogin } = require('../middleware/validate.middleware');
const isMongoConnected = require('../utils/isMongoConnected');

const router = express.Router();

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const email = req.body.email.trim().toLowerCase();

    if (isMongoConnected()) {
      const user = await User.findOne({ email }).lean();

      if (!user) {
        return res.status(401).json({
          error: {
            message: 'Invalid credentials.',
            statusCode: 401,
          },
        });
      }

      return res.json({
        message: 'Login placeholder endpoint for Phase 4.',
        token: 'phase4-placeholder-token',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    return res.json({
      message: 'Login placeholder endpoint for Phase 4.',
      token: 'phase4-placeholder-token',
      user: {
        email,
        role: 'traveler',
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
