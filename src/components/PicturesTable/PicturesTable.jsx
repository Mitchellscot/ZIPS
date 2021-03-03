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
import axios from 'axios';

function PicturesTable() {
    const dispatch = useDispatch();
    const [dateQuery, setDateQuery] = useState(false);
    const gallery = useSelector(store => store.gallery.galleryReducer);
    const shownImages = useSelector(store => store.gallery.shownImagesReducer);
    //"show mode" means it's showing all images where show=true, instead of the standard gallery
    const [showMode, setShowMode] = useState(false);

    const toggleShowMode = () => {
        setShowMode(!showMode);
    }

    const setShownImagesToFalse = () => {
        shownImages.map(image => {
            axios.put(`/api/image/show/${image.id}`, {show: !image.show}).then((response)=>{
                dispatch({ type: 'RESET_IMAGES' });
                dispatch({ type: 'FETCH_SHOWN_IMAGES' });
                setShowMode(false);
                console.log(`image with ${image.id} is not showing anymore`);
            }).catch(error=>{console.log(`HEY MITCH - COULDN'T SET ALL SHOWN IMAGES TO FALSE`)});
        })
    }

    const handleSearch = () => {
        let dateQ = document.getElementById("picture-search-date").value;
        setDateQuery(true);
        if (dateQ === '') {
            alert('Please enter a date or press the today button to view today\'s images');
        }
        else {
            dispatch({ type: 'RESET_IMAGES' });
            dispatch({ type: "SEARCH_IMAGE_DATES", payload: dateQ });
        }
    }

    const getNumberOfShown = (images) => {
        return images.length;
    }

    const getTodaysImages = () => {
        setDateQuery(false);
        dispatch({ type: 'FETCH_GALLERY' })
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_SHOWN_IMAGES' })
    }, []);


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
                        <h4>{"You are showing " + getNumberOfShown(shownImages) + " images in the Gallery"}</h4>
                    </Col>
                    <Col className="text-center d-flex justify-content-around">
                        <ButtonGroup size={"sm"}>
                            <Button
                                onClick={toggleShowMode}
                                variant={showMode ? "dark" : "outline-dark"}
                                >All Shown</Button>
                            <Button 
                                onClick={setShownImagesToFalse}
                                variant="outline-dark">Hide All</Button>
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
                            {showMode ?
                                shownImages.map(image => {
                                    return (
                                        <Col key={image.id}>
                                            <PicturesTablePicture
                                                dateQuery={dateQuery}
                                                image={image} />
                                        </Col>
                                    )
                                })
                                :
                                gallery.map(image => {
                                    return (
                                        <Col key={image.id}>
                                            <PicturesTablePicture
                                                dateQuery={dateQuery}
                                                image={image} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </SRLWrapper>
                </Row>
            </Container>
        </>
    );
}

export default PicturesTable;