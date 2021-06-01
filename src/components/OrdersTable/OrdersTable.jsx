import './OrdersTable.css';
import Table from 'react-bootstrap/Table';
import OrderTableRow from '../OrderTableRow/OrderTableRow';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import EmailTableRow from '../EmailTableRow/EmailTableRow';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Pagination from '../Pagination/Pagination';

function OrdersTable() {
    const dispatch = useDispatch();
    const Orders = useSelector(store => store.orders.pageOfOrders);
    const Pager = useSelector(store => store.orders.pager)
    const emails = useSelector(store => store.emails);
    const [tab, setTab] = useState('orders');
    const [dateQuery, setDateQuery] = useState('');
    const params = new URLSearchParams(document.location.search);
    const page = parseInt(params.get('page'));
    
    React.useEffect(() => {
        getOrders();
        dispatch({ type: 'FETCH_EMAIL_HISTORY' })
    }, []);

    const getOrders = () => {
            dispatch({
                type: 'FETCH_ALL_ORDERS', payload: {
                    page: page
                }
            });
    }

    const handleInputChange = (event) => {

        if (tab === 'orders') {
            dispatch({ type: 'SEARCH_ORDERS', payload: {
                q: event.target.value,
                page: page
            }});
        }
        else if (tab === 'emails') {
            dispatch({ type: 'SEARCH_EMAILS', payload: event.target.value });
        }
    }

    const handleDateSearch = () => {
        if (tab === 'orders') {
            dispatch({ type: 'SEARCH_ORDER_DATES', payload: {
                q: dateQuery,
                page: page
            }});
        }
        else if (tab === 'emails') {
            dispatch({ type: 'SEARCH_EMAIL_DATES', payload: dateQuery });
        }
    }

    return (
        <Col className="align-items-center justify-content-center">
            {/*ORDERS SEARCH */}
            <InputGroup className="mb-3">
                <InputGroup.Text id="input-name-text">
                    <span>Search</span>
                </InputGroup.Text>
                <FormControl
                    onChange={handleInputChange}
                    placeholder="Name or email..."
                    type="text"
                />
                <InputGroup.Text id="input-group-text">
                    <span>Or date</span>
                </InputGroup.Text>
                <FormControl
                    id="search-dates-orders-emails"
                    onChange={() => setDateQuery(event.target.value)}
                    type="date"
                />
                <InputGroup.Append>
                    <Button
                        onClick={() => {
                            let input = document.getElementById("search-dates-orders-emails").value;
                            if (input === '') {
                                alert("Please enter a date to search");
                            }
                            handleDateSearch();
                        }}
                        variant="outline-dark"
                    >GO</Button>
                </InputGroup.Append>
            </InputGroup>
            {/* *************** */}

            <Tabs
                onSelect={(t) => {
                    setTab(t);
                    getOrders();
                    dispatch({ type: 'FETCH_EMAIL_HISTORY' })
                }}
                activeKey={tab}>
                <Tab eventKey="orders" title="Orders">
                    <Table bordered hover className="Tables">
                        <thead>
                            <tr>
                                <th width="10%">
                                    Status
                                </th>
                                <th width="10%">
                                    Date
                                </th>
                                <th width="25%">
                                    Name
                                </th>
                                <th width="25%">
                                    Email
                                </th>
                                <th width="10%">
                                    Total
                                </th>
                                <th width="20%">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                       {Orders !== undefined ? Orders.map(order => {
                            return (
                                <tbody key={order.id}>
                                    <OrderTableRow
                                        order={order}
                                        Pager={Pager}
                                        getOrders={getOrders}
                                    />
                                </tbody>
                            )
                        }) : <tbody><tr className="d-flex justify-content-center">
                            <td colSpan='6'>No orders to view</td>
                            </tr></tbody>}
                    </Table>
                    {Pager.totalPages > 1 ? <Pagination Pager={Pager}/> : <> </>}
                </Tab>
                <Tab eventKey="emails" title="Emails" className="Tables">
                    <Table bordered hover>
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