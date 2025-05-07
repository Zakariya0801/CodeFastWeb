const express = require("express");
const connectDB = require("./config/connect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {createStudentEvaluation} = require("./controllers/EvaluationController")
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
//middleware
const {protect} = require("./middleware/AuthMiddleware");

//routes
const authRouter = require("./routes/AuthRoutes");
const userRouter = require("./routes/UserRoutes");
const courseRouter = require("./routes/CourseRoutes");
const universityRouter = require("./routes/UniversityRoutes");
const quizRoutes = require('./routes/QuizRoutes')
const studyMaterialRoutes = require('./routes/StudyMaterialRoutes')
const adminRoutes = require('./routes/AdminRoutes')
const industryRoutes = require('./routes/IndustryRoutes')
const suggestionRoutes = require('./routes/SuggestionRoutes')
const jobRoutes = require('./routes/JobRoutes')
const SPerformanceController = require('./controllers/SperformanceController')
const studentJobRoutes = require('./routes/StudentIndustryRoutes')
const studentJobSyncRoutes = require('./routes/StudentJobsSyncRoutes');

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
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRouter);
app.use("/api/university", universityRouter);
app.use("/api/course", courseRouter);
app.use('/api/quizzes', quizRoutes);
app.use('/api/study-materials', studyMaterialRoutes);
app.post("/api/evaluation", createStudentEvaluation);
app.use("/api/industry", protect, industryRoutes);
app.use("/api/suggestion", suggestionRoutes);
app.use("/api/jobs", jobRoutes);
app.get("/api/performance", SPerformanceController.getLeaderboard);
app.use("/api/student-job", studentJobRoutes);
app.use("/api/student-job-sync",protect, studentJobSyncRoutes);
///////////////////////////////////////////////////
///////////////PROTECTED ROUTES////////////////////
///////////////////////////////////////////////////


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
