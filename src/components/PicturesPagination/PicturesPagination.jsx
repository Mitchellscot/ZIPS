import React from 'react';
import { Link } from 'react-router-dom';
import './PicturesPagination.css';
import { useDispatch } from 'react-redux';


export default function PicturesPagination({ Pager, getTodaysImages }) {
    const params = new URLSearchParams(document.location.search);
    const page = parseInt(params.get('page'));
    const dispatch = useDispatch();

    const handlePageChange = () => {
            let dateQ = document.getElementById("picture-search-date").value;
            if (dateQ === undefined){
                getTodaysImages();
            }
            //dispatch({type: "RESET_IMAGES"});
            dispatch({ type: "FETCH_PICTURES", payload: { q: dateQ, page: page } });
    }

    return (
        <ul className="pagination">
            <li 
            className={`page-item first-item ${Pager.currentPage === 1 ? 'disabled' : ''}`}>
                <Link to={{ search: `?page=1` }} className="page-link" onClick={() => handlePageChange}>First</Link>
            </li>
            <li 
            className={`page-item previous-item ${Pager.currentPage === 1 ? 'disabled' : ''}`}>
                <Link to={{ search: `?page=${Pager.currentPage - 1}` }} className="page-link" onClick={() => handlePageChange}>Previous</Link>
            </li>
            {Pager.pages.map(page =>
                <li key={page} className={`page-item number-item ${Pager.currentPage === page ? 'active' : ''}`}>
                    <Link onClick={() => handlePageChange} to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                </li>
            )}
            <li className={`page-item next-item ${Pager.currentPage === Pager.totalPages ? 'disabled' : ''}`}>
                <Link onClick={() => handlePageChange} to={{ search: `?page=${Pager.currentPage + 1}` }} className="page-link">Next</Link>
            </li>
            <li className={`page-item last-item ${Pager.currentPage === Pager.totalPages ? 'disabled' : ''}`}>
                <Link onClick={() => handlePageChange} to={{ search: `?page=${Pager.totalPages}` }} className="page-link">Last</Link>
            </li>
        </ul>
    );
}