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
        <Nav className="sidebar col-md-2 col-lg-2 d-md-block bg-light collapse position-sticky pt-3" >
            <Nav defaultActiveKey="Orders" as="ul" className="nav flex-column align-items-center">
                <Nav.Item as="li">
                    <Link className="nav-link" role="button" to={`${match.url}/orders`}>
                        Orders&nbsp;&nbsp;&nbsp;
                        <InboxFill />
                        </Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link className="nav-link" role="button" to={`${match.url}/pictures`}>
                        Pictures&nbsp;
                        <Image />
                    </Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link className="nav-link" role="button" to={`${match.url}/camera`}>
                        Camera&nbsp;&nbsp;&nbsp;
                        <CameraFill />
                        </Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Link className="nav-link" role="button" to={`${match.url}/account`}>
                        Account&nbsp;
                        <GearFill />
                        </Link>
                </Nav.Item>
            </Nav>
        </Nav>
    );
}

export default AdminSideBar;