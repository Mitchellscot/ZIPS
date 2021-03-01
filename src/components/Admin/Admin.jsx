import './Admin.css';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import AdminTableRow from '../AdminTableRow/AdminTableRow';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import AdminHeader from '../AdminHeader/AdminHeader';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

function Admin() {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.orders);

    React.useEffect(() => {
        dispatch({ type: 'FETCH_ORDERS' })
    }, []);

    return (
        <>
            <AdminHeader />
            <Container fluid>
                <Row>
                    {/*CONSIDER PUTTIN THIS IN IT"S OWN COMPONENT */}
                    <Nav className="sidebar col-md-3 col-lg-2 d-md-block bg-light  collapse" >
                        <div className="position-sticky pt-3">
                            <Nav defaultActiveKey="Orders"as="ul" className="nav flex-column">
                                <Nav.Item as="li">
                                    <Nav.Link>Orders</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link>Pictures</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link>Camera Settings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link>Account Settings</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </Nav>
                    {/**************************************************/}
                    <Col md={9} lg={10} className="ml-sm-auto px-md-5 py-5">
                    <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
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
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Admin;