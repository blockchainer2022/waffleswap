import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import chef from '../../assets/img/chef.png'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={chef} height="32" style={{ marginTop: -4 }} />
      <StyledText>
          WaffleSwap
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  color: ${(props) => props.theme.color.black};
  font-family: 'Alice', serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
`



export default Logo
