import { Routes, Route, BrowserRouter } from "react-router-dom";

// Pages
import Home from "@/pages/home";
import Register from "@/pages/register";
import Login from "@/pages/login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
