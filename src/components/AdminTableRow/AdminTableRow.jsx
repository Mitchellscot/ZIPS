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
import axios from 'axios';

function AdminTableRow({ order }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [modal, setModal] = useState(false);
    const [toggleName, setToggleName] = useState(false);
    const [toggleEmail, setToggleEmail] = useState(false);

    const deleteOrder = () => {
        axios.delete(`/api/order/delete/${order.id}`)
            .then((response) => {
                dispatch({ type: 'FETCH_ORDERS' })
            })
            .catch((error) => {
                console.log(`HEY MITCH - COULDN'T DELETE THE ORDER: ${error}`);
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
                    dispatch({ type: 'FETCH_ORDERS' })
                })
                .catch((error) => {
                    console.log(`HEY MITCH - CAN"T CHANGE THE NAME OR EMAIL: ${error}`);
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

    const store = useSelector((store) => store);
    const formatDate = (orderDate) => {
        const date = new Date(orderDate);
        const options = { month: "short", day: "numeric", year: "numeric" }
        const fd = new Intl.DateTimeFormat('en-us', options).format(date);
        return fd.toString();
    }

    return (
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
                {order.complete ? "Sent (Resend)" : "Pending"}
            </td>
            <td>
                <ButtonGroup>
                    <Button
                        onClick={editMode}
                        variant={toggleEmail ? "dark" : "outline-dark"}
                    >
                        <PencilSquare fontSize="2rem" />
                    </Button>
                    <Button
                        onClick={deleteOrder}
                        variant="outline-dark">
                        <Trash fontSize="2rem" />
                    </Button>
                    <Button variant="outline-dark">
                        <ZoomIn fontSize="2rem" />
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    );
}

export default AdminTableRow;