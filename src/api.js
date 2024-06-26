// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the auth token in localStorage
    }
});

export const getChats = () => api.get('/chats');
export const getMessages = (threadId) => api.get(`/chats/${threadId}/messages`);
export const sendMessage = (threadId, message) => api.post(`/chats/${threadId}/messages`, { message });
export const createChat = (subject, message, participants) => api.post('/chats', { subject, message, participants });