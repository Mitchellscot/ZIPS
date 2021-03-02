import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AdminTableRow.css';
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons';
import { ZoomIn } from 'react-bootstrap-icons';
import { Envelope } from 'react-bootstrap-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import swal from 'sweetalert';
import OrderTablePhotos from '../OrderTablePhotos/OrderTablePhotos';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'
import {check2Circle} from 'react-bootstrap-icons'
import * as Icon from 'react-bootstrap-icons';

//RENAME TO OrderTableRow
function AdminTableRow({ order }) {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [modal, setModal] = useState(false);
    const [toggleName, setToggleName] = useState(false);
    const [toggleEmail, setToggleEmail] = useState(false);

    const handleShowModal = () => {
        setModal(!modal);
    }

    const deleteOrder = () => {
        swal({
            title: "Are you sure?",
            text: `You are about to delete ${order.name}'s order... u sho 'bout dat? `,
            icon: "warning",
            dangerMode: true,
            button: "DELETE IT"
        })
            .then(willDelete => {
                if (willDelete) {
                    axios.delete(`/api/order/delete/${order.id}`)
                        .then((response) => {
                            dispatch({ type: 'FETCH_ORDERS' })
                        })
                        .catch((error) => {
                            console.log(`HEY MITCH - COULDN'T DELETE THE ORDER: ${error}`);
                        })
                }
                else return;
            });
    }

    const sendEmails = () => {
        swal({
            title: `Email ${order.name}?`,
            text: `You are about to send an email to ${order.email} - Are you sure about that?`,
            icon: "warning",
            dangerMode: true,
            button: "SEND IT"
        })
        .then(willSend=> {
            if (willSend){
                let newEmail = {
                    name: order.name,
                    email: order.email,
                    images: order.array_agg,
                    total: order.total,
                    orderId: order.id
                }
                dispatch({type: 'SEND_EMAIL', payload: newEmail});
                axios.put(`/api/order/completed/${order.id}`).then((response)=>{
                    dispatch({ type: 'FETCH_ORDERS' });
                }).catch((error) => {
                    console.log(`HEY MITCH - CAN'T SET ORDER AS COMPLETED: ${error}`);
                });
            }
            else return;
        })
    }

    const editMode = () => {
        setName(order.name);
        setEmail(order.email);
        if (toggleName && toggleEmail === false) {
            setToggleEmail(!toggleEmail);
            setToggleName(!toggleName);
        }
        else {
            setToggleEmail(!toggleEmail);
            setToggleName(!toggleName);
            axios.put(`/api/order/update/${order.id}`, { name: name, email: email })
                .then((response) => {
                    dispatch({ type: 'FETCH_ORDERS' });
                })
                .catch((error) => {
                    console.log(`HEY MITCH - CAN'T CHANGE THE NAME OR EMAIL: ${error}`);
                })
        }
    }
    //for editing the name and email fields 
    //completes the edit by pressing the enter key
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            editMode();
        }
    };
    const formatDate = (orderDate) => {
        const date = new Date(orderDate);
        const options = { month: "numeric", day: "numeric", year: "numeric" }
        const fd = new Intl.DateTimeFormat('en-us', options).format(date);
        return fd.toString();
    }
//TODO: put the modal in it's own component
    return (
        <>
            <Modal
                size="lg"
                show={modal}
                onHide={() => setModal(!modal)}
                backdrop="static"
                id="modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center">
                        <h1>Pictures From {order.name}'s Order</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalTitle">
                    <Carousel>
                        {order.array_agg.map((image, i) => {
                            return (
                                <Carousel.Item key={i}>
                                    <OrderTablePhotos image={image} />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Modal.Body>
            </Modal>
            <tr>
                <td>
                    {formatDate(order.order_date)}
                </td>
                <td>
                    {toggleName ? <Form.Control
                        onKeyPress={handleKeypress}
                        onChange={((e) => { setName(e.target.value) })}
                        value={name}
                    ></Form.Control> : order.name}
                </td>
                <td className="text-center">
                    {toggleEmail ? <Form.Control
                        onKeyPress={handleKeypress}
                        onChange={((e) => { setEmail(e.target.value) })}
                        value={email}
                    ></Form.Control> : order.email}
                </td>
                <td>
                    {order.complete ? 
                    <Badge pill variant="success">
                        Sent    <Icon.Check2Circle />
                    </Badge>
                    : <Badge pill variant="warning">
                    Pending <Envelope />
                </Badge>}
                </td>
                <td>
                    <ButtonGroup>
                        <Button variant="outline-dark">
                            <Envelope
                            onClick={sendEmails}
                            variant={order.complete ? "outline-dark" : "secondary"}
                            fontSize="2rem" />
                        </Button>
                        <Button
                            onClick={editMode}
                            variant={toggleEmail ? "dark" : "outline-dark"}
                        >
                            <PencilSquare fontSize="2rem" />
                        </Button>
                        <Button variant={modal ? "dark" : "outline-dark"}>
                            <ZoomIn
                                onClick={() => {
                                    handleShowModal()
                                }}
                                fontSize="2rem" />
                        </Button>
                        <Button
                            onClick={deleteOrder}
                            variant="outline-dark">
                            <Trash fontSize="2rem" />
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        </>
    );
}

export default AdminTableRow;