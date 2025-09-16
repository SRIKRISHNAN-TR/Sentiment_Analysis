import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models & Routes
import Login from "./models/Login.js";
import Problem from "./models/Problem.js";
import FeedbackRoutes from "./routes/feedback.js";
import ProblemsRoutes from "./routes/problems.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use("/api/problems", ProblemsRoutes);
app.use("/api/feedback", FeedbackRoutes);

// --- Root Route ---
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// --- Register ---
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const existingUser = await Login.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Login({ name, email, password: hashedPassword, role: "user" });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Login ---
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Login.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    createAdmin();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Default Admin Creation ---
async function createAdmin() {
  try {
    const existingAdmin = await Login.findOne({ email: "admin@gmail.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await new Login({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      }).save();
      console.log("Admin created: admin@gmail.com / admin123");
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  }
}
