import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    *{
      margin:0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Roboto";
    }
    ul{
      list-style-type: none;
    }
    a{
      text-decoration: none;
      color: white;
      font-weight: 500;
      font-size: 24px;
    }
`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle
