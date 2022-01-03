import styled from 'styled-components'
import iconCal from '../../assets/icon-calories.svg'
import iconProt from '../../assets/icon-protein.svg'
import iconCarb from '../../assets/icon-carbo.svg'
import iconFat from '../../assets/icon-fat.svg'
import propTypes from 'prop-types'

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 260px;
    height: 110px;
    background: #fbfbfb;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
    border-radius: 5px;
    align-items: center;
    @media screen and (max-width: 1310px) {
        margin-bottom: 20px;
    }
`

const Icon = styled.img`
    justify-self: center;
`

const ValueText = styled.p`
    font-size: 20px;
    font-weight: bold;
`

const SubText = styled.p`
    color: #74798c;
    font-size: 14px;
`

/**
 * Create a card with key informations
 * @param {Object} param0
 * @param {String} param0.type
 * @param {Number} param0.value
 * @returns {JSX.Element}
 */

function Card({ type, value }) {
    const setIcon = {
        calorieCount: iconCal,
        proteinCount: iconProt,
        carbohydrateCount: iconCarb,
        lipidCount: iconFat,
    }
    const setName = {
        calorieCount: 'Calories',
        proteinCount: 'Protéines',
        carbohydrateCount: 'Glucides',
        lipidCount: 'Lipides',
    }

    return (
        <CardWrapper>
            <Icon src={setIcon[type]} alt="" />
            <div>
                <ValueText>
                    {value}
                    {type === 'calorieCount' ? 'kCal' : 'g'}
                </ValueText>
                <SubText>{setName[type]}</SubText>
            </div>
        </CardWrapper>
    )
}

export default Card

Card.propTypes = {
    type: propTypes.string.isRequired,
    value: propTypes.number.isRequired,
}
