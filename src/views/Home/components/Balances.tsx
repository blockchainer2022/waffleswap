import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import View from 'styled-components'
import numeral from 'numeral'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import YamIcon from '../../../components/YamIcon'

import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnharvested from '../../../hooks/useUnharvested'
import useYam from '../../../hooks/useYam'
import useBlock from '../../../hooks/useBlock'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'

import { bnToDec } from '../../../utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getSushiSupply, getSushiContract } from '../../../sushi/utils'
import { getSushiAddress } from '../../../sushi/utils'
import BigNumber from 'bignumber.js'
import CountUp from 'react-countup'
import UniswapIcon from '../../../components/UniswapIcon'


const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const yam = useYam()
  const sushiBalance = useTokenBalance(getSushiAddress(yam))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getSushiSupply(yam)
      setTotalSupply(supply)
    }
    if (yam) {
      fetchTotalSupply()
    }
  }, [yam, setTotalSupply])

  return (



    
    <StyledWrapper>

       <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <UniswapIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Button text="Trade On UNISWAP" href="http://www.uniswap.org" variant="secondary" />
                
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
Trade WAFFLE on Uniswap
   <FootnoteValue>  </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <YamIcon />
              <Spacer />
              <div style={{ flex: 1, flexDirection: 'column' }}>
                <Label text="Your WAFFLE Balance" />
                <Value
                  value={!!account ? getBalanceNumber(sushiBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
        Balance

          <FootnoteValue>
            <PendingRewards /> WAFFLE
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />
     

      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <YamIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Circulating WAFFLES" />
                <Value
                  value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
        RPB

   <FootnoteValue> 400 WAFFLE </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />

      

      </StyledWrapper>
     
  
         
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.black};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Alice', serif;
  float: right;
`


const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  @media (max-width: 768px) {
  width: 100%;
    align-items: center;
  }
  

`

const Row = styled.div`
  display: flex;
`


const StyledBalances = styled.div`
  display: flex;
`


const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Balances
