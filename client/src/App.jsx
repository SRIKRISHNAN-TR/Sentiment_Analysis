import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import HandleBills from './components/HandBills';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/bills" element={<HandleBills />} />
        <Route path="/bill/:billId" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
