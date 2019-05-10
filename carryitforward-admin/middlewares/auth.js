'use strict';

const ACCESS_TOKEN = process.env.CARRY_IT_FORWARD_TOKEN;

module.exports = (req, res, next) => {
  // Always allow in debug mode
  const {env} = process;
  if (typeof env.DEBUG !== 'undefined' && env.DEBUG.split(':')[0] === env.npm_package_name) return next();

  // Check for access token
  const accessToken = req.query.access_token;
  if (accessToken !== ACCESS_TOKEN) {
    res.status('401');
    res.send();
    return;
  }

  next();
};
