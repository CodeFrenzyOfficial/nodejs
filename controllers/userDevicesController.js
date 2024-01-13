const pool = require("../db");

async function getUserDeviceImages(req, res) {
  const { user_id } = req.query;
  try {
    const response = await pool.query(
      "SELECT p_image FROM users WHERE user_id=$1",
      [user_id]
    );
    if (response.rows.length !== 0) {
      res.status(200).json(response.rows);
    } else {
      res.status(200).json({
        message: "No Data to Show",
      });
    }
  } catch (error) {
    res.status(500).send("Server Error");
    console.log("Error:", error);
  }
}

async function addUserDevice(req, res) {
  const { url, user_id } = req.body;
  try {
    const response = await pool.query(
      "UPDATE users SET p_image = array_append(p_image,$1::text) WHERE user_id=$2;",
      [url, user_id]
    );
    if (response.rows.length !== 0) {
      res.status(200).json(response.rows);
    } else {
      res.status(200).json({
        message: "No Data to Show",
      });
    }
  } catch (error) {
    res.status(500).send("Server Error");
    console.log("Error:", error);
  }
}

module.exports = {
  getUserDeviceImages,
  addUserDevice,
};
