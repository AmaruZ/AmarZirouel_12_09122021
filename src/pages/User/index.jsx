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
import BarChart from '../../components/BarChart'
import AverageTimeChart from '../../components/AverageTimeChart'
import PerformanceChart from '../../components/PerformanceChart'
import ScoreChart from '../../components/ScoreChart'

const UserContainer = styled.div`
    margin-top: 75px;
    margin-left: 117px;
    padding-left: 5%;
    padding-top: 3%;
`

const DatasContainer = styled.div`
    display: flex;
    width: 80vw;
    height: 68vh;
    margin-top: 3%;
    justify-content: space-between;
    @media screen and (max-width: 1310px) {
        flex-direction: column;
    }
`

const GraphsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 75%;
    @media screen and (max-width: 1310px) {
        width: 100%;
    }
`

const MediumGraphsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 1310px) {
        margin-top: 20px;
        flex-direction: row;
        flex-wrap: wrap;
    }
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

    useEffect(() => {
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
                        <AverageTimeChart session={session} />
                        <PerformanceChart
                            cardio={performance.data[0].value}
                            energy={performance.data[1].value}
                            endurance={performance.data[2].value}
                            strength={performance.data[3].value}
                            speed={performance.data[4].value}
                            intensity={performance.data[5].value}
                        />
                        <ScoreChart
                            score={
                                data.todayScore ? data.todayScore : data.score
                            }
                        />
                    </MediumGraphsContainer>
                </GraphsContainer>
                <CardsContainer>
                    {Object.entries(data.keyData).map(([key, value]) => {
                        return <Card type={key} value={value} key={key} />
                    })}
                </CardsContainer>
            </DatasContainer>
        </UserContainer>
    )
}

export default UserProfile
