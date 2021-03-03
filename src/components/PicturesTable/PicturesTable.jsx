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
import Alert from 'react-bootstrap/Alert';
import PicturesTablePicture from '../PicturesTablePicture/PicturesTablePicture';

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
        <Container fluid>
            <Row className="pb-3">
                <Col className="d-flex flex-nowrap align-items-center">
                <InputGroup className="input-group-md">
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
                    >Search</Button>
                </InputGroup.Append>
            </InputGroup>
            <Button
            className="mx-2"
            size="md"
            onClick={getTodaysImages}
            variant="outline-dark">Today</Button>
            </Col>
            <Col className="text-center">  
            <h1>Can put text here if you want</h1>
            </Col>                 
            </Row>

            <Row>
            <SRLWrapper>
                    <Row className="row-cols-6 row-cols-sm-3 row-cols-md-5 px-3">
                        {gallery.map(image => {
                            return (
                                <Col key={image.id}>
                                    <PicturesTablePicture 
                                    dateQuery={dateQuery}
                                    image={image} />
                                </Col>
                            )
                        })}
                    </Row>
                    </SRLWrapper>

                    </Row>
                </Container>
            
        </>
    );
}

export default PicturesTable;