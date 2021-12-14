import axios from 'axios'

export async function fetchData(id) {
    try {
        const response = await axios.get(`http://localhost:3000/user/${id}`)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

