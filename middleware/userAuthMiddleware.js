function userAuthMiddleware(req, res, next) {

  const { user_id, email, password } = req.body;

  if (!user_id ) {
    res.send("Credentials Missing!");
  }

  next();
}

module.exports = {
  userAuthMiddleware,
};
