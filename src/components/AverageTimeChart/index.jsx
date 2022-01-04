import { colors } from '../../utils/styles/colors'
import propTypes from 'prop-types'
import { Line, LineChart, Tooltip, XAxis } from 'recharts'

/**
 * Line chart component
 * @param {Object} props
 * @param {Array.<Number>} props.session
 * @returns {JSX.Element}
 */

function AverageTimeChart({ session }) {
    const data = []
    const week = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    session.forEach((value) => {
        data.push({ day: week[value.day-1], time: value.sessionLength })
    })
    return (
        <LineChart
            width={260}
            height={260}
            data={data}
        >
            <XAxis dataKey="day" />
            <Tooltip />

            <Line type="monotone" dataKey="time" stroke="#8884d8" dot={false} />
        </LineChart>
    )
}

export default AverageTimeChart

AverageTimeChart.propTypes = {
    session: propTypes.array.isRequired,
}
