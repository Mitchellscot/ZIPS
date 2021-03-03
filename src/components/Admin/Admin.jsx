import './Admin.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import Row from 'react-bootstrap/Row';
import OrdersTable from '../OrdersTable/OrdersTable';
import { Switch, Route } from "react-router-dom";
import PicturesTable from '../PicturesTable/PicturesTable';
import Camera from '../CameraSettings/CameraSettings';
import Account from '../AccountSettings/AccountSettings';

function Admin() {
    return (
        <>
            <AdminHeader />
            <Container fluid>
                <Row>
                    <AdminSideBar />
                    <Col md={10} lg={11} className="ml-sm-auto px-md-5 py-3">
                        <main className="d-flex flex-wrap flex-md-nowrap pt-4 pb-2 mb-3 border border-bottom-0 rounded-top">
                        <Switch>
                        <Route path="/Admin/orders">
                            <OrdersTable />
                            </Route>
                        <Route path="/Admin/pictures">
                            <PicturesTable />
                            </Route>
                        <Route path="/Admin/Camera">
                            <Camera />
                        </Route>
                        <Route path="/Admin/Account">
                            <Account />
                        </Route>
                        </Switch>
                        </main>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Admin;