const pool = require("../db");

const getAllUsers = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
    if (response.rows.length !== 0) {
      res.status(200).json(response.rows);
    } else {
      res.status(200).json("No Data to Show");
    }
  } catch (error) {
    res.status(500).send("Server Error");
    console.log("Error:", error);
  }
};

module.exports = {
  getAllUsers,
};
