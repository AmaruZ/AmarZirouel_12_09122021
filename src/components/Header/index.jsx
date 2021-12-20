import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
    padding: 0.6% 30px;
`

const Navigation = styled.nav`
    width: calc(100vw - 200px);
`

const NavWrapper = styled.ul`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`
const NavElement = styled.li`
    width: 100%;
    text-align: center;
`

function Header() {
    return (
        <StyledHeader>
            <img src={logo} alt="SportSee" />
            <Navigation>
                <NavWrapper>
                    <NavElement>
                        <Link to="/">Accueil</Link>
                    </NavElement>
                    <NavElement>
                        <Link to="/">Profil</Link>
                    </NavElement>
                    <NavElement>
                        <Link to="/">Réglage</Link>
                    </NavElement>
                    <NavElement>
                        <Link to="/">Communauté</Link>
                    </NavElement>
                </NavWrapper>
            </Navigation>
        </StyledHeader>
    )
}

export default Header
