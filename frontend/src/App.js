import './App.css';
import { BreakfastList } from './components/BreakfastList/BreakfastList';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Buber <span>Breakfast</span></h1>
        <hr />
      </div>
      <main>
        <div className='breakfast-header-container'>
          <h3>Your <span>Breakfasts</span></h3>
          <span>Breakfasts you have created</span>
        </div>
        <div className="breakfast-list">
          <BreakfastList />
        </div>
        <div className='footer'>
          <input type="button" value="Create New Breakfast"/>
        </div>
      </main>
    </div>
  );
}

export default App;
