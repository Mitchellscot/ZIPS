import React from 'react';
import { Link } from 'react-router-dom';
import './PicturesPagination.css';
import { useDispatch } from 'react-redux';


export default function PicturesPagination({ Pager, dateQuery}) {
    const params = new URLSearchParams(document.location.search);
    const page = parseInt(params.get('page'));
    const dispatch = useDispatch();

    const handlePageChange = (dateQuery) => {
    if (dateQuery === true) {
        let dateQ = document.getElementById("picture-search-date").value;
        //dispatch({type: "RESET_IMAGES"});
        dispatch({ type: "SEARCH_IMAGE_DATES", payload: {q: dateQ, page: page }});
    }
    else {
        //dispatch({type: "RESET_IMAGES"});
        dispatch({ type: 'FETCH_TODAYS_IMAGES', payload: {page: page} })
    }
}
    return (
        <ul className="pagination">
            <li className={`page-item previous-item ${Pager.currentPage === 1 ? 'disabled' : ''}`}>
                <Link to={{ search: `?page=${Pager.currentPage - 1}` }} className="page-link" onClick={handlePageChange(dateQuery)}>Previous</Link>
            </li>
            {Pager.pages.map(page =>
                <li key={page} className={`page-item number-item ${Pager.currentPage === page ? 'active' : ''}`}>
                    <Link onClick={handlePageChange(dateQuery)} to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                </li>
            )}
            <li className={`page-item next-item ${Pager.currentPage === Pager.totalPages ? 'disabled' : ''}`}>
                <Link onClick={handlePageChange(dateQuery)} to={{ search: `?page=${Pager.currentPage + 1}` }} className="page-link">Next</Link>
            </li>
        </ul>
    );
}