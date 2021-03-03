import './AdminHeader.css';
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function AdminHeader(){
    const history = useHistory();
    return(
        <Navbar sticky="top" bg="dark" expand="lg" className="d-flex justify-content-between flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-2 col-lg-1 md-0" onClick={history.go}>
                <img src="Brainerd_Horizontal_White_RGB.svg" height="75px" width="188px" alt="logo" /></a>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <Button size={"sm"} variant="light" className="nav-link">Sign Out</Button>
                </li>
            </ul>
        </Navbar>
    );
}

export default AdminHeader;