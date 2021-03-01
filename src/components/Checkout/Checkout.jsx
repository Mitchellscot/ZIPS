import './Checkout.css'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import swal from 'sweetalert';
import { Circle, Check2Circle, XCircle } from 'react-bootstrap-icons';

function Checkout({ modal, setModal, total }) {

    const cart = useSelector(store => store.cart);
    const dispatch = useDispatch();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleCloseModal = () => {
        setModal(false);
        setName('');
        setEmail('');
      }
    const handleSubmit = event => {
        swal({
            title: "Thank you!",
            text: `Please pay at the front desk to recieve your photos!`,
            icon: "success",
            dangerMode: false,
            buttons: false,
            timer: 2500
        })
        event.preventDefault();
        const imageIds = [];
        for (let image of cart) {
            imageIds.push(image.id);
        }
        let newOrder = {
            name: name,
            email: email,
            total: total,
            images: imageIds
        }
        dispatch({ type: "ADD_ORDER", payload: newOrder });
        dispatch({ type: 'CLEAR_CART' });
        handleCloseModal();
    }

    return (
        <Modal
            size="lg"
            show={modal}
            onHide={() => setModal(false)}
            backdrop="static"
            id="modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="modalTitle">
                    <h1>Instructions</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid>
                    <Row>
                        <Col md={9}>
                            {/*TODO - Change the numbers to checkmarks representing progress, so 1st is checked*/}
                            <p>{Object.keys(cart).length === 0 ?
                                <XCircle
                                    color="red"
                                    fontSize="1.2rem" /> :
                                <Check2Circle
                                    color="green"
                                    fontSize="1.2rem" />
                            }
                                  Select your photos</p>
                            <p>
                                {email === "" ?
                                    <Circle
                                    color="royalblue"
                                    fontSize="1.2rem"
                                />
                                    : 
                                    <Check2Circle
                                        color="green"
                                        fontSize="1.2rem" />
                                }
                                 Enter your name and Email</p>
                            <p><Circle
                                color="royalblue"
                                fontSize="1.2rem"
                            /> Pay at the register </p>
                            <p><Circle
                                color="royalblue"
                                fontSize="1.2rem"
                            /> Check your email to download your photos!</p>
                        </Col>
                        <Col md={3}>
                            TOTAL PRICE
            <h1><span>${Object.keys(cart).length === 0 ? "0.00" : total}</span></h1>
                        </Col>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <Form.Row>
                            <Col md={6}>
                                <Form.Control
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name" required />
                            </Col>
                            <Col md={6}>
                                <Form.Control
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email" required />
                            </Col>
                        </Form.Row>
                        <Row>
                            <Col lg={9}>
                                <Button variant="dark" onClick={handleCloseModal}>Close</Button>
                            </Col>
                            <Col lg={3}>
                                <Button
                                    type="submit"
                                    variant="secondary">Purchase Photos!</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    );

}

export default Checkout;