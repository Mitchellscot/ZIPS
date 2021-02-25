import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';

function Photos({order, image}){
    return(
        
        <Accordion.Collapse eventKey={order.id}>
        <td md={12}>
            <img src={image} height="150px" width="150px" thumbnail/>
            </td>
        </Accordion.Collapse>
    );
}

export default Photos;