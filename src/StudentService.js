// src/studentService.js
import axios from 'axios';

const API_URL = 'https://curd-api-backend.onrender.com/student'; // Adjust the URL as needed

export const createStudent = async (student) => {
    try {
        const response = await axios.post(API_URL, student);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateStudent = async (student) => {
    try {
        const response = await axios.put(API_URL, student);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getStudents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteStudent = async (rollNo) => {
    try {
        const response = await axios.delete(`${API_URL}/${rollNo}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
