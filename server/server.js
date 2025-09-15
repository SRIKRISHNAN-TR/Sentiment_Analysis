import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import FeedbackRoutes from "./routes/feedback.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/feedback", FeedbackRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Listening on PORT ${port}`));
    createAdmin();
  })
  .catch(err => console.error("MongoDB connection error:", err));

const loginSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" }
});

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  nature: String,
});
const adminSchema = mongoose.Schema({
  name:String,
  sentiment: Number,
  description: String,
});

const Login = mongoose.model("Login", loginSchema);
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_env";

async function createAdmin() {
  try {
    const existingAdmin = await Login.findOne({ email: "admin@gmail.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await new Login({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin"
      }).save();
      console.log("Admin created: admin@gmail.com / admin123");
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  }
}

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ message: "Please enter all fields" });

    const existingUser = await Login.findOne({ email });
    if (existingUser)
      return res.json({ message: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Login({ name, email, password: hashedPassword, role: "user" });
    await newUser.save();

    res.json({ message: "User Registered Successfully" });
  } catch (err) {
    res.json({ message: `Error in Registering user: ${err}` });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Login.findOne({ email });
    if (!user) return res.json({ message: "User Not Found, Please Register" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Incorrect Password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);

    if (user.role === "admin") {
      res.json({ message: "Admin Login Successful", token, redirect: "/admin" });
    } else {
      res.json({ message: "User Login Successful", token, redirect: "/" });
    }
  } catch (err) {
    res.json({ message: `Error in Logging in: ${err}` });
  }
});



