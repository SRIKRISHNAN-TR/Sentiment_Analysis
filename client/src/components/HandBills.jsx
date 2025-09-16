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

  useEffect(() => {
    const dummyBills = [
      { id: "1", title: "Healthcare Reform Bill", description: "A bill to reform the healthcare system." },
      { id: "2", title: "Education Improvement Bill", description: "A bill to improve education standards." },
      { id: "3", title: "Environmental Protection Bill", description: "A bill to protect the environment." },
      { id: "4", title: "Taxation Policy Bill", description: "A bill to reform the taxation policy." }
    ];
    setBills(dummyBills);
  }, []);

  const handleBillClick = (billId) => {
    navigate(`/bill/${billId}`);
  };

  const filteredBills = bills.filter(
    (bill) =>
      bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase())
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
          {filteredBills.map((bill, idx) => (
            <React.Fragment key={bill.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleBillClick(bill.id)}
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
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#0a1f44" }}>
                        {bill.id}.  {bill.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: "#1976d2" }}>
                        {bill.description}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
              {idx < filteredBills.length - 1 && <Divider />}
            </React.Fragment>
          ))}

          {filteredBills.length === 0 && (
            <Typography variant="body1" align="center" sx={{ color: "#555", mt: 3 }}>
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
