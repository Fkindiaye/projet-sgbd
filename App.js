import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Acceuil';
import Parrainage from './pages/Parrainage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/parrainage" element={<Parrainage />} />
            </Routes>
        </Router>
    );
}

export default App;
