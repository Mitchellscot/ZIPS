import './EmailTablePhotos.css';

function EmailTablePhotos({image}){
    return(
        <>
            <img
            className="d-block w-100"
            min-height="256px" min-width="320px"
            src={image} thumbnail/>
            </>
    );
}

export default EmailTablePhotos;