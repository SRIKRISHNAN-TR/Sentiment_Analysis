import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HandleBills = () => {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchBills = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/problems/getbills");
      const data = await res.json();
      console.log("Fetched bills:", data);
      setBills(data.problems || []);
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const filteredBills = bills.filter(
    (bill) =>
      bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill._id.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#0a1f44",
            mb: 4,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Passed Bills
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search by bill ID or title..."
          variant="outlined"
          sx={{ mb: 4 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", bgcolor: "white" }}>
          {filteredBills.length > 0 ? (
            filteredBills.map((bill, idx) => (
              <React.Fragment key={bill._id}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("/comment",{state: {bill}})}
                    sx={{
                      py: 3,
                      px: 4,
                      borderRadius: 2,
                      mb: 2,
                      bgcolor: "#f5f7fa",
                      "&:hover": {
                        bgcolor: "#e8f0fe",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: "#0a1f44" }}>
                            {bill.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "gray", marginLeft: "auto" }}
                          >
                            Updated at: {bill.updatedAt.slice(0, 10)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="caption"
                            sx={{ color: "gray" }}
                          >
                            Created by: {bill.createdBy}
                          </Typography>
                        </>
                      }
                      
                    />
                  </ListItemButton>
                </ListItem>
                {idx < filteredBills.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#555", mt: 3 }}
            >
              No bills found matching your search.
            </Typography>
          )}
        </List>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 5,
            color: "#555",
            fontStyle: "italic",
          }}
        >
          Select a bill to view details and submit your valuable feedback.
        </Typography>
      </Container>
    </Box>
  );
};

export default HandleBills;
