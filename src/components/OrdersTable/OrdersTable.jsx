import './OrdersTable.css';
import { orderConstants } from '../../_constants';
import { emailConstants } from '../../_constants';
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
    const all = 'all';
    const text = 'text';
    const date = 'date';
    const dispatch = useDispatch();
    const Orders = useSelector(store => store.orders.pageOfOrders);
    const orderPager = useSelector(store => store.orders.pager);
    const searchDate = useSelector(store => store.orders.date);
    const emails = useSelector(store => store.emails.pageOfEmails);
    const emailPager = useSelector(store => store.emails.pager)
    const [tab, setTab] = useState('orders');
    const [query, setQuery] = useState('');
    const [Query, setDateQuery] = useState('');
    const [type, setType] = useState(all);

    const params = new URLSearchParams(document.location.search);
    const page = parseInt(params.get('page'));

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
        getResults(type, query);
    }, []);

    const getResults = (type, query) => {
        const params = new URLSearchParams(document.location.search);
        const page = parseInt(params.get('page'));
        if (tab === 'orders') {
            switch (type) {
                case date:
                    setType(date);
                    setDateQuery(query);
                    document.getElementById("search-text-input").value = '';
                    console.log(`orders, date, query: ${query}`);
                    return dispatch({
                        type: orderConstants.SEARCH_DATE, payload: {
                            page: page,
                            query: query
                        }});
                case text:
                    setType(text);
                    setQuery(query);
                    document.getElementById("search-dates-orders-emails").value = '';
                    console.log(`orders, text, query: ${query}`);
                    return dispatch({
                        type: orderConstants.SEARCH_TEXT, payload: {
                            page: page,
                            query: query
                        }});
                case all:
                    setType(all);
                    console.log(`orders, all, query: ${query}`);
                    return dispatch({
                        type: orderConstants.SEARCH_ALL, payload: {
                            page: page,
                            query: query
                        }});}
        }
        else if (tab === 'emails') {
            switch (type) {
                case date:
                    setType(date);
                    setDateQuery(query);
                    document.getElementById("search-text-input").value = '';
                    console.log(`emails, date, query: ${query}`);
                    return dispatch({
                        type: emailConstants.SEARCH_DATE, payload: {
                            page: page,
                            query: query
                        }});
                case text:
                    setType(text);
                    setQuery(query);
                    document.getElementById("search-dates-orders-emails").value = '';
                    console.log(`emails, text, query: ${query}`);
                    return dispatch({
                        type: emailConstants.SEARCH_TEXT, payload: {
                            page: page,
                            query: query
                        }});
                case all:
                    setType(all);
                    console.log(`emails, all, query: ${query}`);
                    return dispatch({
                        type: emailConstants.SEARCH_ALL, payload: {
                            page: page,
                            query: query
                        }});}
        }
    }

        /*     const handleChange = (tab, type, page, query) => {
                const params = new URLSearchParams(document.location.search);
                const page = parseInt(params.get('page'));
                if (tab === 'orders'){
                    //get all
                    dispatch({type: orderConstants.SEARCH_ALL, payload:{
                        page: page
                    }});
        
                }
                else if (tab === 'emails'){
                }
                //needs logic to determin if current page is equal to page... maybe...
                dispatch({type: 'ORDERS_SEARCH', payload:{
                    tab: tab, //ALL, ORDERS, EMAILS
                    type: type, //TEXT, DATE
                    page: page, //1,2,3,4,5... etc
                    query: query //either the date to search or the text to search
                }});
            } */

        return (
            <Col className="align-items-center justify-content-center">
                {/*ORDERS SEARCH */}
                <InputGroup className="mb-3">
                    <InputGroup.Text id="input-name-text">
                        <span>Search</span>
                    </InputGroup.Text>
                    <FormControl
                        value={query}
                        id="search-text-input"
                        onChange={(e) => getResults(text, e.target.value)}
                        placeholder="Name or email..."
                        type="text"
                    />
                    <InputGroup.Text id="input-group-text">
                        <span>Or date</span>
                    </InputGroup.Text>
                    <FormControl
                        id="search-dates-orders-emails"
                        onChange={(e) => {
                            setQuery('');
                            document.getElementById("search-text-input").value = '';
                            getResults(date, e.target.value)}}
                        type="date"
                    />
                    <InputGroup.Append>
                        <Button
                            onClick={(e) => {
                                let q = document.getElementById("search-dates-orders-emails").value;
                                if (q === '') {
                                    let today = setTodaysDate()
                                    document.getElementById("search-dates-orders-emails").value = today;
                                    document.getElementById("search-text-input").value = '';
                                    getResults(date, today);
                                    //alert("Please enter a date to search");
                                }
                                else{
                                    getResults(date, q);
                                }
                            }}
                            variant="outline-dark"
                        >GO</Button>
                    </InputGroup.Append>
                </InputGroup>
                {/* *************** */}

                <Tabs
                    onSelect={(t) => {
                        setTab(t);
                        /*                     getOrders();
                                            getEmails(); */
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
                                        /*   getOrders={getOrders} */
                                        />
                                    </tbody>
                                )
                            }) : <tbody><tr className="d-flex justify-content-center">
                                <td colSpan='6'>No orders to view</td>
                            </tr></tbody>}
                        </Table>
                        {orderPager.totalPages > 1 ? <ul className="pagination">
                            <li /* onClick={} */
                                className={`page-item first-item ${orderPager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                            </li>
                            <li /* onClick={} */
                                className={`page-item previous-item ${orderPager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${orderPager.currentPage - 1}` }} className="page-link">Previous</Link>
                            </li>
                            {orderPager.pages.map(page =>
                                <li /* onClick={} */
                                    key={page} className={`page-item number-item ${orderPager.currentPage === page ? 'active' : ''}`}>
                                    <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                                </li>
                            )}
                            <li /* onClick={} */
                                className={`page-item next-item ${orderPager.currentPage === orderPager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${orderPager.currentPage + 1}` }} className="page-link">Next</Link>
                            </li>
                            <li /* onClick={} */
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