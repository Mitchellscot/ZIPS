import './AccountSettings.css';
import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {Pencil, PencilFill} from 'react-bootstrap-icons'

function AccountSettings() {
    const dispatch = useDispatch();
    const emailSettings = useSelector(store => store.emailSettings)
    useEffect(()=>{
        dispatch({type: 'FETCH_EMAIL_SETTINGS'})
    },[]);

    return (
        <Container>
            <Col className="">
            <h4>Email Settings</h4>
            <Table bordered>
                <tbody className="text-left">
                    <tr >
                    <td width="20%" className="font-weight-bold">
                        Sending Email
                    </td>
                    <td >
                        {emailSettings.source_email}
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" className="font-weight-bold">
                        Reply to Email
                    </td>
                    <td>
                    {emailSettings.reply_to_email}
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" className="font-weight-bold">
                        Subject
                    </td>
                    <td>
                    {emailSettings.subject}
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" className="font-weight-bold">
                        Header
                    </td>
                    <td>
                    {emailSettings.header}
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" className="font-weight-bold">
                        Body
                    </td>
                    <td>
                    {emailSettings.body}
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" className="font-weight-bold">
                        Business Name
                    </td>
                    <td>
                    {emailSettings.business_name}
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" className="font-weight-bold">
                        Business Email
                    </td>
                    <td>
                    {emailSettings.business_email}
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" className="font-weight-bold">
                        Business Website
                    </td>
                    <td>
                    {emailSettings.business_website}
                        &nbsp;&nbsp;<Pencil />
                    </td>
                    </tr>
                    <tr >
                    <td width="20%" className="font-weight-bold">
                        Business Phone
                    </td>
                    <td>
                    {emailSettings.business_website}
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