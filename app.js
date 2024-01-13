//IMPORTS
const express = require("express");
const app = express();
const cors = require("cors");

//CONSTANTS
const PORT = process.env.PORT || 8000;


//MIDDLEWARES
app.use(express.json()); //to return files as json
app.use(cors()); //for cross origin files



app.get("/", async (req, res) => {
  res.send(
    `<h1>
     @Vercel Postgres Server is Running 
    </h1>`
  );
});


//ROUTES
// User Auth
app.use("/auth", require("./routes/userAuth"));
// Users Crud
app.use("/v1", require("./routes/usersCrud"));
// User Devices
app.use("/v1", require("./routes/userDevices"));


//SERVER PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
