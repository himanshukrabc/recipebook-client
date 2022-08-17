import React from "react";
import Remove from '@mui/icons-material/Remove';

function DirListItem(props){
    return(
        <>
            <li>
                <button className="ing-remove"
                onClick={()=>{
                    props.onclick(props.id);
                }} 
                id={props.id}><Remove/></button>
                {" "+props.text}
            </li>
        </>
    );
}

export default DirListItem;
