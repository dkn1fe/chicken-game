import { FC } from 'react'
import coinImg from '../../assets/coin.png'
import './coin.css'

interface Coin {
    coin:number,
}

export const Coins:FC<Coin> = ({coin}) => {
    return (
          <div className="main-coin">
             <img className='coin' src = {coinImg}/>
             <p>{coin}</p>
          </div>
    )
}