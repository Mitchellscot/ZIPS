import './AdminHeader.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {BoxArrowRight} from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import {loginConstants} from "../../_constants";

function AdminHeader(){
    const dispatch = useDispatch();

    return(
        <Navbar sticky="top" bg="dark" expand="lg" className="d-flex justify-content-between flex-md-nowrap p-0 shadow">
            <a className="d-flex justify-content-center navbar-brand col-md-2 col-lg-2 md-0 px-2 py-2">
                <img src="../../zips_blue_45x200.png" height="45px" width="200px" alt="logo" /></a>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <BoxArrowRight 
                    id="logoutButton"
                    className="mr-4"
                    fontSize="2rem"
                    color="white"
                    onClick={() => dispatch({ type: loginConstants.LOGOUT })}
                    />
                </li>
            </ul>
        </Navbar>
    );
}

export default AdminHeader;