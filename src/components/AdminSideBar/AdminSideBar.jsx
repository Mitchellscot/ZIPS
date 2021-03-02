import './AdminSideBar.css';
import Nav from 'react-bootstrap/Nav';
import {InboxFill, Image, CameraFill, GearFill} from 'react-bootstrap-icons';

function AdminSideBar(){
    return(
        <Nav className="sidebar col-md-2 col-lg-1 d-md-block bg-light  collapse position-sticky pt-3" >
            <Nav defaultActiveKey="Orders"as="ul" className="nav flex-column">
                <Nav.Item as="li">
                    <Nav.Link>
                        <InboxFill />
                        &nbsp;&nbsp;Orders
                        </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link>
                        <Image />
                        &nbsp;&nbsp;Pictures</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link>
                        <CameraFill />
                        &nbsp;&nbsp;Camera </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link>
                        <GearFill />
                        &nbsp;&nbsp;Account </Nav.Link>
                </Nav.Item>
            </Nav>

    </Nav>
    );
}

export default AdminSideBar;