import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter as Router,Navigate} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Recipe from './pages/Recipe/Recipe'
import NewRecipe from './pages/NewRecipe/NewRecipe'
import Search from './pages/Search/Search'

function App() {
  const user=JSON.parse(sessionStorage.getItem('user'));
  return (
    <Router>
      <Routes>
        <Route path="/" element={user?<Home/>:<Login/>}/>
        <Route path="/login" element={user?<Navigate to='/' replace/>:<Login/>}/>
        <Route path="/register" element={user?<Navigate to='/' replace/>:<Register/>}/>
        <Route path="/recipe/:recipeid" element={user?<Recipe/>:<Login/>}/>
        <Route path="/newrecipe" element={user?<NewRecipe/>:<Login/>}/>
        <Route path="/search/:val" element={user?<Search/>:<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;