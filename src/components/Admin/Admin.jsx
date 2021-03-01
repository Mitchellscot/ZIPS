import './Admin.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import AdminTableRow from '../AdminTableRow/AdminTableRow';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import AdminHeader from '../AdminHeader/AdminHeader';
import Row from 'react-bootstrap/Row';

function Admin() {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders);

    React.useEffect(() => {
        dispatch({ type: 'FETCH_ORDERS' })
    }, []);

    return (
        <>
        <AdminHeader />
        <Container>
            <Row>
                <nav id="sidebarMenu" className="col-md-2 col-lg-1 d-md-block bg-dark sidebar collapse">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">Orders</li>
                            <li className="nav-item">Pictures</li>
                            <li className="nav-item">Camera Settings</li>
                            <li className="nav-item">Account Settings</li>
                        </ul>
                    </div>
                </nav>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                
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
            </main>
            </Row>
        </Container>
        </>
    );
}

export default Admin;