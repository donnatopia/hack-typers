import React from "react";
import Signup from "./components/auth/Signup.jsx";
import Login from './components/auth/Login.jsx';
import Welcome from './components/auth/Welcome.jsx';
import Dashboard from './components/game/Dashboard.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path='/' element={<Welcome />}/>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;