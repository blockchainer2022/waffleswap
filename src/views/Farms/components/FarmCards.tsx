import React, { useCallback, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { useWallet } from 'use-wallet'
import numeral from 'numeral'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import useFarms from '../../../hooks/useFarms'
import useYam from '../../../hooks/useYam'
import BigNumber from 'bignumber.js'
import { Farm } from '../../../contexts/Farms'
import { bnToDec } from '../../../utils'
import { getEarned, getMasterChefContract } from '../../../sushi/utils'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import {BASIC_TOKEN} from '../../../constants/config';
import { START_REWARD_AT_BLOCK } from '../../../sushi/lib/constants'


interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const stakedValue = useAllStakedValue()

  const sushiIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === BASIC_TOKEN,
  )

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  // TODO: After block height xxxx, SUSHI_PER_BLOCK = 100;
  const SASHIMI_PER_BLOCK = new BigNumber(1000)

  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? sushiPrice
              .times(SASHIMI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null,
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Cooking the waffles...." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setstartTime] = useState(farm.pid >= 0 ? 0 : START_REWARD_AT_BLOCK)
  const [harvestable, setHarvestable] = useState(0)


  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const yam = useYam()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (yam) return
      const earned = await getEarned(
        getMasterChefContract(yam),
        lpTokenAddress,
        account, 
      )
      setHarvestable(bnToDec(earned))
    }
    if (yam && account) {
      fetchEarned()
    }
  }, [yam, lpTokenAddress, account, setHarvestable])

  const poolActive = false //startTime * 1000 - Date.now() <= 0


  let farmApy:any;
  if (farm.apy && farm.apy.isNaN()) {
    farmApy = '- %';
  } else {
    farmApy = farm.apy
        ? `${farm.apy
            .times(new BigNumber(100))
            .toNumber()
            .toLocaleString('en-US')
            .slice(0, -1) || '-' }%`
        : 'Loading APY ...';
  }

  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'WAFFLE' } {/* && <StyledCardAccent /> */}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>{farm.icon}</CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.lpToken.toUpperCase()}</StyledDetail>
              {/* <StyledDetail>Earn {farm.earnToken.toUpperCase()} {farm.pool}</StyledDetail> */}
            </StyledDetails>
            <Spacer />
            <Button
              disabled={!poolActive} // !poolactive disabled pool, poolactive active pool
              text={!poolActive ? 'Launches at block 21857867' : undefined}
              
              to={`/farms/${farm.id}`}
            >
              {
                
              }
            </Button>
            <StyledInsight>
              <span>APY</span>
              <span>
                {farmApy}
              </span>
              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

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

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.black}; // grey 600
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => [500]}; // grey 500
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

export default FarmCards
