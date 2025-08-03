import Home from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/auth/signup/signup";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
