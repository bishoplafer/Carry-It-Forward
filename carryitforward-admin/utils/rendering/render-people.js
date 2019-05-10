'use strict';

const ejs = require('ejs');
const path = require('path');

module.exports = async (people) => {
  console.log('Rendering EJS..\n');
  const ejsOptions = {
    rmWhitespace: true,
    async: true
  }
  const renderPromises = people.map((person) => {
    return ejs.renderFile(path.normalize(__dirname + '/../../views/static-templates/person-template.ejs'), {person}, ejsOptions);
  });

  return await Promise.all(renderPromises);
}
