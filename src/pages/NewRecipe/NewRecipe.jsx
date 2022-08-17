import React,{ useState} from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header/Header';
import './NewRecipe.css'
import IngridientList from '../../components/IngridientList/IngridientList';
import DirectionsList from '../../components/DirectionsList/DirectionsList';
import { axiosInstance } from '../../config';
const curuser=JSON.parse(sessionStorage.getItem('user'));

function NewRecipe() {
  const [ing,seting]=useState([]);
  const [dir,setdir]=useState([]);
  const [recipename,setrecipename]=useState("");
  const [file,setFile]=useState("");
  const navigate=useNavigate();
  const updateing = (arr)=>{
    seting(arr);
  }
  const updatedir = (arr)=>{
    setdir(arr);
  }

  const clickhandler=async(e)=>{
    e.preventDefault();
    const newRecipe={
      "username":curuser.username,
      "userid":curuser.userid,
      "recipename":recipename,
      "ingridients":ing,
      "directions":dir,
    };
    if(file){
      const data = new FormData();
      const newfilename=Date.now()+'--'+file.name;
      data.append("name", newfilename);
      data.append("file", file);
      try {
        await axiosInstance.post("/upload", data);
        newRecipe.recipeImg=newfilename;
      } catch (err) {
        console.log(err);
      }
    }
    try{
      const created = await axiosInstance.post(`/recipe/create`,newRecipe);
      navigate(`/recipe/${created.data._id}`);
    }
    catch(err){
      console.log(err);
    }
  }
  
  return (
    <>
      <Header/>
      <div className="recipe-container">
        <input type="text" onChange={(e)=>{setrecipename(e.target.value)}} value={recipename} className="recipe-header" placeholder='Add Recipe Name'/>
        <div className="img-container">
          <input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])}/>
        </div>
        <div className="recipe-info">
          <div className="ingridients">
            <div className='heading'>Ingridients Required</div>
            <IngridientList ing={ing} update={updateing}/>
          </div>
          <div className="directions">
            <div className='heading'>Directions</div>
            <div className="directions-info">
              <DirectionsList dir={dir} update={updatedir}/>
            </div>
          </div>
          <button className='add-recipe' onClick={clickhandler}>Add Recipe</button>
        </div>
      </div>
    </>
  );
}

export default NewRecipe
