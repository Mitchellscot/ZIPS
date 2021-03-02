import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EmailTableRow.css';
import EmailTablePhotos from '../EmailTablePhotos/EmailTablePhotos';
import EmailTableEmail from '../EmailTableEmail/EmailTableEmail';
import { ZoomIn } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

function EmailTableRow({ email }) {
    const dispatch = useDispatch();
    const [photoModal, setPhotoModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);

    const handlePhotoModal = () => {
        setPhotoModal(!photoModal);
    }
    const handleEmailModel = () =>{
        setEmailModal(!emailModal);
    }

    const formatDate = (emailDate) => {
        const date = new Date(emailDate);
        const options = { month: "short", day: "numeric", year: "numeric" }
        const fd = new Intl.DateTimeFormat('en-us', options).format(date);
        return fd.toString();
    }
//TODO: put the modal in it's own component
    return (
        <>
            <Modal
                size="lg"
                show={photoModal}
                onHide={() => setPhotoModal(!photoModal)}
                backdrop="static"
                id="photo-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center">
                        <h1>Pictures From {email.name}'s Order</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {email.array_agg.map((image, i) => {
                            return (
                                <Carousel.Item key={i}>
                                    <EmailTablePhotos image={image} />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={emailModal}
                onHide={() => setEmailModal(!emailModal)}
                backdrop="static"
                id="email-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center">
                        <h1>Email sent to {email.name}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        <EmailTableEmail message={email.email_text} />
                    </Carousel>
                </Modal.Body>
            </Modal>
            <tr>
                <td>
                    {formatDate(email.date_sent)}
                </td>
                <td>
                    {email.name}
                </td>
                <td>
                    {email.email_address}
                </td>
                <td>
                    {email.total}
                </td>
                <td>
                <Button variant={emailModal ? "dark" : "outline-dark"}>
                            <ZoomIn
                                onClick={() => {
                                    handleEmailModel()
                                }}
                                fontSize="2rem" />
                        </Button>    
                </td>
                <td>
                <Button variant={photoModal ? "dark" : "outline-dark"}>
                            <ZoomIn
                                onClick={() => {
                                    handlePhotoModal()
                                }}
                                fontSize="2rem" />
                        </Button>
                </td>
            </tr>
        </>
    );
}

export default EmailTableRow;