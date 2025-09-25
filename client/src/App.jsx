import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Admin';
import SignupPage from './components/SignUp';
import HandleBills from './components/HandBills';
import Addbill from './components/admin cmp/Addbill';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/bills" element={<HandleBills />} />
        <Route path="/comment" element={<Home />} />
        <Route path= "add-bill" element={<Addbill />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
