import './CameraSettings.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { Pencil, PencilFill, Camera, Circle, PlayCircle, PlayCircleFill, PauseCircle, PauseCircleFill, ArrowCounterclockwise } from 'react-bootstrap-icons';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

function CameraSettings() {
    const ipAddress = "http://192.168.1.51:8080";
    const dispatch = useDispatch();
    const [motionStarted, setMotionStarted] = useState(false);
    //threshold max: 2147483647
    const [threshold, setThreshold] = useState(0);
    const [editSensitivity, setEditSensitivity] = useState(false);
    const toggleEditSensitivity = () => {
        setEditSensitivity(!editSensitivity);
    }
    const toggleMotionStarted = () => {
        setMotionStarted(!motionStarted);
    }

    const snapPhoto = () => {
        axios.get('http://192.168.1.51:5000/photos').then((result) => {
            if (result.status === 200) {
                const element = document.getElementById('the-flash');
                element.classList.add('the-flash');
                setTimeout(() => {
                    element.classList.remove('the-flash');
                }, 500);
            }
            else if (result.status !== 200) {
                console.log(result);
            }
        }).catch(error => console.log(error));
    }

    const startMotion = () => {
        axios.get(ipAddress+'/0/detection/start').then((result) => {
            toggleMotionStarted();
        }).catch(error => console.log(error));
    }
    const pauseMotion = () => {
        axios.get(ipAddress+'/0/detection/pause').then((result) => {
            toggleMotionStarted();
        }).catch(error => console.log(error));
    }

    const restartMotion = () => {
        axios.get(ipAddress+'/0/action/restart').then((result) => {
            const element = document.getElementById('restart-button');
            element.classList.add('spin-restart');
            setTimeout(() => {
                element.classList.remove('spin-restart');
            }, 4000);
            setTimeout(() => {
                location.reload();
            }, 4000);

        }).catch(error => console.log(error));
    }

    const handleKeyPressThreshold = e => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            handleEditThreshold();
        }
    };

    const handleEditThreshold = () => {
        //setThreshold(); ?
        if (editSensitivity === false) {
            setEditSensitivity(!editSensitivity);
        }
        else {
            setEditSensitivity(!editSensitivity);
            axios.get(ipAddress+`/0/config/set?threshold=${threshold}`)
                .then((response) => {
                    axios.get(ipAddress+'/0/config/get?query=threshold').then((result) => {
                        let string = result.data;
                        let donePosition = string.indexOf('Done');
                        let answer = Number(string.substring(22, donePosition));
                        console.log(answer);
                        setThreshold(answer);
                    }).catch(error => console.log(error));
                    axios.get(ipAddress+`/0/config/write`).then((result) => {
                    }).catch(error => console.log(error));
                })
                .catch((error) => {
                    console.log(`HEY MITCH - CAN'T CHANGE THE THRESHOLD: ${error}`);
                })
        }
    }

    useEffect(() => {
        //gets the status of the webcam
        axios.get(ipAddress+'/0/detection/status').then((result) => {
            if (result.data.includes('ACTIVE')) {
                setMotionStarted(true);
            }
            else if (result.data.includes('PAUSE')) {
                setMotionStarted(false);
            }
        }).catch(error => console.log(error));
        //gets the value of the threshold
        axios.get(ipAddress+'/0/config/get?query=threshold').then((result) => {
            let string = result.data;
            let donePosition = string.indexOf('Done');
            let answer = Number(string.substring(22, donePosition));
            console.log(answer);
            setThreshold(answer);
        }).catch(error => console.log(error));
    }, []);

    return (
        <Container fluid>
            <Row className="d-flex justify-content-center">
                <Col lg={2} md={2} className="d-flex-inline text-center">
                    <div className="border shadow mb-4"><h4 className="camera-settings-text">Motion Detection{motionStarted ?
                        <div
                            className="pt-2 active-sign"
                        >ACTIVE</div> :
                        <div
                            className="pt-2 pause-sign"
                        >PAUSED</div>}</h4></div>
                    <h5 className="camera-settings-text">START&nbsp;&nbsp;&nbsp;&nbsp;
                    {motionStarted ?
                            <PlayCircleFill
                                className="motion-buttons"
                                as="button"
                                fontSize="3rem"
                            /> :
                            <PlayCircle
                                onClick={startMotion}
                                className="motion-buttons"
                                as="button"
                                fontSize="3rem"
                            />
                        }</h5>
                    <h5 className="camera-settings-text">PAUSE&nbsp;&nbsp;&nbsp;&nbsp;
                    {motionStarted ?
                            <PauseCircle
                                onClick={pauseMotion}
                                className="motion-buttons"
                                as="button"
                                fontSize="3rem"
                            /> :
                            <PauseCircleFill

                                className="motion-buttons"
                                as="button"
                                fontSize="3rem"
                            />
                        }       </h5>
                    <h5 className="camera-settings-text">RESTART&nbsp;<ArrowCounterclockwise
                        id="restart-button"
                        onClick={restartMotion}
                        className="motion-buttons"
                        as="button"
                        fontSize="2.8rem"
                    /></h5>
                    <hr />

                    <h5 className="camera-settings-text mt-4">SENSITIVITY </h5>
                    {editSensitivity ?
                        <div className="d-flex justify-content-between mx-4"
                        ><Form.Control
                            type='range'
                            min="100"
                            max="100000"
                            onChange={(e) => setThreshold(e.target.value)}
                            className="text-center w-75"
                            value={threshold}
                            onKeyPress={handleKeyPressThreshold}
                        ></Form.Control><PencilFill
                                id="edit-sensitivity"
                                onClick={toggleEditSensitivity}
                                className="motion-buttons"
                                as="button"
                                fontSize="2rem"
                            /></div> :
                        <div className="d-flex justify-content-between mx-4"><Form.Control
                            type='range'
                            min="100"
                            max="100000"
                            className="text-center w-75"
                            disabled
                            value={threshold}
                        ></Form.Control>
                            <Pencil
                                id="edit-sensitivity"
                                onClick={toggleEditSensitivity}
                                className="motion-buttons"
                                as="button"
                                fontSize="2rem"
                            />
                        </div>
                    }

                </Col>
                <Col lg={8} md={8} className="d-flex-inline justify-content-center">
                    <div id="the-flash-div" className="d-flex justify-content-center">
                        <img
                            id="the-flash"
                            src="../../flash.jpg" alt="flash"></img>
                        <iframe
                            id="the-webcam"
                            className="" name="webcam" src='http://192.168.1.51:8081'
                            width="1024" height="768" frameBorder="1" scrolling="no" ></iframe >
                    </div>
                    <div id="the-div" className="d-flex justify-content-center pt-3">
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
                            variant="outline-dark" />
                    </div>

                </Col>
                <Col lg={2} md={2} className="d-flex-inline justify-content-center">
                    <div></div>
                </Col>
            </Row>
        </Container>
    );
}

export default CameraSettings;
