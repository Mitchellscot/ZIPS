const rejectUnauthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({id: 0, username: 'none'});
    //res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };
