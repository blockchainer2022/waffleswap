import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import chef from '../../assets/img/chef.png'

import useYam from '../../hooks/useYam'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'
import { getMasterChefContract } from '../../sushi/utils'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import BigNumber from 'bignumber.js'
import Harvest from './components/Harvest'
import Harvest2 from './components/Harvest2'
import Stake from './components/Stake'


const Farm: React.FC = () => {
  const { farmId } = useParams()
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const yam = useYam()
  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const { onRedeem } = useRedeem(getMasterChefContract(yam))

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      <PageHeader
        icon={<img src={chef} height="120" className="rotate" />}
        subtitle={`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`}
        title={name}
      />
      <StyledFarm>
        
      <Card>
          <CardContent>
          <StyledInfo>
          🔔 Every time you stake and unstake LP tokens, the contract will
          automatically harvest WAFFLE rewards for you!  
          </StyledInfo>
          </CardContent>
          </Card>
         

        <StyledCardsWrapper>
        <Harvest2 pid={pid}  />
        <Spacer />
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              lpContract={lpContract}
              pid={pid}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer />
    
       
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 200px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 200px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  @media (max-width: 200px) {
    width: 100%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.black}; // grey 400
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Farm
