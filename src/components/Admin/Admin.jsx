import './Admin.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import AdminHeader from '../AdminHeader/AdminHeader';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import OrdersTable from '../OrdersTable/OrdersTable';


function Admin() {


    return (
        <>
            <AdminHeader />
            <Container fluid>
                <Row>
                    {/*CONSIDER PUTTING THIS IN IT'S OWN COMPONENT */}
                    <Nav className="sidebar col-md-3 col-lg-2 d-md-block bg-light  collapse" >
                        <div className="position-sticky pt-3">
                            <Nav defaultActiveKey="Orders"as="ul" className="nav flex-column">
                                <Nav.Item as="li">
                                    <Nav.Link>Orders</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link>Pictures</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link>Camera Settings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Nav.Link>Account Settings</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                    </Nav>
                    {/**************************************************/}
                    <Col md={9} lg={10} className="ml-sm-auto px-md-5 py-5">
                    <main className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                        <OrdersTable />
                        </main>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Admin;