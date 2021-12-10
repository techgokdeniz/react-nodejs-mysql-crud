import './App.css';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Add from './pages/Add';
import Dashboard from './pages/Dashboard';
import EditUser from './pages/EditUser';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='*' element={<Home />} />
          <Route path='/edit/:id' element={<EditUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
