//IMPORTS
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//CONSTANTS
const PORT = process.env.PORT || 8000;

//MIDDLEWARES
app.use(express.json()); //to return files as json
app.use(cors()); //for cross origin  files

app.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM users");
  if (data.rows.length !== 0) {
    res.send(data.rows);
  } else {
    res.status(409).json({
      error: "error",
    });
  }
});

//ROUTES
app.use("/auth", require("./routes/userAuth"));

//SERVER PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
