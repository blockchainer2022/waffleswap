import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Label from '../../components/Label'
import Balances from './components/Balances'
import Value from '../../components/Value'
import CardIcon from '../../components/CardIcon'
import Backgroundimage from '../../assets/img/chef.png'
import { START_REWARD_AT_BLOCK } from '../../sushi/lib/constants'


const Home: React.FC = () => {
  var block = 23857867
  const launchBlock = START_REWARD_AT_BLOCK
  const [atDate, setDate] = useState<any>()

  return (
    <Page>
      <PageHeader
        icon={<img src={chef} height={120} className="rotate" />}
        title="Waffle Iron ready for use!"
        subtitle="Stake Uniswap LP tokens to make your own delicous waffles!"
      />

      <Container>
        <Balances />
      </Container>
      <Spacer />
      <StyledCardsWrapper>
       <Card>
       <CardContent>
        <StyledCardHeader>
      <Label text="Redefining Tokenomics."/>
      </StyledCardHeader>
      <Spacer/>
      <StyledInfo>
      <Label text="Deflationary Token 📈"/>
      <Label text="Weekly Token Burning 🔥"/>
      <Label text="Community Governed 🗳️"/>
      <Label text="Low Fixed Supply 💱"/>
      <Label text="Waffles? 🧇"/>

      </StyledInfo>
      </CardContent>
      <Footnote> 
      Check out our roadmap!
      </Footnote>
      </Card>
      <Spacer/>
      <Card>
       <CardContent>
        <StyledCardHeader>
      <Label text="Don't know where to start?"/>
      </StyledCardHeader>
      <Spacer/>
      <StyledInfo>
      <Label text="Start by selecting the pool(s) you want to provide liquidity to."/>
      <Spacer/>
      <Button text="🍳Select Pools" to="/farms" variant="secondary" />
      </StyledInfo>
      </CardContent>
      <Footnote> 
      <StyledLink
       target="_blank" href="https://discord.gg/zTdmUkb"> 
       How to start guide
       </StyledLink>
 
      </Footnote>
        
      </Card>
      </StyledCardsWrapper>
      <Spacer />
      <StyledInfo>
      <Label text="⚠️ WaffleSwap's contracts has not been properly audited, and the project is still in early development. Use at your own risk."/>
      </StyledInfo>



      <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto',
        }}>
      

      </div>
      
        
    </Page>
  )
}
const StyledCardHeader = styled.div`
  align-items: centRer;
  display: flex;
  flex-direction: column;
  font-family: 'Alice', serif;
  font-size: 18px;
  text-align: center;
  align-items: center;
  
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.black};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  font-family: 'Alice', serif;
  text-align: center;
  font-weight: bold;

  > b {
    color: ${(props) => props.theme.color.primary.main};
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
const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.black};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
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

export default Home
