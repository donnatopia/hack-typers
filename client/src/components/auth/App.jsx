import React from "react";
import Signup from "./Signup.jsx";
import Login from './Login.jsx';
import Dashboard from '../Dashboard.jsx';
import { AuthProvider } from '../../contexts/AuthContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            {/* <Route path='/' element={<Dashboard />} /> */}
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;