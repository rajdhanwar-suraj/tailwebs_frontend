import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Box,
  Typography,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext'; // Make sure to import useAuth hook correctly
import { getStudents, deleteStudent } from '../services/studentService';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // Use the useAuth hook to get the user and token

  useEffect(() => {
    const fetchStudents = async () => {
      if (user && user.token) {
        try {
          const result = await getStudents(user.token);
          setStudents(result);
        } catch (error) {
          console.error('Failed to fetch students:', error);
        }
      }
    };
    fetchStudents();
  }, [user]);

  const handleDelete = async (id) => {
    if (user && user.token) {
      try {
        await deleteStudent(id, user.token);
        setStudents(students.filter((student) => student._id !== id));
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Students</Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
            Home
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/add-student')} 
            style={{ marginLeft: '10px' }}
          >
            Add Student
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.subject}</TableCell>
                <TableCell>{student.marks}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/edit-student/${student._id}`)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentList;
