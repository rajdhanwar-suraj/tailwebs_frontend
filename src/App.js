import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import StudentList from './components/student/StudentList';
import StudentForm from './components/student/StudentForm';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<ProtectedRoute />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="/students" element={<ProtectedRoute />}>
          <Route path="" element={<StudentList />} />
        </Route>
        <Route path="/add-student" element={<ProtectedRoute />}>
          <Route path="" element={<StudentForm />} />
        </Route>
        <Route path="/edit-student/:id" element={<ProtectedRoute />}>
          <Route path="" element={<StudentForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
