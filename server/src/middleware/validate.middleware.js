function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function validateInquiry(req, _res, next) {
  const { name, email, message } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return next(badRequest('Name must be at least 2 characters.'));
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return next(badRequest('A valid email is required.'));
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return next(badRequest('Message must be at least 10 characters.'));
  }

  return next();
}

function validateLogin(req, _res, next) {
  const { email, password } = req.body || {};

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return next(badRequest('A valid email is required.'));
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return next(badRequest('Password must be at least 6 characters.'));
  }

  return next();
}

module.exports = {
  validateInquiry,
  validateLogin,
};
