import './AccountSettings.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Pencil, PencilFill } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function AccountSettings() {
    const dispatch = useDispatch();
    const emailSettings = useSelector(store => store.emailSettings);
    //all the state to hold the changes
    const [sendingEmail, setSendingEmail] = useState('');
    const [replyToEmail, setReplyToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [header, setHeader] = useState('');
    const [body, setBody] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    //If this works delete all comments at end of file.
    const [editMode, setEditMode] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const toggleShowEmail = () => {
        setShowEmail(!showEmail);
    }
    const editEmailMode = () => {
        //take out if it causes bugs
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
                    dispatch({ type: 'FETCH_EMAIL_SETTINGS' });
                })
                .catch((error) => {
                    console.log(`HEY MITCH - CAN'T CHANGE THE EMAIL SETTINGS: ${error}`);
                })
        }
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            editEmailMode();
        }
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_EMAIL_SETTINGS' })
    }, []);

    return (
        <>
            <Col className="" lg={6} md={6}>
                <Tabs defaultActiveKey="accountSettings">
                    <Tab eventKey="accountSettings" title="Account">
                        <h1>Hi</h1>
                    </Tab>
                    <Tab eventKey="emailSettings" title="Email">
                        <Row className="d-flex justify-content-between mt-3 mx-1 pb-2">
                            <h4 className="mr-auto">Email Settings</h4><Button
                                onClick={editEmailMode}
                                variant={editMode ? "dark" : "outline-dark"}
                            >Edit</Button>
                            <Button
                                onClick={toggleShowEmail}
                                variant={showEmail ? "dark" : "outline-dark"}
                            >Preview</Button>
                        </Row>
                        <Table striped bordered hover>
                            <tbody className="text-left">
                                <tr >
                                    <td width="20%" className="font-weight-bold align-middlepy-4">
                                        Sending Email
                    </td>
                                    <td className="align-middle">
                                        {editMode ? <Form.Control

                                            className="text-left w-75"
                                            onKeyPress={handleKeypress}
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
                                            onKeyPress={handleKeypress}
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
                                            onKeyPress={handleKeypress}
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
                                            onKeyPress={handleKeypress}
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
                                            onKeyPress={handleKeypress}
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
                                            onKeyPress={handleKeypress}
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
                                            onKeyPress={handleKeypress}
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
                                            onKeyPress={handleKeypress}
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
                                            onKeyPress={handleKeypress}
                                            onChange={((e) => { setBusinessPhone(e.target.value) })}
                                            value={businessPhone}
                                        ></Form.Control> : emailSettings.business_phone}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </Col>
            <Col lg={6} md={4} className="d-flex justify-content-center mt-5">
                <Table className={showEmail ? "visible border" : "invisible"}>
                    <thead>
                        <tr>
                            <td className="font-weight-bold text-right" width="15%">
                                From:
                        </td>
                            <td className="text-left align-center">
                                {emailSettings.source_email}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold text-right" width="5%">
                                Reply To:
                        </td>
                            <td className="text-left align-center">
                                {emailSettings.reply_to_email}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold text-right" width="5%">
                                Subject:
                        </td>
                            <td className="text-left align-center">
                                {emailSettings.subject}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-left">
                            <td colSpan="2">
                                <h4>{emailSettings.header}</h4>
                                <p className="text-left">{emailSettings.body}</p>
                                <ul>
                                    <li>Click here to download your photo</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <p className="text-left">{emailSettings.business_name}</p>
                                <p className="text-left">{emailSettings.business_email}</p>
                                <p className="text-left">{emailSettings.business_website}</p>
                                <p className="text-left">{emailSettings.business_phone}</p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </>
    );
}

export default AccountSettings;