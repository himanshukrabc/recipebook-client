import React, { useState } from "react";
import './DirectionsList.css';
import DirListItem from "../DirListItem/DirListItem.jsx";
import Add from '@mui/icons-material/Add';

function DirectionsList(props){
    let {dir,update}=props;
    let [val,setVal]=useState("");
    let [items,setItems]=useState([...dir]);
    
    function change(e){
        setVal(e.target.value);
    }
    
    function insert(e){
        if(val!==""){
            let newarr=[...items,val];
            setItems(newarr);
            update(newarr);
            setVal("");
        }
    }
  
    function remove(id){
        let newarr=items.filter((ele,ind)=>{
            return ind!==id;
        });
        setItems(newarr);
        update(newarr);
    }
    
    return(
        <>
            <div className="dir-list-main">
                <div className="dir-list-center">
                    <input type="text" placeholder="Add Items" onChange={change} value={val} className="dir-text-area" id="inp"></input>
                    <button onClick={insert} className="dir-add"><Add/></button>
                    <br/>
                    <ol className="dir-list-list">
                        {items.map((ele,ind)=>{
                            return(
                                <DirListItem
                                    text={ele}
                                    id={ind}
                                    key={ind}
                                    onclick={remove}
                                />
                            )
                        })}
                    </ol>
                </div>
            </div>
        </>
    );
}

export default DirectionsList; 
