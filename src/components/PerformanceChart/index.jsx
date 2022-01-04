import { colors } from '../../utils/styles/colors'
import propTypes from 'prop-types'
import {
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
} from 'recharts'

/**
 * Radar chart component
 * @param {Object} props
 * @returns {JSX.Element}
 */

function PerformanceChart({
    cardio,
    energy,
    endurance,
    strength,
    speed,
    intensity,
}) {
    const data = [
        { kind: 'Intensité', value: intensity },
        { kind: 'Vitesse', value: speed },
        { kind: 'Force', value: strength },
        { kind: 'Endurance', value: endurance },
        { kind: 'Energie', value: energy },
        { kind: 'Cardio', value: cardio },
    ]

    return (
        <RadarChart
            outerRadius={90}
            width={260}
            height={260}
            data={data}
            style={{
                background: colors.black,
                borderRadius: '5px',
                fill: '#FFF',
            }}
        >
            <PolarGrid radialLines={false} />
            <PolarAngleAxis
                dataKey="kind"
                style={{ fontSize: '12px', margin: '3px' }}
            />
            <PolarRadiusAxis
                domain={[0, 255]}
                tick={false}
                ticks={[25, 75, 130, 200, 255]}
                axisLine={false}
            />
            <Radar
                dataKey="value"
                stroke={colors.red}
                fill={colors.red}
                fillOpacity={0.7}
            />
        </RadarChart>
    )
}

export default PerformanceChart

PerformanceChart.propTypes = {
    cardio: propTypes.number.isRequired,
    energy: propTypes.number.isRequired,
    endurance: propTypes.number.isRequired,
    strength: propTypes.number.isRequired,
    speed: propTypes.number.isRequired,
    intensity: propTypes.number.isRequired,
}
