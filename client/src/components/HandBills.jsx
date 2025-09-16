import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HandleBills = () => {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dummyBills = [
      {
        id: "1",
        title: "Healthcare Reform Bill, 2025",
        ministry: "HEALTH",
        introduced: "20/08/2025",
        passedLS: "21/08/2025",
        passedRS: "22/08/2025",
      },
      {
        id: "2",
        title: "Education Improvement Bill, 2025",
        ministry: "EDUCATION",
        introduced: "18/08/2025",
        passedLS: "19/08/2025",
        passedRS: "20/08/2025",
      },
      {
        id: "3",
        title: "Environmental Protection Bill, 2025",
        ministry: "ENVIRONMENT",
        introduced: "15/08/2025",
        passedLS: "16/08/2025",
        passedRS: "17/08/2025",
      },
      {
        id: "4",
        title: "Taxation Policy Bill, 2025",
        ministry: "FINANCE",
        introduced: "12/08/2025",
        passedLS: "13/08/2025",
        passedRS: "14/08/2025",
      },
    ];
    setBills(dummyBills);
  }, []);

  const handleBillClick = (billId) => {
    navigate(`/home?billId=${billId}`);
  };

  const filteredBills = bills.filter(
    (bill) =>
      bill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", py: 6 }}>
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
          Bills List
        </Typography>

        <TextField
          fullWidth
          placeholder="Search by Bill ID or Title..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: "#0a1f44" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Ministry</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Introduced</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Passed in LS</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Passed in RS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBills.length > 0 ? (
                filteredBills.map((bill) => (
                  <TableRow
                    key={bill.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleBillClick(bill.id)}
                  >
                    <TableCell>{bill.id}</TableCell>
                    <TableCell>{bill.title}</TableCell>
                    <TableCell>{bill.ministry}</TableCell>
                    <TableCell>{bill.introduced}</TableCell>
                    <TableCell>{bill.passedLS}</TableCell>
                    <TableCell>{bill.passedRS}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    No bills found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 5,
            color: "#555",
            fontStyle: "italic",
          }}
        >
          Click on a bill to view details and submit your feedback.
        </Typography>
      </Container>
    </Box>
  );
};

export default HandleBills;
