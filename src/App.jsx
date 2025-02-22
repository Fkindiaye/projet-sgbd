import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import DGE from "./components/DGE";
import Candidat from "./components/Candidat";
import Electeur from "./components/Electeur";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dge" element={<DGE />} />
        <Route path="/candidat" element={<Candidat />} />
        <Route path="/electeur" element={<Electeur />} />
      </Routes>
    </Router>
  );
}

export default App;
