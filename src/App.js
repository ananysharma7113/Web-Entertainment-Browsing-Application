import { Container } from '@mui/material';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';
import {BrowserRouter ,Routes,Route } from "react-router-dom"
import Trending from "./components/Pages/Trending/Trending"
import Movies from "./components/Pages/Movies/Movies"
import Series from "./components/Pages/Series/Series"
import Search from "./components/Pages/Search/Search"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="app">
        <Container>
          <Routes>
            <Route path='/' element={<Trending/>} exact/>
            <Route path='/movies' element={<Movies/>} />
            <Route path='/series' element={<Series/>} />
            <Route path='/search' element={<Search/>} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
    
  );
}

export default App;
