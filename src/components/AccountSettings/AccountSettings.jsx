import './AccountSettings.css';
import {useEffect, useSelector} from 'react';
import {useDispatch} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {Pencil, PencilFill} from 'react-bootstrap-icons'

function AccountSettings() {
    const dispatch = useDispatch();

    useEffect({
        
    },[]);

    return (
        <Container>
            <Col className="">
            <h4>Email Settings</h4>
            <Table bordered>
                <tbody>
                    <tr >
                    <td width="20%" class="font-weight-bold">
                        Sending Email
                    </td>
                    <td >
                        bztinfo@ziplinemn.com
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" class="font-weight-bold">
                        Reply to Email
                    </td>
                    <td>
                        mscott@ziplinemn.com
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" class="font-weight-bold">
                        Subject
                    </td>
                    <td>
                        Thank you for your order!
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" class="font-weight-bold">
                        Body
                    </td>
                    <td>
                        Here is the body of the email
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>

                </tbody>
            </Table>
            </Col>
            <Col>
            
            </Col>
        </Container >
    );
}

export default AccountSettings;