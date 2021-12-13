import { Link } from 'react-router-dom'
import styled from 'styled-components'
import icon1 from '../../assets/sidebar-icon-1.svg'
import icon2 from '../../assets/sidebar-icon-2.svg'
import icon3 from '../../assets/sidebar-icon-3.svg'
import icon4 from '../../assets/sidebar-icon-4.svg'

const VerticalBar = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background: #000;
    width: 117px;
    height: calc(100vh - 100px);
`
const Navigation = styled.nav`
    height: 60%;
`
const NavElement = styled.li`
    margin-bottom: 10px;
`

const Copyrights = styled.p`
    color: white;
    font-size: 12px;
    writing-mode: vertical-rl;
    transform: scale(-1);
    margin-bottom: 20%;
`

function SideBar(){
    return (
        <VerticalBar>
            <Navigation>
                <ul>
                    <NavElement><Link to="/"><img src={icon1} alt="" /></Link></NavElement>
                    <NavElement><Link to="/"><img src={icon2} alt="" /></Link></NavElement>
                    <NavElement><Link to="/"><img src={icon3} alt="" /></Link></NavElement>
                    <NavElement><Link to="/"><img src={icon4} alt="" /></Link></NavElement>
                </ul>
            </Navigation>
            <Copyrights>Copyright, SportSee 2020</Copyrights>
        </VerticalBar>
    )
}

export default SideBar;