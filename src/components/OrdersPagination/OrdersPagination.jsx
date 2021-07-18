import React from 'react';
import { Link } from 'react-router-dom';
import './OrdersPagination.css';

export default function OrdersPagination({ Pager, searchDate, searchByName, handleInputChange, handleDateSearch }) {

    const handleOrdersPageChange = () => {
        const params = new URLSearchParams(document.location.search);
        const page = parseInt(params.get('page'));
        if (searchByName){
            handleInputChange();
            
        }
        else {
            handleDateSearch();
        }

    }

    return (
        <ul className="pagination">
            <li onClick={handleOrdersPageChange}
                className={`page-item first-item ${Pager.currentPage === 1 ? 'disabled' : ''}`}>
                <Link to={{ search: `?page=1` }} className="page-link">First</Link>
            </li>
            <li onClick={handleOrdersPageChange}
                className={`page-item previous-item ${Pager.currentPage === 1 ? 'disabled' : ''}`}>
                <Link to={{ search: `?page=${Pager.currentPage - 1}` }} className="page-link">Previous</Link>
            </li>
            {Pager.pages.map(page =>
                <li onClick={handleOrdersPageChange}
                    key={page} className={`page-item number-item ${Pager.currentPage === page ? 'active' : ''}`}>
                    <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                </li>
            )}

            <li onClick={handleOrdersPageChange}
                className={`page-item next-item ${Pager.currentPage === Pager.totalPages ? 'disabled' : ''}`}>
                <Link to={{ search: `?page=${Pager.currentPage + 1}` }} className="page-link">Next</Link>
            </li>
            <li onClick={handleOrdersPageChange}
                className={`page-item last-item ${Pager.currentPage === Pager.totalPages ? 'disabled' : ''}`}>
                <Link to={{ search: `?page=${Pager.totalPages}` }} className="page-link">Last</Link>
            </li>
        </ul>
    );
}