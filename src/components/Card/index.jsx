import styled from 'styled-components'
import iconCal from '../../assets/icon-calories.svg'
import iconProt from '../../assets/icon-protein.svg'
import iconCarb from '../../assets/icon-carbo.svg'
import iconFat from '../../assets/icon-fat.svg'

const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 17vw;
    height: 13vh;
    background: #fbfbfb;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
    border-radius: 5px;
    align-items: center;
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

function Card({ keyData }) {
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
        <CardsContainer>
            {Object.entries(keyData).map(([key, value]) => {
                return (
                    <CardWrapper key={key}>
                        <Icon src={setIcon[key]} alt="" />
                        <div>
                            <ValueText>
                                {value}
                                {key === 'calorieCount' ? 'kCal' : 'g'}
                            </ValueText>
                            <SubText>{setName[key]}</SubText>
                        </div>
                    </CardWrapper>
                )
            })}
        </CardsContainer>
    )
}

export default Card
