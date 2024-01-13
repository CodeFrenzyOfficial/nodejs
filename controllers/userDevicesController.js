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

async function deleteDeviceImage(req, res) {
  const { id, user_id } = req.body;

  try {
    const user = await pool.query(
      `SELECT p_image 
       FROM users 
       WHERE user_id = $1`,
      [user_id]
    );

    if (user.rows.length !== 0) {
      let p_image = user.rows[0].p_image;
      const imgIndex = p_image.findIndex((img) => img.id === id);

      if (imgIndex !== -1) {
        p_image.splice(imgIndex, 1);

        const response = await pool.query(
          `UPDATE users 
           SET p_image = $1
           WHERE user_id = $2
           RETURNING user_id, name, email, p_image`,
          [p_image, user_id]
        );

        res.status(200).json(response.rows[0]);
      } else {
        res.status(400).json({
          message: "Image not found",
        });
      }
    } else {
      res.status(200).json({
        message: "No Data to Show",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function updateImg(req, res) {
  const { url, name, user_id, img_id } = req.body;

  try {
    const user = await pool.query(
      `SELECT p_image 
       FROM users 
       WHERE user_id = $1`,
      [user_id]
    );

    if (user.rows.length !== 0) {
      let p_image = user.rows[0].p_image;
      const imgIndex = p_image.findIndex((img) => img.id == img_id);

      if (imgIndex !== -1) {
        p_image[imgIndex] = { id: img_id, url, description: name };

        const response = await pool.query(
          `UPDATE users 
           SET p_image = $1
           WHERE user_id = $2
           RETURNING user_id, name, email, p_image`,
          [p_image, user_id]
        );

        res.status(200).json(response.rows[0]);
      } else {
        res.status(400).json({
          message: "Image not found",
        });
      }
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
  deleteDeviceImage,
  updateImg,
};