import './AccountSettings.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function AccountSettings() {
    return (
        <Container fluid>
                <Form>
                    <h4>Email Settings</h4>
                <Form.Group controlId="exampleForm.ControlInput1" className="d-flex justify-content-between">
                        <Form.Label className="fluid">
                        Sending Email
                        </Form.Label>
                        <Form.Control className="mx-auto" type="email" placeHolder="bztinfo@ziplinemn.com" />
                    </Form.Group>
                </Form>
        </Container >
    );
}

export default AccountSettings;