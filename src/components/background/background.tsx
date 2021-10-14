import React from 'react'
import Backgroundimage from '../../assets/img/chef.png'

interface backgroundProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const background: React.FC<backgroundProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    
    {<img src={Backgroundimage} height="60" />}
  </span>
 
)
export default background
