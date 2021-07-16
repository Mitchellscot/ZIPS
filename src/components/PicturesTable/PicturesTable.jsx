import './PicturesTable.css';
import PictureTableInstructions from '../PictureTableInstructions/PictureTableInstructions';
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
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


function PicturesTable() {
    const history = useHistory();
    const dispatch = useDispatch();
    const shownImages = useSelector(store => store.gallery.shownImagesReducer);
    const pictures = useSelector(store => store.gallery.picturePageReducer.pageOfPictures);
    const Pager = useSelector(store => store.gallery.picturePageReducer.pager);
    const searchDate = useSelector(store => store.gallery.picturePageReducer.date);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const params = new URLSearchParams(document.location.search);
    const page = parseInt(params.get('page'));
    //"show mode" means it's showing all images where show=true, instead of the standard gallery
    const [showMode, setShowMode] = useState(false);
    const toggleShowMode = () => {
        setShowMode(!showMode);
    }

    const setTodaysDate = () => {
        let day = new Date();
        let dd = day.getDate()
        let mm = day.getMonth() + 1;
        let yyyy = day.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return yyyy + "-" + mm + "-" + dd;

    }
    const setShownImagesToFalse = () => {
        shownImages.map(image => {
            axios.put(`/api/image/show/${image.id}`, { show: !image.show }).then((response) => {
                dispatch({ type: 'RESET_SHOWN_IMAGES' });
                dispatch({ type: 'RESET_PICTURES' });
                setShowMode(false);
            }).catch(error => { console.log(`HEY MITCH - COULDN'T SET ALL SHOWN IMAGES TO FALSE`) });
        })
    }

    const getNumberOfShown = (images) => {
        return images.length;
    }

    const handleSearch = () => {
        history.push('?page=1');
        setShowMode(false);
        let dateQ = document.getElementById("picture-search-date").value;
        if (dateQ === '') {
            alert('Please enter a date or press the today button to view today\'s images');
        }
        else {
            //dispatch({ type: 'RESET_IMAGES' });
            dispatch({ type: "FETCH_PICTURES", payload: { q: dateQ, page: page } });
        }
    }

    const getTodaysImages = () => {
        document.getElementById("picture-search-date").value = setTodaysDate();
        setShowMode(false);
        dispatch({ type: "FETCH_PICTURES", payload: { q: setTodaysDate(), page: page } });
    };

    const handlePageChange = () => {
        const params = new URLSearchParams(document.location.search);
        const page = parseInt(params.get('page'));
        if (page !== Pager.currentPage) {
            dispatch({ type: "FETCH_PICTURES", payload: { q: searchDate, page: page } });
        }
    }

/*     useEffect(() => {

    }, []); */

    return (
        <>
            <PictureTableInstructions
                showModal={showModal}
                handleCloseModal={handleCloseModal}
            />
            <Container fluid>
                <Row className="pb-3">
                    <Col className="d-flex flex-nowrap align-items-center justify-content-around">
                        <InputGroup className="input-group-md w-75">
                            <InputGroup.Text id="input-date-text"
                            >
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
                            onClick={() => getTodaysImages()}
                            variant="outline-dark">Today</Button>
                    </Col>
                    <Col className="text-center d-flex justify-content-around">
                        <h4
                            className={getNumberOfShown(shownImages) === 0 ? "invisible gallery-image-count-text" : "visible gallery-image-count-text"}
                        >{"IMAGES IN GALLERY: " + getNumberOfShown(shownImages)}</h4>
                    </Col>
                    <Col className="text-center d-flex justify-content-end">
                        <Button
                            className="mr-3"
                            onClick={toggleShowMode}
                            variant={showMode ? "dark" : "outline-dark"}
                        >All Shown</Button>
                        <Button
                            onClick={setShownImagesToFalse}
                            variant="outline-dark">Hide All</Button>
                        <QuestionCircle
                            className="ml-5 mr-4"
                            type="button"
                            onClick={handleShowModal}
                            fontSize="2rem"
                            variant="outline-dark"></QuestionCircle>
                    </Col>
                </Row>
                <Row>
                    <SRLWrapper>
                        <Row className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 px-3">
                            {showMode ?
                                shownImages != undefined ? shownImages.map(image => {
                                    return (
                                        <Col key={image.id}>
                                            <PicturesTablePicture
                                                image={image} />
                                        </Col>
                                    )
                                }) : <span> </span>
                                :
                                pictures != undefined ? pictures.map(image => {
                                    return (
                                        <Col key={image.id}>
                                            <PicturesTablePicture
                                                image={image}
                                            />
                                        </Col>
                                    )
                                }) : <span> </span>
                            }
                        </Row>
                    </SRLWrapper>
                </Row>
                {Pager.totalPages > 1 && !showMode ?
                    <ul className="pagination">
                        <li onClick={handlePageChange}
                            className={`page-item first-item ${Pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                        </li>
                        <li onClick={handlePageChange}
                            className={`page-item previous-item ${Pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${Pager.currentPage - 1}` }} className="page-link" >Previous</Link>
                        </li>
                        {Pager.pages.map(page =>
                            <li key={page} className={`page-item number-item ${Pager.currentPage === page ? 'active' : ''}`} onClick={handlePageChange}>
                                <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                            </li>
                        )}
                        <li onClick={handlePageChange}
                            className={`page-item next-item ${Pager.currentPage === Pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${Pager.currentPage + 1}` }} className="page-link">Next</Link>
                        </li>
                        <li onClick={handlePageChange}
                            className={`page-item last-item ${Pager.currentPage === Pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${Pager.totalPages}` }} className="page-link">Last</Link>
                        </li>
                    </ul>
                    : <> </>}
            </Container>

        </>
    );
}

export default PicturesTable;