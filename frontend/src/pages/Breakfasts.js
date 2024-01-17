import React from 'react'
import { BreakfastList } from '../components/BreakfastList/BreakfastList';
import {Link} from 'react-router-dom'
import { Header } from '../components/Header/Header';
const Breakfasts = () => {
  return (
    <div>
    <Header/>
  <main>
    <div className='breakfast-header-container'>
      <h3>Your <span className='blue-highlighter'>Breakfasts</span></h3>
      <span className='lower-opacity'>Breakfasts you have created</span>
    </div>
    <div className="breakfast-list">
      <BreakfastList />
    </div>
    <footer>
        <Link to="/create" push={true}>
            <input type="button" className='create-button' value="Create New Breakfast"/>
        </Link>
    </footer>
  </main>
  </div>
  )
}

export default Breakfasts