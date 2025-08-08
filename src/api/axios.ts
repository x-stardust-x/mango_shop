import axios from 'axios'

const API_BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://mango-api-41pe.onrender.com/api/'  // 換成你的 Render API
        : 'http://localhost:3000/api'

const instance = axios.create({
    baseURL: API_BASE_URL,
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token') // 從 localStorage 取得 token

    if (token) {
        // 加入 Authorization 標頭，格式是 Bearer token字串
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})


export default instance