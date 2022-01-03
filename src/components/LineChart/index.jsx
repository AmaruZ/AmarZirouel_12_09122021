import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { axisBottom } from 'd3'
import { colors } from '../../utils/styles/colors'
import propTypes from 'prop-types'

/**
 * Line chart component
 * @param {Object} param0 
 * @param {Array} session
 * @returns {JSX.Element}
 */

function LineChart({ session }) {
    const chartRef = useRef()
    useEffect(() => {
        if (session) {
            const height = 260
            const width = 260
            const week = {
                1: 'L',
                2: 'M',
                3: 'M',
                4: 'J',
                5: 'V',
                6: 'S',
                7: 'D',
            }

            const svg = d3
                .select(chartRef.current)
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', `0 0 260 260`)
                .attr('preserveAspectRatio', 'xMidYMid meet')
                .style('background', colors.red)
                .style('border-radius', '5px')

            const xScale = d3
                .scaleBand()
                .range([0, width])
                .domain(session.map((d) => d.day))

            const yScale = d3
                .scaleLinear()
                .range([height - 50, 0])
                .domain([0, d3.max(session, (d) => d.sessionLength) + 30])

            const xAxis = axisBottom(xScale)
                .tickSize(0)
                .tickFormat((d) => week[d])

            svg.select('.x-axis')
                .attr('transform', `translate(0, ${height - 50})`)
                .call(xAxis)
                .attr('stroke-width', 0)
                .selectAll('text')
                .attr('transform', 'translate(0, 10)')
                .attr('fill', 'white')

            const title = svg
                .append('g')
                .append('text')
                .text('Durée moyenne des')
                .attr('x', 30)
                .attr('y', 40)
                .style('font-size', 15)
                .attr('fill', '#FFFFFF')
                .attr('opacity', 0.5)

            title.append('tspan').text('sessions').attr('x', 30).attr('y', 55)

            // Add the line
            svg.append('path')
                .datum(session)
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-width', 1.6)
                .attr(
                    'd',
                    d3
                        .line()
                        .curve(d3.curveMonotoneX)
                        .x(function (d) {
                            return xScale(d.day) + 20
                        })
                        .y(function (d) {
                            return yScale(d.sessionLength)
                        })
                )

            // This allows to find the closest X index of the mouse:
            const bisect = d3.bisector((d) => d.day).left

            // Create the circle and the text that travel along the curve of chart

            const focus = svg.append('g').attr('opacity', 0)
            const focusRect = focus
            .append('g')
            .append('rect')
            .attr('height', height)

            const focusPoint = focus
                .append('g')
                .append('circle')
                .attr('fill', '#FFFFFF')
                .attr('stroke', '#FFFFFF')
                .attr('r', 4)

            const focusTextBg = focus
                .append('g')
                .append('rect')
                .attr('width', 50)
                .attr('height', 30)
                .attr('fill', '#FFFFFF')

            const focusText = focus
                .append('g')
                .append('text')
                .style('color', 'black')
                .attr('text-anchor', 'left')
                .attr('alignment-baseline', 'middle')
                .style('font-size', "12px")

            svg.append('rect')
                .attr('fill', 'none')
                .style('pointer-events', 'all')
                .attr('width', width)
                .attr('height', height)
                .on('mouseover', mouseover)
                .on('mousemove', mousemove)
                .on('mouseout', mouseout)

            function mouseover(e) {
                focusRect.attr('opacity', 0.2)
                focus.attr('opacity', 1)
            }

            function mousemove(e) {
                const x0 = (e.offsetX + width / 7) / (width / 7)
                const i = bisect(session, x0, 1)
                const selectedData = session[i - 1]
                focusRect
                    .attr('x', xScale(i) + 20)
                    .attr('width', width - xScale(i))
                focusPoint
                    .attr('cx', xScale(i) + 20)
                    .attr('cy', yScale(selectedData.sessionLength))
                focusText
                    .text(`${selectedData.sessionLength} min`)
                    .attr(
                        'x',
                        xScale(i) + 40 + 60 >= width
                            ? xScale(i) - 10
                            : xScale(i) + 40
                    )
                    .attr('y', yScale(selectedData.sessionLength) - 23)
                focusTextBg
                    .attr(
                        'x',
                        xScale(i) + 30 + 60 >= width
                            ? xScale(i) - 20
                            : xScale(i) + 30
                    )
                    .attr('y', yScale(selectedData.sessionLength) - 40)
            }

            function mouseout() {
                focusRect.attr('opacity', 0)
                focus.attr('opacity', 0)
            }
        }
    }, [session])

    return (
        <svg ref={chartRef}>
            <g className="x-axis" />
        </svg>
    )
}

export default LineChart

LineChart.propTypes = {
    session: propTypes.array.isRequired,
}
