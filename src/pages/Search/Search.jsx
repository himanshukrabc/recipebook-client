import React, { useState, useEffect } from 'react';
import './Search.css'
import Header from '../../components/Header/Header';
import Tile from '../../components/Tile/Tile';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const api_url=process.env.API_URL;

function Search(){
  const [Recipes,setRecipes]=useState([]);
  const val=useParams().val;

  useEffect(() => {
    const fetchrecipe = async()=>{
      const searchRecipes = await axios.get(api_url+`/recipe/search/${val}`);
      setRecipes(searchRecipes.data);
    };
    fetchrecipe();
  }, [val]);
  return (
    <>
      <Header/>
      <div className='suggestions'>
        <div className="theading">Search Results</div>
        <div className="subheading">{Recipes.length} results found</div>
        <div className="tile-list">
        {Recipes.map((val,ind)=><Tile recipe={val} key={ind}/>)}
        </div>
      </div>
    </>
  );
}

export default Search