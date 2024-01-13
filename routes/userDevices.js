const router = require("express").Router();
const userDevicesController = require("../controllers/userDevicesController");

router.get("/getUserDevices", userDevicesController.getUserDeviceImages);
router.post("/addUserDevice", userDevicesController.addUserDevice);

module.exports = router;