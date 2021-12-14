import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import styled from 'styled-components'
import Hello from '../../components/Hello'
import Error from '../../components/Error'
import { fetchData } from '../../services'
import Card from '../../components/Card'

const UserContainer = styled.div`
    margin-left: 117px;
`

function UserProfile() {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true) 
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const request = await fetchData(id)
                console.log(request)
                setData(request.data)
            } catch (e) {
                console.log(e)
            }
        }
        getData()
        setLoading(false)
    }, [id])
    if (data.length === 0) return <Error />

    return (
        isLoading? "chargement" :
        <UserContainer>
            <Hello name={data.userInfos.firstName} />
            <div>
                <div></div>
                <div>{<Card keyData={data.keyData} />}</div>
            </div>
        </UserContainer>
    )
}

export default UserProfile
