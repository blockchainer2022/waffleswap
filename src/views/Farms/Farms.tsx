// @ts-ignore
import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import styled, { keyframes } from 'styled-components'
import chef from '../../assets/img/chef.png'
import ReactDOM from 'react-dom';
import DateCountdown from 'react-date-countdown-timer';
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import Countdowner from '../../components/CardContent'
import Farm from '../Farm'
import FarmCards from './components/FarmCards'
import Countdown from 'react-countdown'
import Spacer from '../../components/Spacer'


const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={chef} height="120" className="rotate" />}
                subtitle="Earn WAFFLE tokens by staking Uniswap V2 LP Tokens."
                title="Select pool and start cookin'!"

              /> 
              
      <StyledCardWrapper>
      { <StyledCardAccent /> }
      <Card>
      <StyledInfo> 
      <StyledLink
       target="_blank" href="https://etherscan.io/block/countdown/100000000"> 
       <div style={{fontWeight: 'bold', fontSize: 15, marginBottom: 1}}>
              CLICK HERE TO VIEW THE COUNTDOWN TO LAUNCH! 🚀
            </div>
      </StyledLink>
      </StyledInfo>
      </Card>
      </StyledCardWrapper>


              <Spacer />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
       <StyledCardsWrapper>
       <Card>
      <StyledInfo> 
     All launch pool rewards are boosted until 11/29! 📈
      </StyledInfo>
      </Card>
      </StyledCardsWrapper>
            
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔑 Unlock Wallet"
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default Farms

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    120deg,
    rgba(226, 88, 34, 0) 0%,
    rgba(226, 88, 34, 0.1) 10%,
    rgba(226, 88, 34, 0.2) 20%,
    rgba(226, 88, 34, 0.3) 30%,
    rgba(226, 88, 34, 0.4) 40%,
    rgba(226, 88, 34, 0.5) 50%,
    rgba(226, 88, 34, 0.6) 60%,
    rgba(226, 88, 34, 0.692) 70%,
    rgba(226, 88, 34, 0.8) 80%,
    rgba(226, 88, 34, 0.9) 90%,
    rgba(226, 88, 34, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`
const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 430px;
  @media (max-width: 200px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((1350px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
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

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.black};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.primary.main};
  }
`