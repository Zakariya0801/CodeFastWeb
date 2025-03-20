const express = require("express");
const connectDB = require("./config/connect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
//middleware
const protect = require("./middleware/AuthMiddleware");

//routes
const authRouter = require("./routes/AuthRoutes");
const userRouter = require("./routes/UserRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
));
app.get("/", async (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/user", protect, userRouter);
app.use("/api/auth", authRouter);


///////////////////////////////////////////////////
///////////////PROTECTED ROUTES////////////////////
///////////////////////////////////////////////////


app.use((req, res) => {
  console.log("herer")
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
