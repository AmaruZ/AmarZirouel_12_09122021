import axios from 'axios'

export async function fetchData(id) {
    try {
        const response = await axios.get(`http://localhost:3000/user/${id}`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export async function fetchActivity(id){
    try {
        const response = await axios.get(`http://localhost:3000/user/${id}/activity`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export async function fetchSessions(id){
    try {
        const response = await axios.get(`http://localhost:3000/user/${id}/average-sessions`)
        return response.data 

    } catch (error) {
        console.log(error)
    }
}

export async function fetchPerformance(id){
    try {
        const response = await axios.get(`http://localhost:3000/user/${id}/performance`)
        return response.data 

    } catch (error) {
        console.log(error)
    }
}