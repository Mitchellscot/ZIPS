import './GalleryItem.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';


function GalleryItem({ image }) {
    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();
    const [selected, setSelected] = React.useState(false);
    const toggleSelected = () => {
        setSelected(!selected);
    }
    const handleSelect = () => {
        toggleSelected()
        selected ? dispatch({ type: 'REMOVE_FROM_CART', payload: image }) :
            dispatch({ type: 'ADD_TO_CART', payload: image });
    }

    return (
        <>
            <a href={image.url}>
                <img src={image.url} alt={image.id} height="150px" width="150px" />
            </a>

            <Button variant="primary"
                onClick={handleSelect}
                type="button">{cart.includes(image) ? <span>Unselect</span> : <span>Select this Image</span>}</Button>{' '}
                </>
    );
}

export default GalleryItem;

/* <li className={cart.includes(image) ? "selected" : "notSelected"}>{
                <img src={image.url} alt={image.id} height="150px" width="150pxs" />
            }
            </li> */