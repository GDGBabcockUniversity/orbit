import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SpeakersPage from "./pages/speakers";
import Footer from "./components/footer";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speakers" element={<SpeakersPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
