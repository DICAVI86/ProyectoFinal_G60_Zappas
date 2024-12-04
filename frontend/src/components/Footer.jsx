import React from 'react'
import logoPrimary from '../assets/logo_primary.png'

function Footer() {
  return (
    <div className='footer'>
        <img src={logoPrimary} 
             alt="" 
             style={{ width: "20%", height: "auto" }}/>
    </div>
  )
}

export default Footer