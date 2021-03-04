import './PictureTableInstructions.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PictureTableInstructions({showModal, handleCloseModal}){
    return(
        <Modal show={showModal} onHide={handleCloseModal} animation={false} size="lg">
                <Modal.Header >
                    <Modal.Title className="w-100 text-center"><h1>Instructions</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>By default, what is shown in the Gallery view is only 5 hours old. This is to prevent the page from getting cluttered up with old images and so that guests can find their photos quickly. There may be times in which you would want to show photos that are older than five hours, or from a date a long time ago. Follow the steps below to display any photo you find on this page in the gallery view.</p>
                    <ol>
                        <li>Find your photo by selecting the "Today" button, or be entering a date in the search box and selecting "Search"</li>
                        <li>When you find the photo you would like to display, select the "Show" button. This will display it in the gallery to view alongside any other photo that is under 5 hours old.</li>
                        <li>If you would like to see a list of all photos that have been placed in the gallery, select the "All Shown" button. Note - this will enter you into a toggle mode, you will have to deselect the "All Shown" button to get out (You will see the button darken)</li>
                        <li>If you would like to simply clear all from the gallery view, just press the "Hide All" button.</li>
                    </ol>
                    <br />
                    <h5 className="text-center">Two of the biggest reasons why you would want to add photos to the gallery:</h5>
                    <br />
                    <ol>
                        <li>To add photos to the gallery to display in the morning when there are no photos to display. This way guests have photos to look at before their tour starts.</li>
                        <li>If someone calls and wants to view all the photos from the day that they went, you can search for the date they came in and add all of their photos to the gallery. You can then send them a link to the website along with a guest login and password and they can log into the site and purchase the photos there.</li>
                        </ol>
            </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="info" onClick={handleCloseModal}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>
    );
}

export default PictureTableInstructions;