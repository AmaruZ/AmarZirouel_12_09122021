import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HomeContainer = styled.div`
    margin-left: 117px;
    padding-top: 2%;
    padding-left: 3%;
    display: flex;
    flex-direction: column;
`

const StyledLink = styled(Link)`
    color: black;
    margin-top: 20px;
`

function Home() {
    return (
        <HomeContainer>
            <h1>Page d'accueil</h1>
            <StyledLink to={"/user/12"}>User 12</StyledLink>
            <StyledLink to={"/user/18"}>User 18</StyledLink>
        </HomeContainer>
    )
}

export default Home
