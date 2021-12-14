import styled from "styled-components"

const Title = styled.h1`
    font-size: 48px;
`

const NameSpan = styled.span`
    color: red;
`

function Hello({name}){
    return (<div>
        <Title>Bonjour <NameSpan>{name}</NameSpan></Title>
        <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </div>)
}

export default Hello