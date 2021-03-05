import './AdminSideBar.css';
import Nav from 'react-bootstrap/Nav';
import { InboxFill, Image, CameraFill, GearFill } from 'react-bootstrap-icons';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

function AdminSideBar() {
    let match = useRouteMatch();
    return (
        <Nav className="sidebar col-md-2 col-lg-1 d-md-block bg-light collapse position-sticky pt-3" >
            <Nav defaultActiveKey="Orders" as="ul" className="nav flex-column">
                <Nav.Item as="li">
                    <Link className="nav-link" role="button" to={`${match.url}/Orders`}>
                        <InboxFill />
                        &nbsp;Orders
                        </Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link className="nav-link" role="button" to={`${match.url}/Pictures`}>
                        <Image />
                        &nbsp;Pictures
                    </Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link className="nav-link" role="button" to={`${match.url}/Camera`}>
                        <CameraFill />
                        &nbsp;Camera
                        </Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link className="nav-link" role="button" to={`${match.url}/Account`}>
                        <GearFill />
                        &nbsp;Account
                        </Link>
                </Nav.Item>
            </Nav>
        </Nav>
    );
}

export default AdminSideBar;