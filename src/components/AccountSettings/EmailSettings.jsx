import { emailConstants } from '../../_constants';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function EmailSettings({emailSettings, showEmail, toggleShowEmail }) {
    const dispatch = useDispatch();
    const [sendingEmail, setSendingEmail] = useState('');
    const [replyToEmail, setReplyToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [header, setHeader] = useState('');
    const [body, setBody] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [editMode, setEditMode] = useState(false);

    const editEmailMode = () => {
        setSendingEmail(emailSettings.source_email);
        setReplyToEmail(emailSettings.reply_to_email);
        setSubject(emailSettings.subject);
        setHeader(emailSettings.header);
        setBody(emailSettings.body);
        setBusinessName(emailSettings.business_name);
        setBusinessEmail(emailSettings.business_email);
        setBusinessWebsite(emailSettings.business_website);
        setBusinessPhone(emailSettings.business_phone);
        if (editMode === false) {
            setEditMode(!editMode);
        }
        else {
            setEditMode(!editMode);
            axios.put(`/api/emailSettings/update`, {
                source_email: sendingEmail,
                reply_to_email: replyToEmail,
                subject: subject,
                header: header,
                body: body,
                business_name: businessName,
                business_email: businessEmail,
                business_website: businessWebsite,
                business_phone: businessPhone
            })
                .then((response) => {
                    dispatch({ type: emailConstants.FETCH });
                })
                .catch((error) => {
                    console.log(`HEY MITCH - CAN'T CHANGE THE EMAIL SETTINGS: ${error}`);
                })
        }
    }

    const handleKeyPressEmail = e => {
        if (e.key === 'Enter') {
            editEmailMode();
        }
    };

    useEffect(() => {
        dispatch({ type: emailConstants.FETCH });
    }, []);

    return (
        <>
            <Row className="d-flex justify-content-between mt-3 mx-1 pb-2">
                <h4 className="mr-auto">Email Settings</h4>
                {editMode ? <Button
                    onClick={editEmailMode}
                    variant="dark"
                >Save</Button> : 
                <Button
                    onClick={editEmailMode}
                    variant="outline-dark"
                >Edit</Button>
                }
                <Button
                    onClick={toggleShowEmail}
                    variant={showEmail ? "dark" : "outline-dark"}
                >Preview</Button>
            </Row>
            <Table striped bordered hover>
                <tbody className="text-left">
                    <tr >
                        <td width="20%" className="font-weight-bold align-middle py-4">
                            Sending Email
    </td>
                        <td className="align-middle">
                            {editMode ? <Form.Control
                                className="text-left w-75"
                                onKeyPress={handleKeyPressEmail}
                                onChange={((e) => { setSendingEmail(e.target.value) })}
                                value={sendingEmail}
                                required
                            ></Form.Control> : emailSettings.source_email}
                        </td>
                    </tr>
                    <tr >
                        <td width="20%" className="font-weight-bold align-middle py-4">
                            Reply to Email
    </td>
                        <td className="align-middle">
                            {editMode ? <Form.Control

                                className="text-left align-center w-75"
                                onKeyPress={handleKeyPressEmail}
                                onChange={((e) => { setReplyToEmail(e.target.value) })}
                                value={replyToEmail}
                            ></Form.Control> : emailSettings.reply_to_email}
                        </td>
                    </tr>
                    <tr >
                        <td width="20%" className="font-weight-bold align-middle py-4">
                            Subject
    </td>
                        <td className="align-middle">
                            {editMode ? <Form.Control

                                className="text-left align-center align-middle"
                                onKeyPress={handleKeyPressEmail}
                                onChange={((e) => { setSubject(e.target.value) })}
                                value={subject}
                            ></Form.Control> : emailSettings.subject}
                        </td>
                    </tr>
                    <tr >
                        <td width="20%" className="font-weight-bold align-middle py-4">
                            Header
    </td>
                        <td className="align-middle">
                            {editMode ? <Form.Control
                                className="text-left align-center w-75"
                                onKeyPress={handleKeyPressEmail}
                                onChange={((e) => { setHeader(e.target.value) })}
                                value={header}
                            ></Form.Control> : emailSettings.header}
                        </td>
                    </tr>
                    <tr >
                        <td width="20%" className="font-weight-bold align-middle py-5">
                            Body
    </td>
                        <td>
                            {editMode ? <Form.Control
                                as="textarea"
                                className="text-left align-middle"
                                onKeyPress={handleKeyPressEmail}
                                onChange={((e) => { setBody(e.target.value) })}
                                value={body}
                            ></Form.Control> : emailSettings.body}
                        </td>
                    </tr>
                    <tr >
                        <td width="20%" className="font-weight-bold align-middle py-4">
                            Business Name
    </td>
                        <td className="align-middle">
                            {editMode ? <Form.Control
                                className="text-left align-middle"
                                onKeyPress={handleKeyPressEmail}
                                onChange={((e) => { setBusinessName(e.target.value) })}
                                value={businessName}
                            ></Form.Control> : emailSettings.business_name}
                        </td>
                    </tr>
                    <tr >
                        <td width="20%" className="font-weight-bold align-middle py-4">
                            Business Email
    </td>
                        <td className="align-middle">
                            {editMode ? <Form.Control
                                className="text-left align-middle"
                                onKeyPress={handleKeyPressEmail}
                                onChange={((e) => { setBusinessEmail(e.target.value) })}
                                value={businessEmail}
                            ></Form.Control> : emailSettings.business_email}
                        </td>
                    </tr>
                    <tr >
                        <td width="20%" className="font-weight-bold align-middle py-4">
                            Business Website
    </td>
                        <td className="align-middle">
                            {editMode ? <Form.Control
                                className="text-left align-middle"
                                onKeyPress={handleKeyPressEmail}
                                onChange={((e) => { setBusinessWebsite(e.target.value) })}
                                value={businessWebsite}
                            ></Form.Control> : emailSettings.business_website}
                        </td>
                    </tr>
                    <tr >
                        <td width="20%" className="font-weight-bold align-middle py-4">
                            Business Phone
    </td>
                        <td className="align-middle">
                            {editMode ? <Form.Control
                                className="text-left align-middle"
                                onKeyPress={handleKeyPressEmail}
                                onChange={((e) => { setBusinessPhone(e.target.value) })}
                                value={businessPhone}
                            ></Form.Control> : emailSettings.business_phone}
                        </td>
                    </tr>
                </tbody>
            </Table>
    </>
    );
}

export default EmailSettings;