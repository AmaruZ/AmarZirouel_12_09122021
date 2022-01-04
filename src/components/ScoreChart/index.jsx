import { colors } from '../../utils/styles/colors'
import propTypes from 'prop-types'
import { RadialBar, RadialBarChart } from 'recharts'
import styled from 'styled-components'

const ScoreContainer = styled.div`
    position: relative;
`

const ScoreTitle = styled.span`
    position: absolute;
    z-index: 2;
    top: 15px;
    left: 30px;
`

const ScoreWrapper = styled.div`
    position: absolute;
    top: 37%;
    left: 40%;
    display: flex;
    flex-direction: column;
    align-items:center;
`
const ScorePercent = styled.span`
    font-size: 27px;
    font-weight: 700;
`

/**
 * Radial bar chart component
 * @param {Object} props
 * @param {Number} props.score
 * @returns {JSX.Element}
 */

function ScoreChart({ score }) {
    const data = [{score: 1, fill:"transparent" },{ score: score, fill: colors.red }]

    return (
        <ScoreContainer>
            <ScoreTitle>Score</ScoreTitle>
            <RadialBarChart
                width={260}
                height={260}
                innerRadius="10%"
                outerRadius="130%"
                data={data}
                startAngle={90}
                endAngle={450}
                style={{ background: '#FBFBFB', borderRadius: '5px' }}
                barCategoryGap="0%"
                barSize={10}
            >
                <RadialBar
                    minAngle={0}
                    clockWise={false}
                    dataKey="score"
                    cornerRadius="5"
                    style={{ background: 'white' }}
                />
            </RadialBarChart>
            <ScoreWrapper>
                <ScorePercent>{score*100}%</ScorePercent>
                <span>de votre</span>
                <span>objectif</span>
            </ScoreWrapper>
        </ScoreContainer>
    )
}

export default ScoreChart

ScoreChart.propTypes = {
    score: propTypes.number.isRequired,
}
