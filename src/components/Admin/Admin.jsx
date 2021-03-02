import './Admin.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminSideBar from '../AdminSideBar/AdminSideBar';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import OrdersTable from '../OrdersTable/OrdersTable';

function Admin() {

    return (
        <>
            <AdminHeader />
            <Container fluid>
                <Row>
                    <AdminSideBar />
                    <Col md={10} lg={11} className="ml-sm-auto px-md-5 py-5">
                    <main className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-4 pb-2 mb-3 border border-bottom-0 rounded-top">
                        
                        <OrdersTable />
                        
                        </main>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Admin;