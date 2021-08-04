import './PicturesTable.css';
import { galleryConstants } from '../../_constants';
import PictureTableInstructions from './PictureTableInstructions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { SRLWrapper } from "simple-react-lightbox";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PicturesTablePicture from './PicturesTablePicture';
import { QuestionCircle } from "react-bootstrap-icons";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { setTodaysDate } from '../../_actions';

const options = {
    settings: {
        autoplaySpeed: 4000,
        slideAnimationType: 'both'
    },
    buttons: {
        backgroundColor: 'rgba(30,30,36,0.8)',
        iconColor: 'rgba(255, 255, 255, 0.8)',
        iconPadding: '10px',
        showDownloadButton: false,
        size: '60px',
        showAutoplayButton: false,
        showThumbnailsButton: false
    },
    caption: {
        showCaption: false
    },
    thumbnails: {
        showThumbnails: false
    }
}

function PicturesTable() {
    const history = useHistory();
    const dispatch = useDispatch();
    const shownImages = useSelector(store => store.gallery.shownImagesReducer.pageOfImages);
    const shownPager = useSelector(store => store.gallery.shownImagesReducer.pager);
    const pictures = useSelector(store => store.gallery.picturePageReducer.pageOfPictures);
    const Pager = useSelector(store => store.gallery.picturePageReducer.pager);
    const searchDate = useSelector(store => store.gallery.picturePageReducer.date);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const params = new URLSearchParams(document.location.search);
    const page = parseInt(params.get('page'));
    const [showMode, setShowMode] = useState(false);
    const toggleShowMode = () => {
        setShowMode(!showMode);
    }

    const setShownImagesToFalse = () => {
        if (shownImages != undefined) {
            shownImages.map(image => {
                const params = new URLSearchParams(document.location.search);
                params.set('page', 1);
                axios.put(`/api/image/show/${image.id}`, { show: !image.show }).then((response) => {
                    dispatch({ type: galleryConstants.RESET_SHOWN });
                    dispatch({ type: galleryConstants.SET_PICTURES });
                    dispatch({ type: galleryConstants.FETCH_SHOWN, payload: { q: searchDate, page: page } });
                    setShowMode(false);
                }).catch(error => { console.log(`HEY MITCH - COULDN'T SET ALL SHOWN IMAGES TO FALSE`) });
            })
        }
    }

    const handleSearch = () => {
        history.push('?page=1');
        setShowMode(false);
        let dateQ = document.getElementById("picture-search-date").value;
        if (dateQ === '') {
            alert('Please enter a date or press the today button to view today\'s images');
        }
        else {
            dispatch({ type: galleryConstants.FETCH_PICTURES, payload: { q: dateQ, page: page } });
        }
    }

    const getTodaysImages = () => {
        document.getElementById("picture-search-date").value = setTodaysDate();
        setShowMode(false);
        dispatch({ type: galleryConstants.FETCH_PICTURES, payload: { q: setTodaysDate(), page: page } });
    };

    const handlePageChange = () => {
        const params = new URLSearchParams(document.location.search);
        const page = parseInt(params.get('page'));
        if(!showMode){
            if (page !== Pager.currentPage) {
                dispatch({ type: galleryConstants.FETCH_PICTURES, payload: { q: searchDate, page: page } });
            }
        }
        else{
            if (page !== shownPager.currentPage) {
                dispatch({ type: galleryConstants.FETCH_PICTURES, payload: { q: searchDate, page: page } });
            }
        }
    }

    useEffect(() => {
        dispatch({ type: galleryConstants.FETCH_SHOWN, payload: { q: searchDate, page: page } });
    }, []);

    return (
        <>
            <PictureTableInstructions
                showModal={showModal}
                handleCloseModal={handleCloseModal}
            />
            <Container fluid>
                <Row className="pb-3">
                    <Col className="d-flex flex-nowrap align-items-center justify-content-around">
                        <InputGroup className="input-group-md">
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
                        {<h4
                            className={shownPager.totalItems === 0 ? "invisible gallery-image-count-text" : "visible gallery-image-count-text"}
                        >{"IMAGES IN GALLERY: " + shownPager.totalItems}</h4>}
                    </Col>
                    <Col className="text-center d-flex justify-content-end">
                        <Button size="md"
                            className="mr-3"
                            onClick={toggleShowMode}
                            variant={showMode ? "dark" : "outline-dark"}
                        >All Shown</Button>
                        <Button size="md"
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
                <SRLWrapper options={options}>
                    <Col className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 px-2">
                        {showMode ?
                            shownImages != undefined ? shownImages.map(image => {
                                return (
                                    <Col key={image.id}>
                                        <PicturesTablePicture
                                            image={image}
                                            searchDate={searchDate}
                                        />
                                    </Col>
                                )
                            }) : <span> </span>
                            :
                            pictures != undefined ? pictures.map(image => {
                                return (
                                    <Col key={image.id}>
                                        <PicturesTablePicture
                                            image={image}
                                            searchDate={searchDate}
                                        />
                                    </Col>
                                )
                            }) : <span> </span>
                        }
                    </Col>
                </SRLWrapper>
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
                    {/*Show Mode Pagination */}
                {shownPager.totalPages > 1 && showMode ?
                    <ul className="pagination">
                        <li onClick={handlePageChange}
                            className={`page-item first-item ${shownPager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                        </li>
                        <li onClick={handlePageChange}
                            className={`page-item previous-item ${shownPager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${shownPager.currentPage - 1}` }} className="page-link" >Previous</Link>
                        </li>
                        {shownPager.pages.map(page =>
                            <li key={page} className={`page-item number-item ${shownPager.currentPage === page ? 'active' : ''}`} onClick={handlePageChange}>
                                <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                            </li>
                        )}
                        <li onClick={handlePageChange}
                            className={`page-item next-item ${shownPager.currentPage === shownPager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${shownPager.currentPage + 1}` }} className="page-link">Next</Link>
                        </li>
                        <li onClick={handlePageChange}
                            className={`page-item last-item ${shownPager.currentPage === shownPager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${shownPager.totalPages}` }} className="page-link">Last</Link>
                        </li>
                    </ul>
                    : <> </>}
            </Container>

        </>
    );
}

export default PicturesTable;