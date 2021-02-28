import './Footer.css';
import Container from 'react-bootstrap/Container';
import * as bootstrap from 'react-bootstrap';

function Footer(){
    return(
        <footer className="footer mt-auto py-3 bg-primary">
            <Container>
                <h1>This is the footer. Stuff goes here.</h1>
            </Container>
        </footer>
    );
}

export default Footer;