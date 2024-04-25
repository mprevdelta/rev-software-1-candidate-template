
import axios from 'axios'

console.log("VITE_REV_CANDIDATE_API_URL: " + import.meta.env.VITE_REV_CANDIDATE_API_URL)

if(import.meta.env.VITE_REV_CANDIDATE_BEARER_TOKEN?.length) {
    console.log("VITE_REV_CANDIDATE_BEARER_TOKEN is Set")
}
else {
    console.log("VITE_REV_CANDIDATE_BEARER_TOKEN Not Found -- Environment Likely Not Configured")
}

const Instance = axios.create({
    baseURL: import.meta.env.VITE_REV_CANDIDATE_API_URL,
    timeout: 5000,
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_REV_CANDIDATE_BEARER_TOKEN}`
    }
});

export default Instance
