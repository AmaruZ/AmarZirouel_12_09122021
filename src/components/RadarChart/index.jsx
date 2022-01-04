import { useEffect } from 'react/cjs/react.development'
import * as d3 from 'd3'
import { useRef } from 'react'
import { colors } from '../../utils/styles/colors'
import propTypes from 'prop-types'

/**
 * Radar chart component
 * @param {Object} param0 
 * @returns {JSX.Element}
 */

function RadarChart({ cardio, energy, endurance, strength, speed, intensity }) {
    const chartRef = useRef()

    useEffect(() => {
        const sides = 6,
            level = 5,
            size = Math.min(window.innerWidth, window.innerHeight, 260),
            offset = Math.PI,
            polyangle = (Math.PI * 2) / sides,
            r = 0.75 * size,
            r_0 = r / 2,
            center = {
                x: size / 2,
                y: size / 2,
            }

        const svg = d3
            .select(chartRef.current)
            .attr('width', size)
            .attr('height', size)
            .style('background', colors.black)
            .style('border-radius', '5px')

        const g = svg.append('g')

        /**
         * Help us to generate a point in our radar
         * @param {Object} param0
         * @param {Number} param0.length
         * @param {Number} param0.angle
         * @returns
         */

        const generatePoint = ({ length, angle }) => {
            const point = {
                x: center.x + length * Math.sin(offset - angle),
                y: center.x + length * Math.cos(offset - angle),
            }
            return point
        }

        /**
         * Draw a path
         * @param {Array.<Object>} points
         * @param {Number} points[].x
         * @param {Number} points[].y
         * @param {SVGElement} parent
         */

        const drawPath = (points, parent) => {
            const lineGenerator = d3
                .line()
                .x((d) => d.x)
                .y((d) => d.y)

            parent.append('path').attr('d', lineGenerator(points))
        }

        const scale = d3.scaleLinear().domain([0, 255]).range([0, r_0])

        /**
         * Draw the level lines
         * @param {Number} levelsCount
         * @param {Number} sideCount
         */

        const generateAndDrawLevels = (levelsCount, sideCount) => {
            for (let level = 1; level <= levelsCount; level++) {
                const hyp = (level / levelsCount) * r_0

                const points = []
                for (let vertex = 0; vertex < sideCount; vertex++) {
                    const theta = vertex * polyangle

                    points.push(generatePoint({ length: hyp, angle: theta }))
                }
                const group = g
                    .append('g')
                    .attr('class', 'levels')
                    .attr('stroke-width', 1)
                    .attr('fill', 'none')
                    .attr('stroke', 'white')
                drawPath([...points, points[0]], group)
            }
        }

        /**
         * Draw the data's area
         * @param {Array.<Number>} dataset
         * @param {Number} n
         */

        const drawData = (dataset, n) => {
            const points = []
            dataset.forEach((d, i) => {
                const len = scale(d)
                const theta = i * ((2 * Math.PI) / n)
                points.push({
                    ...generatePoint({ length: len, angle: theta }),
                    value: d.value,
                })
            })

            const group = g
                .append('g')
                .attr('class', 'shape')
                .attr('fill', '#FF0101')
                .style('opacity', 0.7)

            drawPath([...points, points[0]], group)
        }

        /**
         * Add a text
         * @param {String} text
         * @param {Object} point
         * @param {Number} point.x
         * @param {Number} point.y
         * @param {SVGElement} parent
         */

        const drawText = (text, point, parent) => {
            parent
                .append('text')
                .attr('x', point.x)
                .attr('y', point.y + 5)
                .html(text)
                .style('text-anchor', 'middle')
                .attr('fill', 'white')
                .style('font-size', '12px')
        }

        /**
         * Add the labels in our chart
         * @param {Array.<Number>} dataset
         * @param {Number} sideCount
         */

        const drawLabels = (dataset, sideCount) => {
            const groupL = g.append('g').attr('class', 'labels')
            for (let vertex = 0; vertex < sideCount; vertex++) {
                const angle = vertex * polyangle
                const label = dataset[vertex]
                const point = generatePoint({ length: 0.9 * (size / 2), angle })
                drawText(label, point, groupL)
            }
        }

        generateAndDrawLevels(level, sides)

        drawData([intensity, speed, strength, endurance, energy, cardio], sides)
        drawLabels(
            ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Energie', 'Cardio'],
            sides
        )
    })
    return <svg ref={chartRef}></svg>
}

export default RadarChart

RadarChart.propTypes = {
    cardio: propTypes.number.isRequired,
    energy: propTypes.number.isRequired,
    endurance: propTypes.number.isRequired,
    strength: propTypes.number.isRequired,
    speed: propTypes.number.isRequired,
    intensity: propTypes.number.isRequired,
}
