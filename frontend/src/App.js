import Nav from "./components/NavBar/Nav";
import Home from "./home/Home";
import Login from "./views/Login/Login";
import Results from "./views/Results/Results";
import Hotels from "./views/Hotels/Hotels";
import Footer from "./components/Footer/Footer";
import IconHeader from "./components/IconsHeader/IconHeader";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <IconHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/:id" element={<Hotels />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
