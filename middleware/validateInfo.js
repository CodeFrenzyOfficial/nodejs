module.exports = (req, res, next) => {
  const { name, email,  password } = req.body;

  //   if (req.path === "/register") {
  //     if (![firstname, lastname,  email, phone, password].every(Boolean)) {
  //       return res.status(400).json({
  //         error: "Missing credentials",
  //       });
  //     }
  //   }

  if (req.path === "/register") {
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Missing credentials",
      });
    }
  }

  if (req.path === "/login") {
    if (!email || !password) {
      return res.status(400).json({
        error: "Missing credentials",
      });
    }
  }
  next();
};
