import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import FintechApp from './pages/home';

function App() {
  const [id, setId] = useState(null);

  const handleLogin = (id) => {
    setId(id);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={id ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={id ? <Navigate to="/" /> : <Register onRegister={handleLogin} />} />
          <Route path="/" element={id ? <FintechApp id={id} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
