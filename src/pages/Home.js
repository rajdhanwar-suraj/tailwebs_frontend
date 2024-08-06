import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  IconButton, 
  Snackbar, 
  Alert,
  Box,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log('Fetching students...');
        const response = await axios.get('http://localhost:5001/api/students', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log('Students fetched:', response.data);
        setStudents(response.data);
      } catch (err) {
        console.error('Failed to fetch students', err);
        if (err.response && err.response.status === 401) {
          logout();
          navigate('/');
        } else {
          setError('Failed to fetch students. Please try again later.');
        }
      }
    };

    if (user) {
      fetchStudents();
    } else {
      navigate('/');
    }
  }, [user, navigate, logout]);

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Deleting student with id: ${id}`);
      await axios.delete(`http://localhost:5001/api/students/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setStudents(students.filter((student) => student._id !== id));
    } catch (err) {
      console.error('Failed to delete student', err);
      if (err.response && err.response.status === 401) {
        logout();
        navigate('/');
      } else {
        setError('Failed to delete student. Please try again later.');
      }
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.user.name}
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.subject}</TableCell>
                <TableCell>{student.marks}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(student._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(student._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={() => navigate('/add-student')}>
        Add Student
      </Button>
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Home;
