import './Footer.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import * as bootstrap from 'react-bootstrap';

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-primary">
            <Container>
                <div>
                    <Button
                        onClick={() => {
                            addUpCart(cart);
                            handleShowModal()
                        }}
                        variant="secondary">Email Selected</Button>{' '}
                </div>
            </Container>
        </footer>
    );
}

export default Footer;