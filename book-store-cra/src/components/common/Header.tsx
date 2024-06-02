import {styled} from "styled-components";

function Header() {
  return (
    <HeaderStyle>
      <h1>book sotre</h1>
    </HeaderStyle>
  )
}

// background와 h1 같은 표현방식. 위는 Destructuring(구조분해할당)
const HeaderStyle = styled.header`
  background-color: ${({theme}) => theme.color.background};

  h1 {
    color: ${(props) => props.theme.color.primary};
  }
`

export default Header;