import './App.css';
import { BreakfastList } from './components/BreakfastList/BreakfastList';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Buber <span className='blue-highlighter'>Breakfast</span></h1>
        <hr />
      </div>
      <main>
        <div className='breakfast-header-container'>
          <h3>Your <span className='blue-highlighter'>Breakfasts</span></h3>
          <span className='lower-opacity'>Breakfasts you have created</span>
        </div>
        <div className="breakfast-list">
          <BreakfastList />
        </div>
        <footer>
          <input type="button" className='create-button' value="Create New Breakfast"/>
        </footer>
      </main>
    </div>
  );
}

export default App;
