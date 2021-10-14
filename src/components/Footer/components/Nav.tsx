import React from 'react'
import styled from 'styled-components'
import {contractAddresses} from '../../../sushi/lib/constants';
import {getEthChainInfo} from "../../../utils/getEthChainInfo";
// import {GITHUB} from '../../../constants/config';

const {
    ethscanType,
    chainId
} = getEthChainInfo();

const contractAddressesTemp = contractAddresses as {[index: string]:any};

const Nav: React.FC = () => {
    return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href={`https://${ethscanType}etherscan.io/address/${contractAddressesTemp.sushi[chainId]}#code`}
      >
        WaffleIron Contract
       </StyledLink>
     {/* <StyledLink/*}
        target="_blank"
        href={`https://${ethscanType}etherscan.io/address/${contractAddressesTemp.masterChef[chainId]}#code`}
      >
      
      </StyledLink>
      {/*<StyledLink*/}
      {/*  target="_blank"*/}
      {/*  href={`https://uniswap.info/pair/${contractAddressesTemp.sushi[chainId]}`}*/}
      {/*>*/}
      {/*  Uniswap SASHIMI-ETH*/}
      {/*</StyledLink>*/}
      <StyledLink target="_blank" href="https://discord.gg">
        Discord
      </StyledLink>
        <StyledLink target="_blank" href="https://t.me/joinchat/AAAAAFB2McVEScGJB3BOPw">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg">
        Medium
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg">
        Github
      </StyledLink>
      {/*<StyledLink target="_blank" href="https://github.com/sushiswap">*/}
      {/*<StyledLink target="_blank" href={GITHUB}>*/}
      {/*  Github*/}
      {/*</StyledLink>*/}
      {/*<StyledLink target="_blank" href="https://twitter.com/sushiswap">*/}
      {/*  Twitter*/}
      {/*</StyledLink>*/}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.black};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.black};
  }
`

export default Nav
