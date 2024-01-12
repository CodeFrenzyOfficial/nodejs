const router = require("express").Router();
const userCrudController = require("../controllers/usersDataController");

router.get("/getAllUsers", userCrudController.getAllUsers); 
router.post("/deleteUser", userCrudController.deleteUser); 
router.post("/updateUser", userCrudController.updateUser); 

module.exports = router;