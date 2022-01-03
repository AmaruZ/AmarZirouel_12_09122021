import { useEffect } from 'react/cjs/react.development'
import * as d3 from 'd3'
import { useRef } from 'react'
import { colors } from '../../utils/styles/colors'
import propTypes from 'prop-types'

/**
 * Radar chart component
 * @param {Object} param0
 * @param {Number} param0.score 
 * @returns {JSX.Element}
 */

function RadialBarChart({ score }) {
    const chartRef = useRef()

    useEffect(() => {
        const width = 260
        const height = 260
        const outerRadius = width * 0.35
        const thickness = 10

        const svg = d3
            .select(chartRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', colors.lightgrey)
            .style('border-radius', '5px')

        svg.append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', width * 0.35 - thickness)
            .attr('fill', 'white')

        /**
         * Add a text in our chart
         * @param {SVGElement} parent
         * @param {String} type - text or tspan
         * @param {String} text
         * @param {Number} x
         * @param {Number} y
         * @param {String} fontWeight
         * @param {String} fontSize
         * @param {String} color
         * @returns {SVGElement}
         */

        const addText = (
            parent,
            type,
            text,
            x,
            y,
            fontWeight,
            fontSize,
            color = 'black'
        ) => {
            return parent
                .append(type)
                .text(text)
                .attr('x', x)
                .attr('y', y)
                .style('font-weight', fontWeight)
                .style('font-size', fontSize)
                .style('color', color)
        }

        addText(svg, 'text', 'Score', 35, 35, 500, 15, '#20253A')

        const text = addText(
            svg,
            'text',
            `${score * 100}%`,
            width / 2 - 20,
            height / 2 - 10,
            700,
            '26px'
        )
        addText(
            text,
            'tspan',
            'de votre',
            width / 2 - 25,
            height / 2 + 12,
            500,
            '16px'
        )
        addText(
            text,
            'tspan',
            'objectif',
            width / 2 - 22,
            height / 2 + 32,
            500,
            '16px'
        )

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
    })

    return <svg ref={chartRef}></svg>
}

export default RadialBarChart

RadialBarChart.propTypes = {
    score: propTypes.number.isRequired,
}
