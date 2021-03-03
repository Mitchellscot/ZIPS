import './PicturesTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { SRLWrapper } from "simple-react-lightbox";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PicturesTablePicture from '../PicturesTablePicture/PicturesTablePicture';
import { QuestionCircle } from "react-bootstrap-icons";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function PicturesTable() {
    const dispatch = useDispatch();
    const [dateQuery, setDateQuery] = useState(false);
    const gallery = useSelector(store => store.gallery);

    const handleSearch = () => {
        let dateQ = document.getElementById("picture-search-date").value;
        console.log('Here is dateQ:', dateQ);
        setDateQuery(true);
        console.log('Here is the dateQuery: ', dateQuery);
        if (dateQ === '') {
            alert('Please enter a date or press the today button to view today\'s images');
        }
        else {
            dispatch({ type: 'RESET_IMAGES' });
            dispatch({ type: "SEARCH_IMAGE_DATES", payload: dateQ });
        }
    }

    const getNumberOfShown = (gallery) => {
        let counter = 0;
        gallery.map(image =>{
            if (image.show === true){
                counter++;
            }
        })
        return counter;
    }

    const getTodaysImages = () => {
        setDateQuery(false);
        dispatch({ type: 'FETCH_GALLERY' })
    };

    return (
        <>
            <Container fluid>
                <Row className="pb-3">
                    <Col className="d-flex flex-nowrap align-items-center justify-content-around">
                        <InputGroup className="input-group-md w-75">
                            <InputGroup.Text id="input-date-text">
                                <span >Date</span>
                            </InputGroup.Text>
                            <FormControl
                                id="picture-search-date"
                                className="text-center"
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
                    <Col className="text-center d-flex justify-content-around">
                    <h4>{"You are showing " + getNumberOfShown(gallery) + " images in the Gallery"}</h4>
                    </Col>
                    <Col className="text-center d-flex justify-content-around">
                        <ButtonGroup size={"sm"}>
                            <Button variant="outline-dark">All Shown</Button>
                            <Button variant="outline-dark">Hide All</Button>
                        </ButtonGroup>
                        <QuestionCircle
                            type="button"
                            onClick={() => { alert() }}
                            fontSize="2rem"
                            variant="outline-dark"></QuestionCircle>
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