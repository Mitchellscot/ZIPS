import "./PicturesTablePicture.css";
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import swal from 'sweetalert';
import axios from 'axios';

function PicturesTablePicture({ image, dateQuery }) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    //This isn't setting show to the opposite of what it is, like it should... fix it in the morning.
    const handleShowImage = () => {
        setShow(!show);
        console.log(`Here is local state "show" ${show}`);
        axios.put(`/api/image/show/${image.id}`, {show: show}).then((response)=>{
            if (dateQuery !== '') {
                dispatch({ type: 'RESET_IMAGES' });
                dispatch({ type: "SEARCH_IMAGE_DATES", payload: dateQuery });
            }
            else {
                dispatch({ type: 'RESET_IMAGES' });
                dispatch({ type: 'FETCH_GALLERY' })
            }
        }).catch((error) => {
            console.log(`HEY MITCH - CAN'T SHOW THE IMAGE: ${error}`);
        });
    }
    //HEY MITCHELL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//You have to test this and see if you delete an image from another day if it reloads property!!
    const handleDelete = () => {
        swal({
            title: "Are you sure?",
            text: `You are about to delete this image... u sho 'bout dat? `,
            icon: "error",
            dangerMode: true,
            button: "DELETE IT"
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.delete(`/api/image/delete/${image.id}`)
                        .then((response) => {
                            if (dateQuery !== '') {
                                dispatch({ type: 'RESET_IMAGES' });
                                dispatch({ type: "SEARCH_IMAGE_DATES", payload: dateQuery });
                            }
                            else {
                                dispatch({ type: 'RESET_IMAGES' });
                                dispatch({ type: 'FETCH_GALLERY' })
                            }
                        })
                        .catch((error) => {
                            console.log(`HEY MITCH - COULDN'T DELETE THE IMAGE: ${error}`);
                        })
                }
                else return;
            });
    }

    const formatTime = (imageTime) => {
        const time = new Date(imageTime);
        const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" }
        const fd = new Intl.DateTimeFormat('en-us', options).format(time);
        return fd.toString();
    }

    return (
        <Card className="shadow mb-3 bg-white rounded card">
            <a href={image.url}>
                <Card.Img variant="top" src={image.url} alt={formatTime(image.created)} min-height="256px" min-width="320px" />
            </a>
            <Card.Body className="d-flex justify-content-between align-items-center">
                <Card.Subtitle className="mb-2 text-muted align-self-end"><b>{formatTime(image.created)}</b></Card.Subtitle>
                <ButtonGroup size="sm">
                    <Button
                        variant={image.show ? "dark" : "outline-dark"}
                        onClick={handleShowImage}
                        type="button">
                        {image.show ? <span>Hide</span> : <span>Show</span>}
                    </Button>
                    <Button variant="outline-danger"
                        onClick={handleDelete}
                        type="button"
                    >Delete
                </Button>
                </ButtonGroup>
            </Card.Body>
        </Card>
    );
}
export default PicturesTablePicture;