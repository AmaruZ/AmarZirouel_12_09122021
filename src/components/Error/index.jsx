import styled from 'styled-components'

const ErrorContainer = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 117px;
    width: 80vw;
    height: 85vh;
    font-size: 100px;
`

function Error() {
    return <ErrorContainer>404</ErrorContainer>
}

export default Error
