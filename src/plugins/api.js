
import axios from 'axios'

const Instance = axios.create({
    baseURL: import.meta.env.VITE_REV_CANDIDATE_API_URL,
    timeout: 5000,
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_REV_CANDIDATE_BEARER_TOKEN}`
    }
});

export default Instance
