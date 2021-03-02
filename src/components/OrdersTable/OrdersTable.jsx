import './OrdersTable.css';
import Table from 'react-bootstrap/Table';
import AdminTableRow from '../AdminTableRow/AdminTableRow';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import EmailTableRow from '../EmailTableRow/EmailTableRow';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function OrdersTable() {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders);
    const emails = useSelector(store => store.emails);

    React.useEffect(() => {
        dispatch({ type: 'FETCH_ORDERS' });
        dispatch({ type: 'FETCH_EMAIL_HISTORY' })
    }, []);



    return (
        <Col>


          <InputGroup className="mb-3">
                <FormControl
                    placeholder="Enter a name, date, or email..."
                />

                <InputGroup.Append>
                <ButtonGroup>
                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-dark"
                        title="Search By"
                        id="searchDropDown"
                    >
                        <Dropdown.Item>Name</Dropdown.Item>
                        <Dropdown.Item>Email</Dropdown.Item>
                        <Dropdown.Item>Date</Dropdown.Item>
                    </DropdownButton>
                    <Button
                        variant="outline-dark"
                    >GO</Button>
                    </ButtonGroup>
                </InputGroup.Append>
            </InputGroup>

            <Tabs defaultActiveKey="orders" id="tabz">
                <Tab eventKey="orders" title="Orders">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th width="15%">
                                    Date
                                </th>
                                <th width="20%">
                                    Name
                                </th>
                                <th width="25%">
                                    Email
                                </th>
                                <th width="15%">
                                    Status
                                </th>
                                <th width="20%">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {orders.map(order => {
                            return (
                                <tbody key={order.id}>
                                    <AdminTableRow order={order} />
                                </tbody>
                            )
                        })}
                    </Table>
                </Tab>
                <Tab eventKey="emails" title="Emails">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th width="15%">
                                    Date Sent
                                </th>
                                <th width="20%">
                                    Name
                                </th>
                                <th width="25%">
                                    Email
                                </th>
                                <th width="15%">
                                    Amount Paid
                                </th>
                                <th width="15%">
                                    View Email / Photos
                                </th>
                            </tr>
                        </thead>
                        {emails.map(email => {
                            return (
                                <tbody key={email.id}>
                                    <EmailTableRow email={email} />
                                </tbody>
                            )
                        })}
                    </Table>
                </Tab>
            </Tabs>
        </Col>

    );
}

export default OrdersTable;