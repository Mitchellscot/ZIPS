import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function AccountPassword() {
    const history = useHistory();
    const user = useSelector(store => store.user)
    const dispatch = useDispatch();
    const [password1, SetPassword1] = useState('');
    const [password2, SetPassword2] = useState('');

    const changePassword = e => {
        e.preventDefault();
        const id = Number(user.id)
        axios.put(`/api/user/${id}`, {password: password2}).then(response => {
            alert('Password Changed - please login with your new password');
            dispatch({type: "LOGOUT"})
        }).catch(e => console.log(e));
    }

    return (
        <>
        <Row className="d-flex justify-content-between mt-3 mx-1 pb-2">
        <h4>Account Password</h4>
    </Row>
    <Form onSubmit={changePassword}>
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <td width="20%" className="font-weight-bold align-middle">
                        New Password
            </td>
                    <td className="d-flex align-middle justify-content-between border-0">
                        <Form.Control
                            type="password"
                            name="password1"
                            value={password1}
                            onChange={e => SetPassword1(e.target.value)}
                        ></Form.Control>
                    </td>
                </tr>
                {password1 ?
                    <tr>
                        <td width="20%" className="font-weight-bold align-middle">
                            Verify Password
                                        </td>
                        <td className="d-flex align-middle justify-content-between border-bottom-0">
                            <Form.Control
                                type="password"
                                name="password1"
                                value={password2}
                                onChange={e => SetPassword2(e.target.value)}
                            ></Form.Control>
                        </td>
                    </tr> : <> </>
                }
                {password1 && password2 ?
                    password1 === password2 ? <tr colSpan="2">
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