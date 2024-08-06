// src/components/StudentForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { createStudent, updateStudent, getStudentById } from '../services/studentService';
import { useAuth } from '../../context/AuthContext';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth(); // Use the useAuth hook here

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const student = await getStudentById(id, user.token);
          setName(student.name);
          setSubject(student.subject);
          setMarks(student.marks);
        } catch (error) {
          console.error('Failed to fetch student:', error);
        }
      };
      fetchStudent();
    }
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateStudent(id, { name, subject, marks }, user.token);
      } else {
        await createStudent({ name, subject, marks }, user.token);
      }
      navigate('/students');
    } catch (error) {
      console.error('Failed to submit student data:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography component="h1" variant="h5">
          {id ? 'Edit Student' : 'Add Student'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Marks"
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            {id ? 'Update Student' : 'Add Student'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default StudentForm;
