import React,{ useState} from 'react'
import Header from '../../components/Header/Header';
import './NewRecipe.css'
import IngridientList from '../../components/IngridientList/IngridientList';
import DirectionsList from '../../components/DirectionsList/DirectionsList';
import axios from 'axios';
const curuser=JSON.parse(sessionStorage.getItem('user'));
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function NewRecipe() {
  const [ing,seting]=useState([]);
  const [dir,setdir]=useState([]);
  const [recipename,setrecipename]=useState("");
  const [file,setFile]=useState("");
  const stock=PF+'add.jpg';
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
        await axios.post("/upload", data);
        newRecipe.recipeImg=newfilename;
      } catch (err) {
        console.log(err);
      }
    }
    try{
      const created = await axios.post(`/recipe/create`,newRecipe);
      window.location.href = `/recipe/${created.data._id}`;
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
          <img src={file?file:stock} alt="Img" className='recipe-img'/>
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