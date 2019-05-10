const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const secrets = new AWS.SecretsManager({region: 'us-west-2'});

const sessionManager = require('../utils/control/session-manager.js');

router.get('/', async function(req, res) {
  res.render('password-entry');
});

router.post('/', async function(req, res, next) {
  const {password} = req.body;

  // Get password
  const secretPassword = process.env.CARRY_IT_FORWARD_SECRET 
  if (password != secretPassword) {
    res.status(401);
    res.send('Incorrect password. Please try again');
    return;
  }

  // Give the user a new session
  req.session.sessionKey = sessionManager.generateSession();

  res.redirect(`/admin${req.query.access_token ? '?access_token=' + req.query.access_token : ''}`);
});

module.exports = router;
