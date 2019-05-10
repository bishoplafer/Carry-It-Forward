const express = require('express');
const router = express.Router();

const sessionManager = require('../utils/control/session-manager.js');
const dynamodb = new (require('aws-sdk').DynamoDB)({region: 'us-west-2'});

const renderPeople = require('../utils/rendering/render-people.js');

const typeActionMap = {
  render: async () => {
    const {Items:people} = await new Promise((resolve, reject) => {
      dynamodb.scan({TableName: 'carry-it-forward-people'}, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    const peoplePages = await renderPeople(people);
    console.log(peoplePages);
  }
}

router.get('/', async function(req, res) {
  // Check for session
  if (!req.session.sessionKey || !sessionManager.checkSession(req.session.sessionKey)) {
    res.status(401);
    res.redirect(`/password-entry${req.query.access_token ? '?access_token=' + req.query.access_token : ''}`);
    return;
  }

  const {Items:people} = await new Promise((resolve, reject) => {
    dynamodb.scan({TableName: 'carry-it-forward-people'}, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });

  console.log(people);
  res.render('admin', {people, accessToken: req.query.access_token});
});

router.post('/', async function(req, res) {
  // Check for session
  if (!req.session.sessionKey || !sessionManager.checkSession(req.session.sessionKey)) {
    res.status(401);
    res.redirect(`/password-entry${req.query.access_token ? '?access_token=' + req.query.access_token : ''}`);
    return;
  }

  const {body, query} = req;

  if (!typeActionMap[query.type]) {
    res.send('Invalid Type');
    return;
  }

  typeActionMap[query.type]();

  console.log(body, query);
  // await new Promise((resolve, reject) => {
  //   dynamodb.putItem(record, (err, data) => {
  //     if (err) return reject(err);
  //     return resolve(data);
  //   });
  // });

  res.status(200);
  res.redirect(`admin${req.query.access_token ? '?access_token=' + req.query.access_token : ''}`);
});

module.exports = router;
