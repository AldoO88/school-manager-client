
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import IsAnonymous from './components/IsAnonymous';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<IsAnonymous><Signup/></IsAnonymous>} />
        <Route path='/login' element={<IsAnonymous><Login/></IsAnonymous>} />
      </Routes>
    </div>
  );
}

export default App;
