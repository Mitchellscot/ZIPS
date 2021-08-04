import { cartConstants } from '../../_constants';
import './GalleryItem.css';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { formatTime } from '../../_actions';

export default function GalleryItem({ image }) {
    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();
    const handleSelect = () => {
        cart.includes(image) ? dispatch({ type: cartConstants.REMOVE, payload: image }) :
            dispatch({ type: cartConstants.ADD, payload: image });
    }

    return (
        <Card className="shadow mb-3 bg-white rounded card">
            <a href={image.wm_url}>
                <Card.Img variant="top" src={image.th_url} alt={formatTime(image.created)} min-height="256px" min-width="320px" />
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