import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { axisBottom } from 'd3'

const LineChartContainer = styled.div`
    background: red;
    border-radius: 5px;
`

function LineChart({ session }) {
    const chartRef = useRef()
    useEffect(() => {
        if (session) {
            const height = 263
            const width = "20vw"

            const svg = d3
                .select(chartRef.current)
                .attr('width', width)
                .attr('height', height)

            const xScale = d3
                .scaleBand()
                .range([0, chartRef.current.clientWidth])
                .domain(session.map((d) => d.day))

            const yScale = d3
                .scaleLinear()
                .range([height - 50, 0])
                .domain([0, d3.max(session, (d) => d.sessionLength) + 30])

            const xAxis = axisBottom(xScale).tickSize(0)
            svg.select('.x-axis')
                .attr('transform', `translate(0, ${height - 50})`)
                .call(xAxis)
                .attr('stroke-width', 0)
                .selectAll('text')
                .attr('transform', 'translate(0, 10)')
                .attr('fill', 'white')

            // This allows to find the closest X index of the mouse:
            const bisect = d3.bisector((d) => d.day).left

            // Create the circle that travels along the curve of chart
            const focusPoint = svg
                .append('g')
                .append('circle')
                .style('fill', 'white')
                .attr('stroke', 'white')
                .attr('r', 4)
                .style('opacity', 0)
            // Create the text that travels along the curve of chart

            const focusRect = svg
                .append('g')
                .append('rect')
                .attr('height', height)
                .style('opacity', 0)
            const focusTextBg = svg
                .append('g')
                .append('rect')
                .style('opacity', 0)
                .attr('width', 50)
                .attr('height', 30)
                .attr('fill', 'white')
            const focusText = svg
                .append('g')
                .append('text')
                .style('opacity', 0)
                .attr('fill', 'black')
                .attr('text-anchor', 'left')
                .attr('alignment-baseline', 'middle')

            // Add the line
            svg.append('path')
                .datum(session)
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-width', 1.5)
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
            // Create a rect on top of the svg area: this rectangle recovers mouse position
            svg.append('rect')
                .style('fill', 'none')
                .style('pointer-events', 'all')
                .attr('width', chartRef.current.clientWidth)
                .attr('height', height)
                .on('mouseover', mouseover)
                .on('mousemove', mousemove)
                .on('mouseout', mouseout)
            // What happens when the mouse move -> show the annotations at the right positions.
            function mouseover(e) {
                focusPoint.style('opacity', 1)
                focusTextBg.style('opacity', 1)
                focusRect.style('opacity', 0.2)
                focusText.style('opacity', 1)
            }

            function mousemove(e) {
                const x0 = (e.offsetX + (chartRef.current.clientWidth/7)) / (chartRef.current.clientWidth/7)
                const i = bisect(session, x0, 1)
                const selectedData = session[i - 1]
                console.log(x0)
                focusPoint
                    .attr('cx', xScale(i) + 20)
                    .attr('cy', yScale(selectedData.sessionLength))

                focusText
                    .text(`${selectedData.sessionLength} min`)
                    .attr('x', xScale(i) + 30)
                    .attr('y', yScale(selectedData.sessionLength) - 20)
                focusTextBg
                    .attr('x', xScale(i) + 30)
                    .attr('y', yScale(selectedData.sessionLength) - 40)
                focusRect
                    .attr('x', xScale(i) + 20)
                    .attr('width', chartRef.current.clientWidth - xScale(i))
            }

            function mouseout() {
                focusPoint.style('opacity', 0)
                focusText.style('opacity', 0)
                focusRect.style('opacity', 0)
                focusTextBg.style('opacity', 0)
            }
        }
    }, [session])

    return (
        <LineChartContainer id="linechart">
            <svg ref={chartRef}>
                <g className="x-axis" />
            </svg>
        </LineChartContainer>
    )
}

export default LineChart
