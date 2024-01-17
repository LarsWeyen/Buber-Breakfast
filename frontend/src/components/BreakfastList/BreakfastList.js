import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BreakfastItem from '../BreakfastItem/BreakfastItem';


export const BreakfastList = () => {
  const [breakfasts, setBreakfasts] = useState(null);
  const getBreakfasts = async () => {
    axios.get('http://localhost:5090/Breakfast')
    .then(res =>{
      if(res.data.length == 0){
        setBreakfasts(null)
      }
      else{
        setBreakfasts(res.data)
      }
      
    })
    .catch(err =>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getBreakfasts()
  },[])

  return (  
    <div className='breakfast-list-container'>
      {breakfasts ? (
        breakfasts.map((breakfast,index)=>{
          return(
            <BreakfastItem breakfast={breakfast} key={index}/>
          )
        })
      ):(
        <span>No breakfast created yet</span>
      )}
      
    
    </div>
  )
}
