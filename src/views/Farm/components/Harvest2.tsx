import React, { useState } from 'react'
import styled from 'styled-components'
import uniswapimage from '../../../assets/img/uniswapimage.png'
import { Contract } from 'web3-eth-contract'
import { NavLink } from 'react-router-dom'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'

import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'

import {
  getDisplayBalance,
  getBalanceNumber,
} from '../../../utils/formatBalance'

interface Harvest2Props {
  pid: number
}

const Harvest2: React.FC<Harvest2Props> = ({ pid }) => {
  const earnings = useEarnings(pid)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useReward(pid)

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon><img src={uniswapimage} height="60"/></CardIcon>
            <Label text="Add liquidity to this pool on UNISWAP" />
          </StyledCardHeader>
          <StyledCardActions>
          <Button text="Add Liquidity" href="http://www.uniswap.org" variant="secondary" /> 
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

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

export default Harvest2
