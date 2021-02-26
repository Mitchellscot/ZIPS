import Carousel from 'react-bootstrap/Carousel';

function Photos({image}){
    return(
        <>
            <img
            className="d-block w-100"
            height="400px" 
            src={image} thumbnail/>
            <Carousel.Caption>
                <p>{image}</p>
            </Carousel.Caption>
            </>
    );
}

export default Photos;