import React from 'react'
import uniswapimage from '../../assets/img/uniswapimage.png'
import chef from '../../assets/img/chef.png'

interface UniswapIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const UniswapIcon: React.FC<UniswapIconProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    {<img src={uniswapimage} height="60" />}
  </span>
)
export default UniswapIcon
