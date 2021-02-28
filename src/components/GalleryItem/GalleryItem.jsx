import './GalleryItem.css';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function GalleryItem({ image }) {
    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();

    const handleSelect = () => {
        cart.includes(image) ? dispatch({ type: 'REMOVE_FROM_CART', payload: image }) :
            dispatch({ type: 'ADD_TO_CART', payload: image });
    }
    const formatTime = (imageTime) => {
        const time = new Date(imageTime);
        const options = { hour: "numeric", minute: "numeric" }
        const fd = new Intl.DateTimeFormat('en-us', options).format(time);
        return fd.toString();
    }

    return (
        <Card className="shadow mb-3 bg-white rounded card">
            <a href={image.url}>
                <Card.Img variant="top" src={image.url} alt={formatTime(image.created)} height="256px" width="320px" />
            </a>
            <Card.Body className="d-flex justify-content-between align-items-center">
                <Card.Subtitle className="mb-2 text-muted">Taken at <b>{formatTime(image.created)}</b></Card.Subtitle>
                <Button variant={cart.includes(image) ? "outline-secondary" : "primary"}
                    onClick={handleSelect}
                    type="button">{cart.includes(image) ? <span>Unselect</span> : <span>&nbsp;&nbsp;Select&nbsp;&nbsp;</span>}</Button>{' '}
            </Card.Body>
        </Card>
    );
}

export default GalleryItem;