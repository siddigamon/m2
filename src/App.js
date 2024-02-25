import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Employees from './pages/Employees';
import Add from './pages/Add';
import Update from './pages/Update';
import './App.css';
import './Employee.css';
import View from './pages/View'; 




function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Employees/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="/update/:id" element={<Update/>} />
          <Route path="/department" element={<View/>} /> 

        </Routes>
      </BrowserRouter>
    </div>
     
  );
}

export default App;
