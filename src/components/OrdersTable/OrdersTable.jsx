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
import Pagination from '../OrdersPagination/OrdersPagination';
import { Link } from 'react-router-dom';

function OrdersTable() {
    const dispatch = useDispatch();
    const Orders = useSelector(store => store.orders.pageOfOrders);
    const orderPager = useSelector(store => store.orders.pager);
    const searchDate = useSelector(store => store.orders.date);
    const emails = useSelector(store => store.emails.pageOfEmails);
    const emailPager = useSelector(store => store.emails.pager)
    const [tab, setTab] = useState('orders');
    const [dateQuery, setDateQuery] = useState('');
    const params = new URLSearchParams(document.location.search);
    const page = parseInt(params.get('page'));
    const [input, setInput] = useState('');
    const [searchByNameOrEmail, SetSearchByNameOrEmail] = useState(false);

    const setTodaysDate = () => {
        let day = new Date();
        let dd = day.getDate()
        let mm = day.getMonth() + 1;
        let yyyy = day.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        return yyyy + "-" + mm + "-" + dd;
    }

    React.useEffect(() => {
        getOrders();
        getEmails();
        setInput(document.getElementById("search-text-input").value);
        document.getElementById("search-text-input").value = input;
    }, []);

    const getEmails = () => {
        dispatch({
            type: 'FETCH_EMAIL_HISTORY', payload: {
                page: page
            }
        });
    }
    const getOrders = () => {
        dispatch({
            type: 'FETCH_ALL_ORDERS', payload: { page: page, date: determineDate() }
        });
    }


    const determineDate = (dateQuery) => {
        if (dateQuery === '') {
            return setTodaysDate();
        }
        else return dateQuery;
    }

    const handleInputChange = () => {
        SetSearchByNameOrEmail(true);
        let date = determineDate(dateQuery)
        console.log(date)
        if (tab === 'orders') {
            dispatch({
                type: 'SEARCH_ORDERS', payload: {
                    q: input,
                    page: page,
                    date: date
                }
            });
        }
        else if (tab === 'emails') {
            dispatch({
                type: 'SEARCH_EMAILS', payload: {
                    q: input,
                    page: page,
                    date: date
                }
            });
        }
    }

    const handleDateSearch = () => {
        SetSearchByNameOrEmail(false);
        let date = determineDate(dateQuery);
        if (tab === 'orders') {
            dispatch({
                type: 'SEARCH_ORDER_DATES', payload: {
                    date: dateQuery,
                    page: page
                }
            });
        }
        else if (tab === 'emails') {
            dispatch({
                type: 'SEARCH_EMAIL_DATES', payload: {
                    date: dateQuery,
                    page: page
                }
            });
        }
    }

    const handleOrdersPageChange = () => {
        const params = new URLSearchParams(document.location.search);
        const page = parseInt(params.get('page'));
        let date = determineDate(dateQuery)
        if (searchByNameOrEmail) {
            console.log('bingo');
            dispatch({
                type: 'SEARCH_ORDERS', payload: {
                    q: input,
                    page: page,
                    date: date
                }
            });
        }
        else {
            console.log('bango');
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
                    value={input}
                    id="search-text-input"
                    onChange={(e) => {
                        setInput(e.target.value)
                        handleInputChange()
                    }}
                    placeholder="Name or email..."
                    type="text"
                />
                <InputGroup.Text id="input-group-text">
                    <span>Or date</span>
                </InputGroup.Text>
                <FormControl
                    id="search-dates-orders-emails"
                    onChange={() => {
                        setInput(event.target.value)
                        setDateQuery(event.target.value)
                    }}
                    type="date"
                />
                <InputGroup.Append>
                    <Button
                        onClick={() => {
                            let input = document.getElementById("search-dates-orders-emails").value;
                            if (input === '') {
                                alert("Please enter a date to search");
                            }
                            setInput(input)
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
                    getEmails();
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
                                        getOrders={getOrders}
                                    />
                                </tbody>
                            )
                        }) : <tbody><tr className="d-flex justify-content-center">
                            <td colSpan='6'>No orders to view</td>
                        </tr></tbody>}
                    </Table>
                    {orderPager.totalPages > 1 ? <ul className="pagination">
                        <li onClick={handleOrdersPageChange}
                            className={`page-item first-item ${orderPager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                        </li>
                        <li onClick={handleOrdersPageChange}
                            className={`page-item previous-item ${orderPager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${orderPager.currentPage - 1}` }} className="page-link">Previous</Link>
                        </li>
                        {orderPager.pages.map(page =>
                            <li onClick={handleOrdersPageChange}
                                key={page} className={`page-item number-item ${orderPager.currentPage === page ? 'active' : ''}`}>
                                <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                            </li>
                        )}
                        <li onClick={handleOrdersPageChange}
                            className={`page-item next-item ${orderPager.currentPage === orderPager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${orderPager.currentPage + 1}` }} className="page-link">Next</Link>
                        </li>
                        <li onClick={handleOrdersPageChange}
                            className={`page-item last-item ${orderPager.currentPage === orderPager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${orderPager.totalPages}` }} className="page-link">Last</Link>
                        </li>
                    </ul> : <> </>}
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
                        {emails !== undefined ? emails.map(email => {
                            return (
                                <tbody key={email.id}>
                                    <EmailTableRow email={email}
                                    />
                                </tbody>
                            )
                        }) : <tbody><tr className="d-flex justify-content-center">
                            <td colSpan='6'>No Emails to view</td>
                        </tr></tbody>}
                    </Table>
                    {emailPager.totalPages > 1 ? <Pagination searchDate={searchDate} Pager={emailPager} /> : <> </>}
                </Tab>
            </Tabs>
        </Col>

    );
}

export default OrdersTable;