import * as d3 from 'd3'
import { axisBottom, axisRight } from 'd3'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const BarChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #fbfbfb;
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
            const height = 250
            const width = 700
            const margin = { top: 50, right: 30, bottom: 50, left: 0 }
            const barWidth = 7
            const weigthBarOffset = 60

            const legends = d3
                .select(titleRef.current)
                .attr('width', width)
                .attr('height', 50)

            legends
                .append('text')
                .attr('x', 0)
                .attr('y', 25)
                .text('Activité quotidienne')
                .style('font-size', '15px')
                .style('font-weight', '500')
                .attr('alignment-baseline', 'middle')

            legends
                .append('circle')
                .attr('cx', width - 250)
                .attr('cy', 25)
                .attr('r', 8)
                .style('fill', '#282D30')

            legends
                .append('text')
                .attr('x', width - 230)
                .attr('y', 25)
                .text('Poids (kg)')
                .style('font-size', '15px')
                .style('font-weight', '500')
                .attr('alignment-baseline', 'middle')
            legends
                .append('circle')
                .attr('cx', width - 140)
                .attr('cy', 25)
                .attr('r', 8)
                .style('fill', '#E60000')
            legends
                .append('text')
                .attr('x', width - 120)
                .attr('y', 25)
                .text('Calories (kCal)')
                .style('font-size', '15px')
                .style('font-weight', '500')
                .attr('alignment-baseline', 'middle')

            const svg = d3
                .select(chartRef.current)
                .attr('width', width)
                .attr('height', height)
                .attr('transform', `translate( ${margin.left} , ${margin.top})`)

            const xScale = d3
                .scaleBand()
                .range([0, width - 100])
                .domain(activity.map((d, i) => i))

            const yScale = d3
                .scaleLinear()
                .range([height - margin.top, 0])
                .domain([
                    d3.min(activity, (d) => d.kilogram) - 2,
                    d3.max(activity, (d) => d.kilogram) + 2,
                ])
            const weightScale = d3
                .scaleLinear()
                .range([0, height - margin.top])
                .domain([
                    d3.min(activity, (d) => d.kilogram) - 2,
                    d3.max(activity, (d) => d.kilogram) + 2,
                ])

            const calScale = d3
                .scaleLinear()
                .range([0, height - margin.top])
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

            const yAxis = axisRight(yScale).ticks(2).tickSize(0).tickValues([d3.min(activity, (d) => d.kilogram), d3.max(activity, (d) => d.kilogram) +1] )

            svg.select('.y-axis')
                .attr('transform', `translate(${width - margin.right}, 5)`)
                .attr('stroke-width', 0)
                .call(yAxis)

            svg.selectAll('.weight-bar')
                .data(activity)
                .join('rect')
                .attr('class', 'weight-bar')
                .attr('transform', 'scale(1, -1)')
                .attr('x', (value, index) => xScale(index) + weigthBarOffset)
                .attr('y', -height + margin.top)
                .attr('width', barWidth)
                .attr('height', (value) => weightScale(value.kilogram) - 10)
                .attr('rx', 5)
                .attr('fill', '#282D30')

            svg.selectAll('.calories-bar')
                .data(activity)
                .join('rect')
                .attr('class', 'calories-bar')
                .attr('transform', 'scale(1, -1)')
                .attr(
                    'x',
                    (value, index) => xScale(index) + weigthBarOffset + 20
                )
                .attr('y', -height + margin.top)
                .attr('width', barWidth)
                .attr('height', (value) => calScale(value.calories))
                .attr('fill', '#E60000')
                .attr('rx', 5)

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
                .attr('y', -height + margin.top)
                .attr('width', 60)
                .attr('height', height - margin.top)
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
