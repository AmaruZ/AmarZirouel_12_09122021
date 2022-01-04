import propTypes from 'prop-types'
import styled from 'styled-components'

const HelloContainer = styled.div`
    display: flex;
    height: 10vh;
    flex-direction: column;
    justify-content: space-between;
`

const Title = styled.h1`
    font-size: 48px;
`

const NameSpan = styled.span`
    color: red;
`

/**
 * Hello component
 * @param {Object} props
 * @param {String} props.name
 * @returns {JSX.Element}
 */

function Hello({ name }) {
    return (
        <HelloContainer>
            <Title>
                Bonjour <NameSpan>{name}</NameSpan>
            </Title>
            <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
        </HelloContainer>
    )
}

export default Hello

Hello.propTypes = {
    name: propTypes.string,
}
