import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // import the database connection
import dotenv from "dotenv";
import router from "./router/generative.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

// Connect to the database
connectDB();


app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api/generative",router)

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
