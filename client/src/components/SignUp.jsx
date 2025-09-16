import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (data.message === "User registered successfully") {
        navigate("/login", { state: { success: "Signup successful! Please log in." } });
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.log(`Error connecting to API: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#E3F2FD", p: 2 }}>
      <Paper elevation={10} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, width: { xs: "100%", md: "900px" }, borderRadius: 3 }}>
        
        {/* Left side */}
        <Box sx={{ flex: 1, bgcolor: "#003366", color: "white", p: 4, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>Government eConsultation Portal</Typography>
          <Typography variant="body1" sx={{ color: "#B3CDE0" }}>
            Create an account to share your valuable suggestions for draft legislation.
          </Typography>
        </Box>

        {/* Right side */}
        <Box sx={{ flex: 1, p: 6, display: "flex", flexDirection: "column", justifyContent: "center", bgcolor: "white" }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>Signup</Typography>
          <Box component="form" onSubmit={handleSignup} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </Button>
          </Box>

          <Typography align="center" sx={{ mt: 3 }}>
            Already have an account? <Link to="/">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}