import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from 'axios';

export default function AccountRecovery() {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();
    const [email, SetEmail] = useState('');

    const changeEmail = e => {
        e.preventDefault();
        const id = Number(user.id)
        axios.put(`/api/user/${id}`, {email: email}).then(response => {
            alert('Email Changed - please login with your new Email');
            dispatch({type: "LOGOUT"})
        }).catch(e => console.log(e));
    }
    return (
        <>
            <Row className="d-flex justify-content-between mt-3 mx-1 pb-2">
                <h4>Account Email</h4>
            </Row>
            <Form onSubmit={changeEmail}>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td width="20%" className="font-weight-bold align-middle">
                                New Account Email
            </td>
                            <td className="d-flex align-middle justify-content-between border-0">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={e => SetEmail(e.target.value)}
                                ></Form.Control>
                                {email ? 
                                <Button size="sm" type="submit" variant="info">Change Email</Button> 
                                : <> </>}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Form>
        </>
    );
}