import axios from 'axios'

const API_BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://mango-api-41pe.onrender.com/api/'  // 換成你的 Render API
        : 'http://localhost:3000/api'

const instance = axios.create({
    baseURL: API_BASE_URL,
})

export default instance