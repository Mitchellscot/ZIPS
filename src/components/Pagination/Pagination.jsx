import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

export default function Pagination({ Pager }) {

    return (
        <ul className="pagination">
            <li className={`page-item previous-item ${Pager.currentPage === 1 ? 'disabled' : ''}`}>
                <Link to={{ search: `?page=${Pager.currentPage - 1}` }} className="page-link">Previous</Link>
            </li>

            {Pager.pages.map(page =>
                <li key={page} className={`page-item number-item ${Pager.currentPage === page ? 'active' : ''}`}>
                    <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                </li>
            )}

            <li className={`page-item next-item ${Pager.currentPage === Pager.totalPages ? 'disabled' : ''}`}>
                <Link to={{ search: `?page=${Pager.currentPage + 1}` }} className="page-link">Next</Link>
            </li>
        </ul>
    );
}