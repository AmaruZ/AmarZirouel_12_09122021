import { useEffect } from 'react/cjs/react.development'
import * as d3 from 'd3'
import { useRef } from 'react'
import styled from 'styled-components'

const RadialBarContainer = styled.div`
    background: #fbfbfb;
    border-radius: 5px;
`

function RadialBarChart({ score }) {
    const chartRef = useRef()

    useEffect(() => {
        const width = 258
        const height = 258
        const outerRadius = width * 0.35
        const thickness = 10

        const svg = d3
            .select(chartRef.current)
            .attr('width', width)
            .attr('height', height)

        svg.append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', width * 0.35 - thickness)
            .attr('fill', 'white')

        svg.append('text')
            .attr('x', 35)
            .attr('y', 35)
            .text(`Score`)
            .style('font-weight', '500')
            .style('font-size', 15)
            .style('color', '#20253A')

        // Draw our arc
        svg.append('path')
            .attr('transform', `translate(${width / 2}, ${height / 2})`)
            .attr(
                'd',
                d3
                    .arc()
                    .innerRadius(outerRadius - thickness)
                    .outerRadius(outerRadius)
                    .startAngle(0)
                    .endAngle(-(score * 2 * Math.PI))
                    .cornerRadius(10)
            )
            .attr('fill', 'red')

        //Create the text in center of our chart
        const text = svg
            .append('text')
            .attr('x', width / 2 - 20)
            .attr('y', height / 2 - 10)
            .text(`${score * 100}%`)
            .style('font-weight', '700')
            .style('font-size', '26px')

        text.append('tspan')
            .text('de votre')
            .attr('x', width / 2 - 25)
            .attr('y', height / 2 + 12)
            .style('font-weight', '500')
            .style('font-size', '16px')
        text.append('tspan')
            .text('objectif')
            .attr('x', width / 2 - 20)
            .attr('y', height / 2 + 32)
            .style('font-weight', '500')
            .style('font-size', '16px')
    })

    return (
        <RadialBarContainer>
            <svg ref={chartRef}></svg>
        </RadialBarContainer>
    )
}

export default RadialBarChart
