const responseHelper = require('../extra/responseHelper');

function sessionRequired (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401);
    responseHelper.createErrorResponse(req, res, {error: 'session expired'});
  }
}

module.exports = {
  sessionRequired
};
