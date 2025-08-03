import Home from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/auth/signup/signup";
import Login from "./components/auth/login/login";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}
