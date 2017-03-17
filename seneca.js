// [INFO] See discussion of node.js exports here:
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/

/**
 * Given a string `email`, return `true` if the string is in the form
 * of a valid Seneca College email address, `false` othewise.
 */
exports.isValidEmail = function(email) {
    // TODO: needs to be implemented
    var validEmail = email.split('@');
    if (validEmail[1].equals('myseneca.ca')){
        return 'valid';
    } else {
        return 'invalid';
    }
    // emailRegex = /^\w+([\.\-]?\w+)*@\w+([\.\-]?\w+)*(\.\w{2,3})+$/;
    // return emailRegex.test(email);
};

/**
 * Given a string `name`, return a formatted Seneca email address for
 * this person. NOTE: the email doesn't need to be real/valid/active.
 */
exports.formatSenecaEmail = function(name) {
    // TODO: needs to be implemented
    return name + '@myseneca.ca';
};