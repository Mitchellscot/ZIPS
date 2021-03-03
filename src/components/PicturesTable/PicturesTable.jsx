import './PicturesTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { SRLWrapper } from "simple-react-lightbox";
import Container from 'react-bootstrap/Container';
import GalleryItem from '../GalleryItem/GalleryItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PicturesTable() {
    const dispatch = useDispatch();
    const [dateQuery, setDateQuery] = useState('');
    const gallery = useSelector(store => store.gallery);

    const handleSearch = () => {
        dispatch({type: 'RESET_IMAGES'});
        dispatch({type: "SEARCH_IMAGE_DATES", payload: dateQuery});
    }

     const getTodaysImages = () => {
        dispatch({ type: 'FETCH_GALLERY' })
    };

    return (
        <>
        <SRLWrapper>
                <div id="keepWide" className="d-flex" >
            <InputGroup className="mb-3 w-50 px-3">
                <InputGroup.Text id="input-date-text">
                    <span >Date</span>
                </InputGroup.Text>
                <FormControl
                    className="text-center"
                    onChange={() => setDateQuery(event.target.value)}
                    type="date" />
                <InputGroup.Append>
                    <Button
                        onClick={handleSearch}
                        variant="outline-dark"
                    >GO</Button>
                </InputGroup.Append>
            </InputGroup>
            <Button
            onClick={getTodaysImages}
            variant="outline-dark">Get Today</Button>
            </div>
            <Container fluid>
                    <Row className="row-cols-5 row-cols-sm-3 row-cols-md-5">
                        {gallery.map(image => {
                            return (
                                <Col key={image.id}>
                                    <GalleryItem image={image} />
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </SRLWrapper>
        </>
    );
}

export default PicturesTable;