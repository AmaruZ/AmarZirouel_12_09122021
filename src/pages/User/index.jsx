import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import styled from 'styled-components'
import Hello from '../../components/Hello'
import Error from '../../components/Error'
import {
    fetchActivity,
    fetchData,
    fetchPerformance,
    fetchSessions,
} from '../../services'
import Card from '../../components/Card'
import Graph from '../../components/Graph'
import BarChart from '../../components/BarChart'
import LineChart from '../../components/LineChart'
import SpiderChart from '../../components/SpiderChart'

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
    margin-top: 20px;
`

function UserProfile() {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [activity, setActivity] = useState()
    const [session, setSession] = useState()
    const [performance, setPerformance] = useState()
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            try {
                const datas = await fetchData(id)
                const activities = await fetchActivity(id)
                const sessions = await fetchSessions(id)
                const performances = await fetchPerformance(id)
                setData(datas.data)
                setActivity(activities.data.sessions)
                setSession(sessions.data.sessions)
                setPerformance(performances.data)
            } catch (e) {
                console.log(e)
            }
        }
        getData()
    }, [id])

    useEffect(()=>{
        if (performance) setLoading(false)
    }, [performance])

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
                        <LineChart session={session} />
                        <SpiderChart
                            cardio={performance.data[0].value}
                            energy={performance.data[1].value}
                            endurance={performance.data[2].value}
                            strength={performance.data[3].value}
                            speed={performance.data[4].value}
                            intensity={performance.data[5].value}
                        />
                        <Graph type="medium" />
                    </MediumGraphsContainer>
                </GraphsContainer>
                {<Card keyData={data.keyData} />}
            </DatasContainer>
        </UserContainer>
    )
}

export default UserProfile
