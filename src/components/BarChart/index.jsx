import * as d3 from 'd3'
import { axisBottom, axisRight } from 'd3'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { colors } from '../../utils/styles/colors'

const BarChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${colors.lightgrey};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
    border-radius: 5px;
`

const XAxis = styled.g`
    color: #9b9eac;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
`

const YAxis = styled.g`
    color: #9b9eac;
    font-size: 14px;
`

function BarChart({ activity }) {
    const titleRef = useRef()
    const chartRef = useRef()

    useEffect(() => {
        if (activity) {
            const height = 300
            const width = 700
            const margin = { top: 15, right: 30, bottom: 40, left: 0 }
            const barWidth = 7
            const weigthBarOffset = 60

            const legends = d3
                .select(titleRef.current)
                .attr('width', width)
                .attr('height', 40)

            const addText = (text, position, parent) => {
                parent
                    .append('text')
                    .text(text)
                    .attr('x', position.x)
                    .attr('y', position.y)
                    .style('font-size', 15)
                    .style('font-weight', 500)
                    .style('alignment-baseline', 'middle')
            }

            addText('Activité quotidienne', { x: 0, y: 20 }, legends)
            addText('Poids (kg)', { x: width - 230, y: 20 }, legends)
            addText('Calories (kCal)', { x: width - 120, y: 20 }, legends)

            const addLegendCircle = (position, color) => {
                legends
                    .append('circle')
                    .attr('cx', position.x)
                    .attr('cy', position.y)
                    .attr('r', 8)
                    .style('fill', color)
            }
            addLegendCircle({x: width - 245, y: 19}, colors.black)
            addLegendCircle({x: width - 135, y: 19}, colors.red)

            const svg = d3
                .select(chartRef.current)
                .attr('width', width)
                .attr('height', height)
                .attr('transform', `translate( ${margin.left} , 0)`)

            const xScale = d3
                .scaleBand()
                .range([0, width - 100])
                .domain(activity.map((d, i) => i))

            const weightScale = d3
                .scaleLinear()
                .range([height - margin.top, 0])
                .domain([
                    d3.min(activity, (d) => d.kilogram) - 2,
                    d3.max(activity, (d) => d.kilogram) + 2,
                ])

            const calScale = d3
                .scaleLinear()
                .range([height - margin.top, 0])
                .domain([
                    d3.min(activity, (d) => d.calories - 100),
                    d3.max(activity, (d) => d.calories + 100),
                ])

            const xAxis = axisBottom(xScale).tickSize(0)

            svg.select('.x-axis')
                .attr(
                    'transform',
                    `translate(${margin.right}, ${height - margin.bottom})`
                )
                .call(xAxis)
                .selectAll('text')
                .attr('transform', 'translate(0, 10)')

            const yAxis = axisRight(weightScale)
                .ticks(2)
                .tickSize(0)
                .tickValues([
                    d3.min(activity, (d) => d.kilogram),
                    d3.max(activity, (d) => d.kilogram) + 1,
                ])

            svg.select('.y-axis')
                .attr(
                    'transform',
                    `translate(${width - margin.right}, ${-margin.top})`
                )
                .attr('stroke-width', 0)
                .call(yAxis)

            const createDataBars = (className, x, y, color) =>{
                svg.append('g').selectAll(className)
                .data(activity)
                .join('line')
                .attr('class', className)
                .attr('x1', x)
                .attr('x2', x)
                .attr('y1', height - margin.bottom)
                .attr('y2', y)
                .attr('stroke-width', barWidth)
                .attr('stroke', color)

                svg.append('g').selectAll(`.${className}-circle`)
                .data(activity)
                .join('circle')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', (barWidth -1)/2)
                .attr('fill', color)

            }

            createDataBars('weight-bar', (data, index) => xScale(index) + weigthBarOffset, (data) => weightScale(data.kilogram) - 10, colors.black)
            createDataBars('calories-bar', (data, index) => xScale(index) + weigthBarOffset + 20, (data) => calScale(data.calories), colors.red)

            const tooltip = svg
                .selectAll('.tooltip')
                .data(activity)
                .join('g')
                .style('opacity', 0)
            tooltip
                .append('rect')
                .attr('class', 'tooltip')
                .attr('transform', 'scale(1, -1)')
                .attr('x', (value, index) => xScale(index) + 42)
                .attr('y', -height + margin.bottom)
                .attr('width', 60)
                .attr('height', height - margin.top - margin.bottom)
                .attr('fill', '#c4c4c4')
                .style('opacity', 0.2)

                .on('mouseover', (d) =>
                    d3.select(d.target.parentNode).style('opacity', 1)
                )
                .on('mouseleave', (d) =>
                    d3.select(d.target.parentNode).style('opacity', 0)
                )
            tooltip
                .append('rect')
                .attr('x', (value, index) => xScale(index) + 102)
                .attr('y', 0)
                .attr('width', 39)
                .attr('height', 63)
                .attr('fill', '#E60000')

            tooltip
                .append('text')
                .attr('x', (value, index) => xScale(index) + 105)
                .attr('y', 25)
                .text((d) => d.kilogram)
                .attr('fill', 'white')
                .style('font-size', '10px')
            tooltip
                .append('text')
                .attr('x', (value, index) => xScale(index) + 105)
                .attr('y', 40)
                .text((d) => d.calories)
                .attr('fill', 'white')
                .style('font-size', '10px')
        }
    }, [activity])

    return (
        <BarChartContainer id="barchart">
            <svg ref={titleRef}></svg>

            <svg ref={chartRef}>
                <XAxis className="x-axis" />
                <YAxis className="y-axis" />
            </svg>
        </BarChartContainer>
    )
}

export default BarChart
