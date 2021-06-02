const rejectUnauthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };
