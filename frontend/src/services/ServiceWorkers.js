import Axios from 'axios';
const BASE_URL = "http://localhost:5000"

export const addUserDetails = async (userData) => {
    try {
        const task = await Axios.post(`${BASE_URL}/register`, userData);
        return task;
    }   catch (e) {
        console.log(e.message);
    }
}

export const findAUserExistance = async (userData) => {
    try {
        const task = await Axios.post(`${BASE_URL}/login`, userData);
        const response = task.data.message;
        return response;
    }   catch (e) {
        console.log(e.message);
    }
}