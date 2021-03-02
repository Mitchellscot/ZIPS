import './EmailTableEmail.css';
import parse from "html-react-parser";
import Modal from 'react-bootstrap/Modal';

function EmailTableEmail({ email, emailModal, setEmailModal }) {

    const findSubject = (email) =>{
        let begin = email.indexOf(">") + 1;
        let end = email.indexOf("</");
        let subject = email.substring(begin, end);
        return subject;
    }
    const findMessageBody = (email) =>{
        let begin = email.indexOf("</h1>") + 5;
        let body = email.slice(begin);
        return body;
    }

    return (
        <>
            <Modal
                size="lg"
                show={emailModal}
                onHide={() => setEmailModal(!emailModal)}
                backdrop="static"
                id="email-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="w-100 text-center">
                        <h1>{findSubject(email.email_text)}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {<div>{parse(findMessageBody(email.email_text))}</div>}
                </Modal.Body>
            </Modal>

        </>
    );
}

export default EmailTableEmail;