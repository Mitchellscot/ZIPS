import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EmailTableRow.css';
import EmailTablePhotos from '../EmailTablePhotos/EmailTablePhotos';
import EmailTableEmail from '../EmailTableEmail/EmailTableEmail';
import { Images, EnvelopeOpen } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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
        const options = { month: "numeric", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" }
        const fd = new Intl.DateTimeFormat('en-us', options).format(date);
        return fd.toString();
    }

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

            <EmailTableEmail 
            emailModal={emailModal}
            setEmailModal={setEmailModal}
            email={email}
            />

            <tr>
                <td className="align-middle text-center">
                    {formatDate(email.date_sent)}
                </td>
                <td className="align-middle text-center">
                    {email.name}
                </td>
                <td className="align-middle text-center">
                    {email.email_address}
                </td>
                <td className="align-middle text-center">
                    {email.total}
                </td>
                <td>
                    <ButtonGroup>
                <Button variant={emailModal ? "dark" : "outline-dark"}>
                            <EnvelopeOpen
                                onClick={() => {
                                    handleEmailModel()
                                }}
                                fontSize="2rem" />
                        </Button>    
                <Button variant={photoModal ? "dark" : "outline-dark"}>
                            <Images
                                onClick={() => {
                                    handlePhotoModal()
                                }}
                                fontSize="2rem" />
                        </Button>
                        </ButtonGroup>
                </td>
            </tr>
        </>
    );
}

export default EmailTableRow;