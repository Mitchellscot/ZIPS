import './OrdersTable.css';
import Table from 'react-bootstrap/Table';
import AdminTableRow from '../AdminTableRow/AdminTableRow';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import EmailTableRow from '../EmailTableRow/EmailTableRow';

function OrdersTable() {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders);
    const emails = useSelector(store => store.emails);

    React.useEffect(() => {
        dispatch({ type: 'FETCH_ORDERS' });
        dispatch({type: 'FETCH_EMAIL_HISTORY'})
    }, []);
    return (
        <Col>
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