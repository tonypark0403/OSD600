// [INFO] See discussion of node.js exports here:
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/

// exports.isValidEmail = function isValidEmail(email) {
//   TODO: needs to be implemented
//   if (email.includes('@myseneca.ca')) {
//   return true;
//   }
//   return false;

// };

exports.isValidEmail = function isValidEmail(email) {
  /**
    * Given a string `email`, return `true` if the string is in the form
    * of a valid Seneca College email address, `false` othewise.
    */
  // return (typeof email === 'string') && (/@myseneca.ca$/.test(email);
  // email.match(/@myseneca.ca$/);

  if (typeof email !== 'string') {
    return false;
  }
  const validEmail = /^[^ ]*@myseneca.ca$|senecac.on.ca$|senecacollege.ca$/;
  return validEmail.test(email);
};

/**
 * Given a string `name`, return a formatted Seneca email address for
 * this person. NOTE: the email doesn't need to be real/valid/active.
 */
exports.formatSenecaEmail = function formatSenecaEmail(name) {
  // TODO: needs to be implemented
  if (name === null) {
    throw new Error('no null');
  } else if (!(/^\w+$/.test(name))) {
    throw new Error('no whitespace');
  }
  return name.concat('@myseneca.ca');
};
