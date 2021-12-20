import styled from 'styled-components'

const GraphWrapper = styled.div`
    ${(props) =>
        props.$type === 'medium'
            ? `width: 30%;
            height: 100%;`
            : props.$type === 'big' &&
              `width: 100%;
              height: 49%;
      `}
    background: grey;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
    border-radius: 5px;
`

function Graph({ type }) {
    return <GraphWrapper $type={type}></GraphWrapper>
}

export default Graph
