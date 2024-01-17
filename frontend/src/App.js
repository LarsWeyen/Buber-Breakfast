import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom'
import CreateBreakfast from './pages/CreateBreakfast/CreateBreakfast';
import Breakfasts from './pages/Breakfasts';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Breakfasts/>}/>
          <Route path="/create" element={<CreateBreakfast />}/>
      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
