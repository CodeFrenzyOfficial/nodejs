const pool = require("../db");
const { v4: uuidv4 } = require("uuid");


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


// UPDATE users SET p_image = array_append(p_image, jsonb_build_object('id', uuid_generate_v4(), 'url', 'new_image_url', 'description', 'https://www.egauge.net/django_static/home/images/homepage-productgroup.c42a611273ca.png')) WHERE user_id = 2;


async function addUserDevice(req, res) {
  const { url, name, user_id } = req.body;
  const newUuid = uuidv4();

  try {
     const response = await pool.query(
       `UPDATE users 
       SET p_image = array_append(p_image, ($1::jsonb)::jsonb)
       WHERE user_id = $2
       RETURNING user_id, name, email, p_image`,
       [{ id: newUuid, url, description: name }, user_id]
     );

    if (response.rows.length !== 0) {
      res.status(200).json(response.rows[0]);
    } else {
      res.status(200).json({
        message: "No Data to Show",
      });
    }
  } catch (error) {
    // Check if the error is a PostgreSQL error
    if (error.code) {
      res.status(500).json({
        error: {
          message: "PostgreSQL error",
          code: error.code,
          detail: error.detail,
        },
      });
    } else {
      // If it's not a PostgreSQL error, handle it in a general way
      res.status(500).json({ error: "Server Error" });
    }

    console.error("Error:", error);
  }
}


module.exports = {
  getUserDeviceImages,
  addUserDevice,
};
