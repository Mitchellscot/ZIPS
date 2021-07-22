import React from 'react';
import { Link } from 'react-router-dom';
import './OrdersPagination.css';
import { orderConstants, searchTypes } from '../../_constants';
import { useSelector, useDispatch } from 'react-redux';


export default function OrdersPagination({ orderPager, orderType, orderDate, orderText }) {
    const dispatch = useDispatch();

    const handleOrdersPageChange = (page) => {
        switch (orderType) {
            case searchTypes.DATE:
                console.log(`pagination: type: ${orderType} page: ${page} date: ${orderDate}`)
                return dispatch({
                    type: orderConstants.SEARCH_DATE, payload: {
                        page: page,
                        query: orderDate
                    }});
            case searchTypes.TEXT:
                console.log(`pagination: type: ${orderType} page: ${page} text: ${orderText}`)
                return dispatch({
                    type: orderConstants.SEARCH_TEXT, payload: {
                        page: page,
                        query: orderText
                    }});
            case searchTypes.ALL:
                console.log(`pagination: type: ${orderType} page: ${page} date: ${orderDate} text: ${orderText}`)
                return dispatch({
                    type: orderConstants.SEARCH_ALL, payload: {
                        page: page,
                        query: ''
                    }});
    }
}
    return (

        <ul className="pagination">
        <li onClick={() => handleOrdersPageChange(1)}
            className={`page-item first-item ${orderPager.currentPage === 1 ? 'disabled' : ''}`}>
            <Link to={{ search: `?page=1` }} className="page-link">First</Link>
        </li>
        <li onClick={() => handleOrdersPageChange(orderPager.currentPage - 1)}
            className={`page-item previous-item ${orderPager.currentPage === 1 ? 'disabled' : ''}`}>
            <Link to={{ search: `?page=${orderPager.currentPage - 1}` }} className="page-link">Previous</Link>
        </li>
        {orderPager.pages.map(page =>
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
    </ul>

    );
}