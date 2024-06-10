import { FC } from 'react'
import './lives.css'

interface Lives {
   id:number,
   img:string
}
interface LivesProps{
  live:Lives[]
}

export const Lives:FC<LivesProps> = ({live}) => {
    return (
        <>
          <div className="egg">
             {live.map(item => (
               <img  className = 'egg-img' src = {item.img}/>
             ))}
          </div>
        </>
    )
}