const pool = require("../db");

const getAllUsers = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
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
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.body;
    const response = await pool.query(
      "DELETE FROM users WHERE user_id=$1 RETURNING 'Done' AS result",
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
};

const updateUser = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
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
};

module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
};
