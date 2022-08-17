import React, { useState } from "react";
import './IngridientList.css';
import IngListItem from "../IngListItem/IngListItem.jsx";
import Add from '@mui/icons-material/Add';

function IngridientList(props){
    let {ing,update}=props;
    let [val,setVal]=useState("");
    let [items,setItems]=useState([...ing]);
    
    function change(e){
        setVal(e.target.value);
    }

    async function insert(e){
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
            <div className="ing-list-main">
                <div className="ing-list-center">
                    <input type="text" placeholder="Add Items" onChange={change} value={val} className="ing-text-area" id="inp"></input>
                    <button onClick={insert} className="ing-add"><Add/></button>
                    <br/>
                    <ol className="ing-list-list">
                        {items.map((ele,ind)=>{
                            return(
                                <IngListItem
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

export default IngridientList; 
