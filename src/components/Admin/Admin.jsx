import './Admin.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import AdminTableRow from '../AdminTableRow/AdminTableRow';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

function Admin() {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders);

    React.useEffect(() => {
        dispatch({ type: 'FETCH_ORDERS' })
    }, []);

    return (
        <Container>
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
        </Container>
    );
}

export default Admin;