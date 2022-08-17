import React,{ useState} from 'react'
import Header from '../../components/Header/Header';
import './Recipe.css'
import { useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import IngridientList from '../../components/IngridientList/IngridientList';
import DirectionsList from '../../components/DirectionsList/DirectionsList';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { axiosInstance } from '../../config';
const curuser=JSON.parse(sessionStorage.getItem('user'));
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function Recipe() {
  const [ing,seting]=useState([]);
  const [dir,setdir]=useState([]);
  const [IngEdit,setIngEdit]=useState(false);
  const [DirEdit,setDirEdit]=useState(false);
  const [disabled,setdisabled]=useState("disabled");
  const {recipeid}=useParams();
  const [recipename,setrecipename]=useState("");
  const [recipeImg,setrecipeImg]=useState("");
  const [recipeusername,setrecipeusername]=useState("");
  useEffect(() => {
    try{
      const getrecipe=async ()=>{
        const recipe=await axiosInstance.get(`/recipe/get/${recipeid}`);
        if(recipe.data.username===curuser.username){
          setdisabled("enabled");
        }
        seting(recipe.data.ingridients);
        setdir(recipe.data.directions);
        setrecipename(recipe.data.recipename);
        setrecipeImg(PF+recipe.data.recipeImg);
        setrecipeusername(recipe.data.username);
      }
      getrecipe();
    }
    catch(err){
      console.log(err);
    }
  }, [recipeid]);
  const db_update_ing = async(arr)=>{
    await axiosInstance.put(`/recipe/get/${recipeid}`,{"ingridients":arr});
  }
  const updateing = (arr)=>{
    seting(arr);
    db_update_ing(arr);
  }
  const db_update_dir = async(arr)=>{
    await axiosInstance.put(`/recipe/get/${recipeid}`,{"directions":arr});
  }
  const updatedir = (arr)=>{
    setdir(arr);
    db_update_dir(arr);
  }
  return (
    <>
      <Header/>
      <div className="recipe-container">
        <div className="recipe-header">{recipename}</div>
        <div className="recipe-sub-header">contributed by - {recipeusername}</div>
        <div className="img-container">
          <img src={recipeImg} alt="Pasta" className='recipe-img'/>
        </div>
        <div className="recipe-info">
          <div className="ingridients">
            <div className='heading'>Ingridients Required <button className={"ingedit "+disabled} onClick={()=>{setIngEdit(!IngEdit);}}>
            {IngEdit?<DoneIcon/>:<EditIcon/>}
            </button></div>
              {IngEdit?
                  <IngridientList ing={ing} update={updateing}/>
                  :
                  ing.map((value,index)=>{
                    return (
                      <div className="ingtag" key={'i'+index}><ArrowForwardIosSharpIcon fontSize="small" color="disabled" key={index}/> {value}</div>
                    )
                  })
              }
          </div>
          <div className="directions">
            <div className='heading'>Directions <button className={"diredit "+disabled} onClick={()=>{setDirEdit(!DirEdit);}}>
            {DirEdit?<DoneIcon/>:<EditIcon/>}
            </button></div>
            <div className="directions-info">
              {DirEdit?
                  <DirectionsList dir={dir} update={updatedir}/>
                  :
                  dir.map((value,index)=>{
                    return (
                      <>
                        <div className="subheading" key={index}><CheckCircleIcon/>  Step {index+1}</div>
                        <div className="subinfo" key={'sub-'+index}>{value}</div>
                      </>
                    )
                  })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recipe