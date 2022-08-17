import React from 'react';
import './Tile.css'
import {NavLink} from 'react-router-dom';

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function Tile(props) {
  return (
    <div className="tile-container">
        <img src={PF+props.recipe.recipeImg} alt={props.recipe.recipename} className="tile-img"/>
        <div className="name">{props.recipe.recipename}</div>
        <button className="btn"><NavLink to={`/recipe/${props.recipe._id}`} className='navlink' end>Open Recipe</NavLink></button>
    </div>
  )
}

export default Tile;