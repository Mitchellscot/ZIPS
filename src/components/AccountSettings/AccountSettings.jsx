import './AccountSettings.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Pencil, PencilFill, Image, ImageFill } from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function AccountSettings() {
    const dispatch = useDispatch();
    const emailSettings = useSelector(store => store.emailSettings);
    const cost = useSelector(store => store.cost);
    //cost and tax state
    const [photoCost, setPhotoCost] = useState(0);
    const [tax, setTax] = useState(0);
    const [editCostMode, setEditCostMode] = useState(false);
    const toggleEditCostMode = () => {
        setEditCostMode(!editCostMode);
    }
    const [editTaxMode, setEditTaxMode] = useState(false);
    const toggleEditTaxMode = () => {
        setEditTaxMode(!editTaxMode);
    }
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
    //handle edit mode for email settings
    const [editMode, setEditMode] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const toggleShowEmail = () => {
        setShowEmail(!showEmail);
    }

    const handleEditCostMode = () =>{
        setPhotoCost(cost[0].cost);
        if (editCostMode === false){
            setEditCostMode(!editCostMode);
        }
        else{
            setEditCostMode(!editCostMode);
            axios.put(`/api/cost/updateCost`, {
                cost: photoCost
            })
            .then((response) => {
                dispatch({ type: 'FETCH_COST' });
            })
            .catch((error) => {
                console.log(`HEY MITCH - CAN'T CHANGE THE COST OF THE PICTURES: ${error}`);
            })
        }
    }

    //change the tax when pencil is clicked
    const handleEditTaxMode = () =>{
        setTax(cost[0].tax);
        if (editTaxMode === false){
            setEditTaxMode(!editTaxMode);
        }
        else{
            setEditTaxMode(!editTaxMode);
            axios.put(`/api/cost/updateTax`, {
                tax: tax
            })
            .then((response) => {
                dispatch({ type: 'FETCH_COST' });
            })
            .catch((error) => {
                console.log(`HEY MITCH - CAN'T CHANGE THE TAX: ${error}`);
            })
        }
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

    const handleKeyPressTax = e => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            handleEditTaxMode();
        }
    };

    const handleKeyPressCost = e => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            handleEditCostMode();
        }
    };

    const handleKeyPressEmail = e => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            editEmailMode();
        }
    };

    useEffect(() => {
        dispatch({type: 'FETCH_COST'});
        dispatch({ type: 'FETCH_EMAIL_SETTINGS' });
    }, []);

    return (
        <>
            <Col className="" lg={6} md={6}>
                <Tabs defaultActiveKey="accountSettings">
                    <Tab eventKey="accountSettings" title="Account">
                        <Row className="d-flex justify-content-between mt-3 mx-1 pb-2">
                            <h4>Account Settings</h4>
                        </Row>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                <td width="20%" className="font-weight-bold align-middle">
                                    Picture Price
                                </td>
                                <td className="d-flex align-middle justify-content-between">
                                    {editCostMode ? <> <Form.Control
                                        className="text-left w-25"
                                        onKeyPress={handleKeyPressCost}
                                        onChange={((e) => { setPhotoCost(e.target.value) })}
                                        value={photoCost}
                                        required
                                    ></Form.Control> <PencilFill
                                    onClick={handleEditCostMode}
                                    fontSize="1.3rem"
                                    /> </>: <> {"$" + cost[0].cost} <Pencil
                                    onClick={handleEditCostMode}
                                    fontSize="1.3rem"
                                    /></>
                                    }
                                </td>
                                </tr>
                                <tr>
                                <td width="20%" className="font-weight-bold align-middle">
                                    Tax Percentage
                                </td>
                                <td className="align-middle d-flex justify-content-between">
                                    {editTaxMode ? <> <Form.Control
                                        className="text-left w-25"
                                        onKeyPress={handleKeyPressTax}
                                        onChange={((e) => { setTax(e.target.value) })}
                                        value={tax}
                                        required
                                    ></Form.Control> <PencilFill
                                    onClick={handleEditTaxMode}
                                    fontSize="1.3rem"
                                    /></>:<> {cost[0].tax} <Pencil
                                    onClick={handleEditTaxMode}
                                    fontSize="1.3rem"
                                    /></>}
                                </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>

                    {/* EMAIL SETTINGS BELOW - PLACE IN OWN COMPONENT */}
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
                            <td colSpan="2" className="px-5">
                                <h4>{emailSettings.header}</h4>
                                <p className="text-left">{emailSettings.body}</p>
                                <ul>
                                    <li>Click here to download your photo</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="pl-5">
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