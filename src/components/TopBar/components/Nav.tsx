import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        Farms
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/faq">
        Proposals
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/">
        About
      </StyledLink>


      
      
      
       
     
      
      {/*<StyledAbsoluteLink*/}
      {/*  href="https://medium.com/sushiswap/the-sushiswap-project-c4049ea9941e"*/}
      {/*  target="_blank"*/}
      {/*>*/}
      {/*  About*/}
      {/*</StyledAbsoluteLink>*/}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[600]}; // grey
  }
  &.active {
    color: ${(props) => props.theme.color.black}; 
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.black}; // grey
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[400]}; // grey 
  }
  &.active {
    color: ${(props) => props.theme.color.black}; // primary.main
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
