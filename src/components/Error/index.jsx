import propTypes from 'prop-types'
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

/**
 * Error component returning by default 404
 * @param {Object} props 
 * @param {String} props.errorMsg
 * @returns {JSX.Element}
 */

function Error({ errorMsg }) {
    return <ErrorContainer>{errorMsg}</ErrorContainer>
}

export default Error

Error.propTypes = {
    errorMsg: propTypes.string,
}

Error.defaultProps = {
    errorMsg: '404',
}
