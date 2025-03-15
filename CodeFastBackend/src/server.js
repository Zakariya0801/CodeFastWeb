const express = require("express");
const connectDB = require("./config/connect");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
//middleware

//routes


app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello, World!");
});

///////////////////////////////////////////////////
///////////////PROTECTED ROUTES////////////////////
///////////////////////////////////////////////////
// app.use("/api/v1/auth/", authRouter);


app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    // require('./loader').insertDummyData()
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
