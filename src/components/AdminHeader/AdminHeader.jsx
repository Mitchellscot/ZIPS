import './AdminHeader.css';
import { useHistory } from 'react-router-dom';
import * as rb from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function AdminHeader(){
    const history = useHistory();
    return(
        <Navbar bg="dark" expand="lg" className="sticky-top d-flex justify-content-between flex-md-nowrap p-0 shadow" >
            <Navbar.Brand onClick={history.go}><h1 className="brand-text">Z.I.P.S.</h1></Navbar.Brand>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <Button variant="info" class="nav-link">Sign Out</Button>
                </li>
            </ul>
        </Navbar>
    );
}

export default AdminHeader;