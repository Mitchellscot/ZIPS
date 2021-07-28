import './OrdersTable.css';
import { orderConstants, searchTypes } from '../../_constants';
import Table from 'react-bootstrap/Table';
import OrderTableRow from '../OrderTableRow/OrderTableRow';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function OrdersTable() {
    const dispatch = useDispatch();
    const Orders = useSelector(store => store.orders.pageOfOrders);
    const orderPager = useSelector(store => store.orders.pager);
    const ordersText = useSelector(store => store.orders.text);
    const ordersDate = useSelector(store => store.orders.date);
    const orderTypes = useSelector(store => store.orders.type);
    const [orderDate, setOrderDate] = useState(ordersDate);
    const [orderText, setOrderText] = useState(ordersText);
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState(orderTypes);

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

/*     React.useEffect(() => {
        getResults(searchType.ALL, '');
    }, []); */

    const getResults = (type, query) => {
        const params = new URLSearchParams(document.location.search);
        const page = parseInt(params.get('page'));
        switch (type) {
            case searchTypes.DATE:
                setQuery(query);
                document.getElementById("search-text-input").value = '';
                return dispatch({
                    type: orderConstants.SEARCH_DATE, payload: {
                        page: page,
                        query: query
                    }
                });
            case searchTypes.TEXT:
                setQuery(query);
                document.getElementById("search-dates-orders").value = '';
                return dispatch({
                    type: orderConstants.SEARCH_TEXT, payload: {
                        page: page,
                        query: query
                    }
                });
            case searchTypes.ALL:
                return dispatch({
                    type: orderConstants.SEARCH_ALL, payload: {
                        page: page,
                        query: query
                    }
                });
        }
    }

    const handleOrdersPageChange = (page) => {
        switch (searchType) {
            case searchTypes.DATE:
                return dispatch({
                    type: orderConstants.SEARCH_DATE, payload: {
                        page: page,
                        query: query === '' ? ordersDate : query
                    }
                });
            case searchTypes.TEXT:
                return dispatch({
                    type: orderConstants.SEARCH_TEXT, payload: {
                        page: page,
                        query: query === '' ? ordersText : query
                    }
                });
            case searchTypes.ALL:
                return dispatch({
                    type: orderConstants.SEARCH_ALL, payload: {
                        page: page,
                        query: ''
                    }
                });
        }
    }

        return (
            <Col className="align-items-center justify-content-center">
                {/*SEARCH */}
                <InputGroup className="mb-3">
                    <InputGroup.Text id="input-name-text">
                        <span>Search</span>
                    </InputGroup.Text>
                    <FormControl
                        value={query}
                        id="search-text-input"
                        onChange={(e) => {
                            setSearchType(searchTypes.TEXT);
                            setQuery(e.target.value);
                            getResults(searchTypes.TEXT, e.target.value)
                        }}
                        placeholder="Name or email..."
                        type="text"
                    />
                    <InputGroup.Text id="input-group-text">
                        <span>Or date</span>
                    </InputGroup.Text>
                    <FormControl
                        id="search-dates-orders"
                        onChange={(e) => {
                            setSearchType(searchTypes.DATE);
                            setQuery(e.target.value);
                            document.getElementById("search-text-input").value = '';
                            getResults(searchTypes.DATE, e.target.value)
                        }}
                        type="date"
                    />
                    <InputGroup.Append>
                        <Button
                            onClick={(e) => {
                                    document.getElementById("search-dates-orders").value = '';
                                    document.getElementById("search-text-input").value = '';
                                    setSearchType(searchTypes.ALL);
                                    getResults(searchTypes.ALL, '');
                            }}
                            variant="outline-dark"
                        >ALL</Button>
                    </InputGroup.Append>
                </InputGroup>
                {/* *************** */}

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
                                    getResults={getResults}
                                />
                            </tbody>
                        )
                    }) : <tbody><tr className="d-flex justify-content-center">
                        <td colSpan='6'>No orders to view</td>
                    </tr></tbody>}

                </Table>
                {orderPager.pages !== undefined ?
                <ul className="pagination">
                    <li onClick={() => handleOrdersPageChange(1)}
                        className={`page-item first-item ${orderPager.currentPage === 1 ? 'disabled' : ''}`}>
                        <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                    </li>
                    <li onClick={() => handleOrdersPageChange(orderPager.currentPage - 1)}
                        className={`page-item previous-item ${orderPager.currentPage === 1 ? 'disabled' : ''}`}>
                        <Link to={{ search: `?page=${orderPager.currentPage - 1}` }} className="page-link">Previous</Link>
                    </li>
                    { orderPager.pages.map(page =>
                        <li onClick={() => handleOrdersPageChange(page)}
                            key={page} className={`page-item number-item ${orderPager.currentPage === page ? 'active' : ''}`}>
                            <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                        </li>
                    )}
                    <li onClick={() => handleOrdersPageChange(orderPager.currentPage + 1)}
                        className={`page-item next-item ${orderPager.currentPage === orderPager.totalPages ? 'disabled' : ''}`}>
                        <Link to={{ search: `?page=${orderPager.currentPage + 1}` }} className="page-link">Next</Link>
                    </li>
                    <li onClick={() => handleOrdersPageChange(orderPager.totalPages)}
                        className={`page-item last-item ${orderPager.currentPage === orderPager.totalPages ? 'disabled' : ''}`}>
                        <Link to={{ search: `?page=${orderPager.totalPages}` }} className="page-link">Last</Link>
                    </li>
                </ul> : <> </> }

            </Col>
        );
    }

    export default OrdersTable;