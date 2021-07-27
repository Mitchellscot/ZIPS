import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from 'axios';

export default function AccountPasswordGuest() {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();
    const [guestPassword1, SetGuestPassword1] = useState('');
    const [guestPassword2, SetGuestPassword2] = useState('');

    const changeGuestPassword = e => {
        e.preventDefault();
        axios.put(`/api/user/2`, {password: guestPassword2}).then(response => {
            alert('Password Changed!')
        }).then(() => {SetGuestPassword1(''); SetGuestPassword2('');}).catch(e => console.log(e));
    }

    return (
        <>
        <Row className="d-flex justify-content-between mt-3 mx-1 pb-2">
        <h4>Guest Password</h4>
    </Row>
    <Form onSubmit={changeGuestPassword}>
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <td width="20%" className="font-weight-bold align-middle">
                        New Guest Password
            </td>
                    <td className="d-flex align-middle justify-content-between border-0">
                        <Form.Control
                            type="password"
                            name="guestpassword1"
                            value={guestPassword1}
                            onChange={e => SetGuestPassword1(e.target.value)}
                        ></Form.Control>
                    </td>
                </tr>
                {guestPassword1 ?
                    <tr>
                        <td width="20%" className="font-weight-bold align-middle">
                            Verify Password
                                        </td>
                        <td className="d-flex align-middle justify-content-between border-bottom-0">
                            <Form.Control
                                type="password"
                                name="guestpassword2"
                                value={guestPassword2}
                                onChange={e => SetGuestPassword2(e.target.value)}
                            ></Form.Control>
                        </td>
                    </tr> : <> </>
                }
                {guestPassword1 && guestPassword2 ?
                    guestPassword1 === guestPassword2 ? <tr colSpan="2">
                        <td width="20%" className="font-weight-bold align-middle">
                            Password Match!
            </td>
                        <td className="d-flex align-middle justify-content-center border-bottom-0">
                            <Button type="submit" variant="info">Change Password</Button>
                        </td>
                    </tr> : <tr colSpan="2">
                        <td width="20%" className="font-weight-bold align-middle">
                            Password Match?
            </td>
                        <td className="d-flex align-middle justify-content-center border-bottom-0">
                            Passwords don't match...
                        </td>
                    </tr>
                    :
                    <> </>
                }
            </tbody>
        </Table>
    </Form>
    </>
    );
}