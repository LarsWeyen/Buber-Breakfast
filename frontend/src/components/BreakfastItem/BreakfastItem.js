import React from 'react'
import '../BreakfastItem/BreakfastItem.css'

export default function BreakfastItem ({breakfast}) {
  function formatAMPM(test) {
    var date = new Date(test)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  return (
    <div className='breakfast-container'>
      <div className='breakfast-image-container'>
        <img src={breakfast.imageURL} alt={breakfast.name} />
      </div>
      
      <div className='breakfast-content-container'>
        <div className='breakfast-title'>
          <h3>{breakfast.name}</h3>
          <span>{formatAMPM(breakfast.startDate)} - {formatAMPM(breakfast.endDateTime)}</span>
        </div>
        <div className='breakfast-lower-container'>
            <p>{breakfast.description}</p>
            <div className='ingredients-container'>
              {breakfast.savory.map((savory,index)=>{
              return(
                <div className='savory-item' key={index}>{savory}</div>
              )
            })}
            {breakfast.sweet.map((sweet,index)=>{
              return(
                <div className='sweet-item' key={index}>{sweet}</div>
              )
            })}
          </div>
        </div>
        
      </div>
      
      
    </div>
  )
}
