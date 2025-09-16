import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.role === "admin") {
        navigate("/admin", { state: { message: data.message } });
      } else if (data.role === "user") {
        localStorage.setItem("name", data.name || "Anonymous");
        navigate("/home", { state: { message: data.message } });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={10} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, width: { xs: "100%", md: "900px" }, borderRadius: 3 }}>
        
        {/* Left panel */}
        <Box sx={{ flex: 1, bgcolor: "#003366", color: "white", p: 4, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>Government eConsultation Portal</Typography>
          <Typography variant="body1" sx={{ color: "#B3CDE0" }}>
            Submit your suggestions for draft legislation and access your account here.
          </Typography>
        </Box>

        {/* Right panel */}
        <Box sx={{ flex: 1, p: 6, bgcolor: "white" }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>Login</Typography>
          {location.state?.success && (
            <Typography sx={{ mb: 2, color: "green" }}>{location.state.success}</Typography>
          )}
          <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>

          <Typography align="center" sx={{ mt: 3 }}>
            Don’t have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
