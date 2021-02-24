import './GalleryItem.css';
import React from 'react';

function GalleryItem({image}){

    const [selected, setSelected] = React.useState(false);
    const toggleSelected = () =>{
        setSelected(!selected);

    }

    const handleSelect = () => {
        toggleSelected()
        
    }

    return(
        <>
        <li className={selected ? "selected" : "notSelected"}>{
            <img src={image.url} alt={image.id} height="150px" width="150pxs"/>
        }
        
        </li>
        <button 
        onClick={handleSelect}
        type="button">Select this Image</button>
        </>

    );
}

export default GalleryItem;