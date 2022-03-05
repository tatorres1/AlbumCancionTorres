import './App.css';
import { Home } from "./Home";
import { Album } from "./Album";
import { Cancion } from "./Cancion";
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className='d-flex justify-content-center m-3'>React Js</h3>
      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
        <ul className='navbar-nav'>
          <li className='nav-item m-1'>
            <NavLink className="btn btn-light btn-outline-primary" to='/home'>
              Home
            </NavLink>
          </li>
        </ul>
        <ul className='navbar-nav'>
          <li className='nav-item m-1'>
            <NavLink className="btn btn-light btn-outline-primary" to='/album'>
              Album
            </NavLink>
          </li>
        </ul>
        <ul className='navbar-nav'>
          <li className='nav-item m-1'>
            <NavLink className="btn btn-light btn-outline-primary" to='/cancion'>
              Cancion
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/album' element={<Album/>} />
        <Route path='/cancion' element={<Cancion/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
