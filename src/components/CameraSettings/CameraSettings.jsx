import './CameraSettings.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import {Camera, Circle} from 'react-bootstrap-icons';
import axios from 'axios';
import swal from 'sweetalert';

function CameraSettings() {

    const snapPhoto = () => {
        axios.get('http://192.168.0.82:5000/photos').then((result) =>{
            if (result.status === 200){
                 swal({
                    title: "Photo Taken!",
                    icon: "success",
                    text: "Go to the gallery to view it!",
                    dangerMode: false,
                    buttons: false,
                    timer: 2500
                }) 
            }
            else if (result.status !== 200){

                console.log(result);
            }
        }).catch(error => console.log(error));
    }

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center">
            <Col lg={1} md={1} className="d-flex justify-content-center">
            </Col>
            <Col lg={8} md={8} className="d-flex-inline justify-content-center">
            <iframe className="" name="webcam" src='http://192.168.0.82:8081'
            width="1024" height = "768" frameBorder = "1" frameSpacing = "" scrolling = "no" border = "0" ></iframe >
            <div id="the-div" className="d-flex justify-content-center">
                <Circle 
                id="the-circle"
                fontSize="3rem"
                variant="outline-dark"
                onClick={snapPhoto}
                ></Circle>
            <Camera 
                className=" mt-1"
                id="the-camera"
                as="button"
                fontSize="2.1rem"
                variant="outline-dark"
                
                variant="outline-dark" />
                </div>
                
            </Col>
            <Col lg={3} md={3} className="d-flex-inline justify-content-center">
            <div></div>
            </Col>
            </Row>

        </Container>
        
    );
}

export default CameraSettings;