import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import styled from 'styled-components'
import Hello from '../../components/Hello'
import Error from '../../components/Error'
import { fetchActivity, fetchData } from '../../services'
import Card from '../../components/Card'
import Graph from '../../components/Graph'
import BarChart from '../../components/BarChart'

const UserContainer = styled.div`
    margin-left: 117px;
    padding-left: 5%;
    padding-top: 3%;
`

const DatasContainer = styled.div`
    display: flex;
    width: 85vw;
    height: 65vh;
    margin-top: 3%;
    justify-content: space-between;
`

const GraphsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 76%;
`

const MediumGraphsContainer = styled.div`
    display: flex;
    height: 49%;
    justify-content: space-between;
`

function UserProfile() {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [activity, setActivity] = useState()
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const request = await fetchData(id)
                setData(request.data)
            } catch (e) {
                console.log(e)
            }
        }
        const getActivity = async () => {
            try {
                const request = await fetchActivity(id)
                setActivity(request.data.sessions)
            } catch (e) {
                console.log(e)
            }
        }
            getData()
            getActivity()
            setLoading(false)

    }, [id])

    if (data.length === 0) return <Error />

    return isLoading ? (
        'chargement'
    ) : (
        <UserContainer>
            <Hello name={data.userInfos.firstName} />
            <DatasContainer>
                <GraphsContainer>
                    <BarChart activity={activity} />

                    <MediumGraphsContainer>
                        <Graph type="medium" />
                        <Graph type="medium" />
                        <Graph type="medium" />
                    </MediumGraphsContainer>
                </GraphsContainer>
                {<Card keyData={data.keyData} />}
            </DatasContainer>
        </UserContainer>
    )
}

export default UserProfile
