import Carousel from 'react-bootstrap/Carousel';

function Photos({image}){
    return(
        <>
            <img
            className="d-block w-100"
            min-height="256px" min-width="320px"
            src={image} thumbnail/>
            </>
    );
}

export default Photos;