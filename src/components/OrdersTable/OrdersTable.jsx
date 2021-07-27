import './OrdersTable.css';
import { orderConstants, searchTypes } from '../../_constants';
import Table from 'react-bootstrap/Table';
import OrderTableRow from '../OrderTableRow/OrderTableRow';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import OrdersPagination from '../OrdersPagination/OrdersPagination';

function OrdersTable() {
    const dispatch = useDispatch();
    const Orders = useSelector(store => store.orders.pageOfOrders);
    const orderPager = useSelector(store => store.orders.pager);
    const ordersText = useSelector(store => store.orders.text);
    const ordersDate = useSelector(store => store.orders.date);
    const orderTypes = useSelector(store => store.orders.type);
    const [orderDate, setOrderDate] = useState(ordersDate);
    const [orderText, setOrderText] = useState(ordersText);
    const [orderType, setOrderType] = useState(orderTypes);
    const [query, setQuery] = useState('');
    const [Query, setDateQuery] = useState('');
    const [type, setType] = useState(searchTypes.ALL);

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
        getResults(type, '');
        console.log(orderPager.totalPages);
    }, []);

    const getResults = (type, query) => {
        const params = new URLSearchParams(document.location.search);
        const page = parseInt(params.get('page'));
        switch (type) {
            case searchTypes.DATE:
                setType(searchTypes.DATE);
                setDateQuery(query);
                document.getElementById("search-text-input").value = '';
                console.log(`orders, date, query: ${query}`);
                return dispatch({
                    type: orderConstants.SEARCH_DATE, payload: {
                        page: page,
                        query: query
                    }
                });
            case searchTypes.TEXT:
                setType(searchTypes.TEXT);
                setQuery(query);
                document.getElementById("search-dates-orders-emails").value = '';
                console.log(`orders, text, query: ${query}`);
                return dispatch({
                    type: orderConstants.SEARCH_TEXT, payload: {
                        page: page,
                        query: query
                    }
                });
            case searchTypes.ALL:
                setType(searchTypes.ALL);
                console.log(`orders, all, query: ${query}`);
                return dispatch({
                    type: orderConstants.SEARCH_ALL, payload: {
                        page: page,
                        query: query
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
                    onChange={(e) => getResults(searchTypes.TEXT, e.target.value)}
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
                        getResults(searchTypes.DATE, e.target.value)
                    }}
                    type="date"
                />
                <InputGroup.Append>
                    <Button
                        onClick={(e) => {
                            let q = document.getElementById("search-dates-orders").value;
                            if (q === '') {
                                let today = setTodaysDate()
                                document.getElementById("search-dates-orders").value = today;
                                document.getElementById("search-text-input").value = '';
                                getResults(searchTypes.DATE, today);
                                //alert("Please enter a date to search");
                            }
                            else {
                                getResults(searchTypes.DATE, q);
                            }
                        }}
                        variant="outline-dark"
                    >GO</Button>
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
                            /*   getOrders={getOrders} */
                            />
                        </tbody>
                    )
                }) : <tbody><tr className="d-flex justify-content-center">
                    <td colSpan='6'>No orders to view</td>
                </tr></tbody>}

            </Table>

            {orderPager.totalPages > 1 ? <OrdersPagination
                orderPager={orderPager}
                orderType={orderType}
                orderDate={orderDate}
                orderText={orderText}
            /> : <> </>}
            
        </Col>
    );
}

export default OrdersTable;