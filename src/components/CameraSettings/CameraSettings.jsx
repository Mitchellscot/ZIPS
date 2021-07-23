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
import { useHistory } from 'react-router-dom';

function CameraSettings() {
    const history = useHistory();
    const ipAddress = "https://bztphotos.ddns.net";
    const dispatch = useDispatch();
    const [motionStarted, setMotionStarted] = useState(false);
    const [Sensitivity, setSensitivity] = useState(0);
    const [editSensitivity, setEditSensitivity] = useState(false);
    const toggleEditSensitivity = () => {
        setEditSensitivity(!editSensitivity);
    }
    const toggleMotionStarted = () => {
        setMotionStarted(!motionStarted);
    }

    const snapPhoto = () => {
        axios.get(`https://bztphotos.ddns.net:8082/photos`).then((result) => {
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
        axios.get(ipAddress + ':8080/0/detection/start').then((result) => {
            toggleMotionStarted();
        }).catch(error => console.log(error));
    }
    const pauseMotion = () => {
        axios.get(ipAddress + ':8080/0/detection/pause').then((result) => {
            toggleMotionStarted();
        }).catch(error => console.log(error));
    }

    const restartMotion = () => {
        axios.get(ipAddress + ':8080/0/action/restart').then((result) => {
            const element = document.getElementById('restart-button');
            element.classList.add('spin-restart');
            setTimeout(() => {
                element.classList.remove('spin-restart');
            }, 4000);
            setTimeout(() => {
                history.push('/Admin/Camera');
            }, 4000);

        }).catch(error => console.log(error));
    }

    const handleKeyPressSensitivity = e => {
        //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            handleEditSensitivity();
        }
    };

    const handleEditSensitivity = () => {
        if (editSensitivity === false) {
            setEditSensitivity(!editSensitivity);
        }
        else {
            setEditSensitivity(!editSensitivity);
            axios.get(ipAddress + `:8080/0/config/set?noise_level=${Sensitivity}`)
                .then((response) => {
                    axios.get(ipAddress + ':8080/0/config/get?query=noise_level').then((result) => {
                        let string = result.data;
                        let donePosition = string.indexOf('Done');
                        let answer = Number(string.substring(22, donePosition));
                        console.log(answer);
                        setSensitivity(answer);
                    }).catch(error => console.log(error));
                    axios.get(ipAddress + `:8080/0/config/write`).then((result) => {
                    }).catch(error => console.log(error));
                })
                .catch((error) => {
                    console.log(`HEY MITCH - CAN'T CHANGE THE Sensitivity: ${error}`);
                })
        }
    }

    useEffect(() => {
        //gets the status of the webcam
        axios.get(ipAddress + ':8080/0/detection/status').then((result) => {
            if (result.data.includes('ACTIVE')) {
                setMotionStarted(true);
            }
            else if (result.data.includes('PAUSE')) {
                setMotionStarted(false);
            }
        }).catch(error => console.log(error));
        //gets the value of the Sensitivity
        axios.get(ipAddress + ':8080/0/config/get?query=noise_level').then((result) => {
            let string = result.data;
            let donePosition = string.indexOf('Done');
            let answer = Number(string.substring(22, donePosition));
            console.log(answer.toString());
            setSensitivity(answer);
        }).catch(error => console.log(error));
    }, []);

    return (
        <Container fluid>
            <Row className="d-flex justify-content-left">
                <Col lg={2} md={3} sm={4} className="d-flex-inline text-center">
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
                            min="1"
                            max="100"
                            onChange={(e) => setSensitivity(e.target.value)}
                            className="text-center w-75"
                            value={Sensitivity}
                            onKeyPress={handleKeyPressSensitivity}
                        ></Form.Control><PencilFill
                                id="edit-sensitivity"
                                onClick={toggleEditSensitivity}
                                className="motion-buttons"
                                as="button"
                                fontSize="2rem"
                            /></div> :
                        <div className="d-flex justify-content-between mx-4"><Form.Control
                            type='range'
                            min="1"
                            max="100"
                            className="text-center w-75"
                            disabled
                            value={Sensitivity}
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
                    <hr />

                    <h5 className="camera-settings-text mt-4">SNAP PHOTO</h5>
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
                            variant="outline-dark"
                            onClick={snapPhoto}
                        />
                    </div>


                </Col>
                <Col lg={8} md={6} className="d-flex-inline justify-content-center">
                    <div id="the-flash-div" className="d-flex justify-content-center mx-0">
                        <img
                            id="the-flash"
                            src="../../flash-640x480.jpg" alt="flash" height="480px" width="640px"></img>
                        <img
                            id="the-webcam"
                            name="webcam" src={`https://bztphotos.ddns.net:8081`}
                            width="640px" height="480px" frameBorder="1" scrolling="no" />
                    </div>
                </Col>
                <Col lg={2} md={1} sm={0} className="d-flex-inline justify-content-center">
                    <div></div>
                </Col>
            </Row>
        </Container>
    );
}

export default CameraSettings;
