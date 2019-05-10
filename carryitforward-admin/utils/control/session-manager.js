'use strict';
/*
  A quick and dirty session store. Normally this wouldn't be suited for a production environment, however, since
  the only people who should be accessing this server are internal clients, we can cut corners a little bit

  Note: Since sessions are stored in local memory a server interruption will invalidate all sessions
*/

const uuid = require('uuid/v4');

let sessions = [];

/**
 * This class can be used to generate new sessions
 */
class Session {
  // Generates a new session
  constructor() {
    this.key = uuid(),
    this.timestamp = Date.now();
  }
}

/**
 * Generates a session and returns the generated session key
 *
 * @return {string} The randomly generated session key
 */
module.exports.generateSession = () => {
  const newSession = new Session();
  sessions.push(newSession);

  return newSession.key;
};

/**
 * Checks a given key and determines if it is attached to a valid session
 *
 * @param {string} key The session key to check for
 * @return {boolean} If an active session was found
 */
module.exports.checkSession = (key) => {
  // Try to find the session in the sessions array. Remove old sessions while we are at it
  let foundKey = false;
  sessions = sessions.filter((session) => {
    // First remove old sessions
    const msIn24Hours = 1000 * 60 * 60 * 24;
    if (Date.now() > session.timestamp + msIn24Hours) {
      // The session expired
      return false;
    }

    // Now check for the session key
    if (session.key === key) {
      foundKey = true;
    }

    return true;
  });

  return foundKey;
};
