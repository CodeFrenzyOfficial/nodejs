const router = require("express").Router();
const userCrudController = require("../controllers/usersDataController");

router.get("/getAllUsers", userCrudController.getAllUsers); 

module.exports = router;