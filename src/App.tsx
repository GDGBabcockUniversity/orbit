import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import SpeakersPage from "./pages/speakers";
import SponsorsPage from "./pages/sponsors";
import TicketsPage from "./pages/tickets";
import AdminPage from "./pages/admin";
import Footer from "./components/footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
