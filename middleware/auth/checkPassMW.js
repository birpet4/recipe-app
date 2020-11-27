/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /nagymama
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  return function(req, res, next) {
    if (typeof req.body.password === 'undefined') {
        return next();
    }

    if (req.body.password === 'pwadmin') {
        req.session.loggedIn = true;
        return req.session.save(err => res.redirect('/shops'));
    }

    res.locals.error = 'Invalid password';
    return next();
};
};
