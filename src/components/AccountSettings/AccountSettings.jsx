import { costConstants } from '../../_constants';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { Pencil, PencilFill } from 'react-bootstrap-icons'
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EmailSettings from './EmailSettings';
import EmailPreview from './EmailPreview';
import AccountPassword from './AccountPassword';
import AccountPasswordGuest from './AccountPasswordGuest';

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

    const [showEmail, setShowEmail] = useState(false);
    const toggleShowEmail = () => {
        setShowEmail(!showEmail);
    }

    const handleEditCostMode = () => {
        setPhotoCost(cost.price);
        if (editCostMode === false) {
            setEditCostMode(!editCostMode);
        }
        else {
            setEditCostMode(!editCostMode);
            axios.put(`/api/cost/updateCost`, {
                cost: photoCost
            })
                .then((response) => {
                    dispatch({ type: costConstants.FETCH });
                })
                .catch((error) => {
                    console.log(`HEY MITCH - CAN'T CHANGE THE COST OF THE PICTURES: ${error}`);
                })
        }
    }

    //change the tax when pencil is clicked
    const handleEditTaxMode = () => {
        setTax(cost.tax);
        if (editTaxMode === false) {
            setEditTaxMode(!editTaxMode);
        }
        else {
            setEditTaxMode(!editTaxMode);
            axios.put(`/api/cost/updateTax`, {
                tax: tax
            })
                .then((response) => {
                    dispatch({ type: costConstants.FETCH });
                })
                .catch((error) => {
                    console.log(`HEY MITCH - CAN'T CHANGE THE TAX: ${error}`);
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

    useEffect(() => {
        dispatch({ type: costConstants.FETCH });
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
                            {/*I deleted a <tbody> here, watch the console for errors */}
                            <tbody>
                                <tr>
                                    <td width="20%" className="font-weight-bold align-middle">
                                        Picture Price
                                </td>
                                    <td className="d-flex align-middle justify-content-between border-0">
                                        {editCostMode ? <><Form.Control
                                            className="text-left w-25"
                                            onKeyPress={handleKeyPressCost}
                                            onChange={((e) => { setPhotoCost(e.target.value) })}
                                            value={photoCost}
                                            required
                                        ></Form.Control> <PencilFill
                                                onClick={handleEditCostMode}
                                                fontSize="1.3rem"
                                            /> </> : <> {cost.price} <Pencil
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
                                    <td className="d-flex justify-content-between align-middle border-bottom-0 ">
                                        {editTaxMode ? <> <Form.Control
                                            className="text-left w-25"
                                            onKeyPress={handleKeyPressTax}
                                            onChange={((e) => { setTax(e.target.value) })}
                                            value={tax}
                                            required
                                        ></Form.Control> <PencilFill
                                                onClick={handleEditTaxMode}
                                                fontSize="1.3rem"
                                            /></> : <> {cost.tax} <Pencil
                                                onClick={handleEditTaxMode}
                                                fontSize="1.3rem"
                                            /></>}
                                    </td>
                                </tr>
                                </tbody>
                        </Table>
                        <AccountPassword />
                        <AccountPasswordGuest />
                    </Tab>
                    <Tab eventKey="emailSettings" title="Email">
                        <EmailSettings
                            emailSettings={emailSettings}
                            showEmail={showEmail}
                            toggleShowEmail={toggleShowEmail}
                        />
                    </Tab>
                </Tabs>
            </Col>
            {showEmail ? <EmailPreview
                emailSettings={emailSettings}
                showEmail={showEmail}
            /> : <></>}
        </>
    );
}

export default AccountSettings;