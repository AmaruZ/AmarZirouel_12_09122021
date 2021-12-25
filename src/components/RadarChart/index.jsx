import { useEffect } from 'react/cjs/react.development'
import * as d3 from 'd3'
import { useRef } from 'react'
import styled from 'styled-components'
import { colors } from '../../utils/styles/colors'

const RadarChartContainer = styled.div`
    background: ${colors.black};
    border-radius: 5px;
`

function RadarChart({
    cardio,
    energy,
    endurance,
    strength,
    speed,
    intensity,
}) {
    const chartRef = useRef()

    useEffect(() => {
        const sides = 6,
            level = 5,
            size = Math.min(window.innerWidth, window.innerHeight, 258),
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
        const g = svg.append('g')

        const generatePoint = ({ length, angle }) => {
            const point = {
                x: center.x + length * Math.sin(offset - angle),
                y: center.x + length * Math.cos(offset - angle),
            }
            return point
        }

        const drawPath = (points, parent) => {
            const lineGenerator = d3
                .line()
                .x((d) => d.x)
                .y((d) => d.y)

            parent.append('path').attr('d', lineGenerator(points))
        }

        const scale = d3.scaleLinear().domain([0, 255]).range([0, r_0])

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
        const drawText = (text, point, isAxis, group) => {
            if (isAxis) {
                const xSpacing = text.toString().includes('.') ? 30 : 22
                group
                    .append('text')
                    .attr('x', point.x - xSpacing)
                    .attr('y', point.y + 5)
                    .html(text)
                    .style('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .style('font-size', '12px')
            } else {
                group
                    .append('text')
                    .attr('x', point.x)
                    .attr('y', point.y)
                    .html(text)
                    .style('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .style('font-size', '12px')
            }
        }

        const drawLabels = (dataset, sideCount) => {
            const groupL = g.append('g').attr('class', 'labels')
            for (let vertex = 0; vertex < sideCount; vertex++) {
                const angle = vertex * polyangle
                const label = dataset[vertex]
                const point = generatePoint({ length: 0.9 * (size / 2), angle })
                drawText(label, point, false, groupL)
            }
        }

        generateAndDrawLevels(level, sides)

        drawData([intensity, speed, strength, endurance, energy, cardio], sides)
        drawLabels(
            ['Intensité', 'Vitesse', 'Force', 'Endurance', 'Energie', 'Cardio'],
            sides
        )
    })
    return (
        <RadarChartContainer>
            <svg ref={chartRef}></svg>
        </RadarChartContainer>
    )
}

export default RadarChart
