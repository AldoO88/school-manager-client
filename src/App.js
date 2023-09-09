
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import IsAnonymous from './components/IsAnonymous';
import Listbar from './components/Listbar';
import Teachers from './pages/Teachers';
import IsPrivate from './components/isPrivate';
import { useContext } from 'react';
import { AuthContext } from './context/auth.context';
import Groups from './pages/Groups';
import Students from './pages/Students';
import Subjects from './pages/Subjects';


function App() {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <div className="App">
      <Navbar/>
      <div className='dashboard'>
      {
        isLoggedIn && 
          <div>
            <Listbar/>
          </div>
      }
      
      <div className='dashRight'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/teachers' element={<IsPrivate><Teachers/></IsPrivate> }/>
        <Route path='/groups' element={<IsPrivate><Groups/></IsPrivate> } />
        <Route path='/students' element={<IsPrivate><Students/></IsPrivate> } />
        <Route path='/subjects' element={<IsPrivate><Subjects/></IsPrivate> } /> 
        <Route path='/signup' element={<IsAnonymous><Signup/></IsAnonymous>} />
        <Route path='/login' element={<IsAnonymous><Login/></IsAnonymous>} />

      </Routes>
      </div>

      </div>
      
    </div>
  );
}

export default App;
