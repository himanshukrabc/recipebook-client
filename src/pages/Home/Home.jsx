import React, { useState, useEffect } from 'react';
import './Home.css'
import Header from '../../components/Header/Header';
import Tile from '../../components/Tile/Tile';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const curuser=JSON.parse(sessionStorage.getItem("user"));

function Home(){
  const [userRecipes,setUserRecipes]=useState([]);
  const [suggestions,setSuggestions]=useState([]);

  const username=curuser.username;

  useEffect(() => {
    const fetchrecipe = async()=>{
      const userRecipe = await axios.get(`/recipe/getall/${username}`);
      setUserRecipes(userRecipe.data);
      const suggestions = await axios.get(`/recipe/suggest/all`);
      setSuggestions(suggestions.data);
    };
    fetchrecipe();
  }, [username]);
  return (
    <>
      <Header/>
      <div className="user-recipes">
        <div className="theading">Your Recipes</div>
        <div className="user-tile-list" display={userRecipes.length===0?'none':'block'}>
        {userRecipes.map((val,ind)=><Tile recipe={val} key={ind}/>)}
        </div>
        <button className='add-recipe'><NavLink to='/newrecipe' className='nav-link-add' end>Add your own recipes</NavLink></button>
      </div>
      <div className='suggestions'>
        <div className="theading">Try these out</div>
        <div className="tile-list">
        {suggestions.map((val,ind)=><Tile recipe={val} key={ind}/>)}
        </div>
      </div>
    </>
  );
}

export default Home