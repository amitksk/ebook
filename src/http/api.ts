import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        // "Authorization": "Bearer YOUR_API_TOKEN",
        "Content-Type": "application/json",
    },
})


export const login = async (data: {email: string, password: string}) => {
    return api.post('/api/v1/users/login', data)
}

export const userRegister = async (data: {name: string, email: string, password: string}) => {
    return api.post('/api/v1/users/register', data)
}
