const express = require('express');

const Inquiry = require('../models/inquiry.model');
const { mockInquiries } = require('../data/mockData');
const { validateInquiry } = require('../middleware/validate.middleware');
const isMongoConnected = require('../utils/isMongoConnected');

const router = express.Router();

router.post('/', validateInquiry, async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name.trim(),
      email: req.body.email.trim().toLowerCase(),
      message: req.body.message.trim(),
    };

    if (isMongoConnected()) {
      const inquiry = await Inquiry.create(payload);
      return res.status(201).json({ data: inquiry });
    }

    const fallbackInquiry = {
      id: `inquiry-${mockInquiries.length + 1}`,
      ...payload,
      createdAt: new Date().toISOString(),
      source: 'in-memory-fallback',
    };

    mockInquiries.push(fallbackInquiry);
    return res.status(201).json({ data: fallbackInquiry });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
