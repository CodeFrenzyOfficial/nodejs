const router = require("express").Router();
const userDevicesController = require("../controllers/userDevicesController");

router.get("/getUserDevices", userDevicesController.getUserDeviceImages);
router.post("/addUserDevice", userDevicesController.addUserDevice);
router.post("/deleteUserDevice", userDevicesController.deleteDeviceImage);
router.post("/updateUserDevice", userDevicesController.updateImg);

module.exports = router;