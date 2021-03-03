import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GalleryItem from '../GalleryItem/GalleryItem';
import GalleryHeader from '../GalleryHeader/GalleryHeader';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { SRLWrapper } from "simple-react-lightbox";
import './Gallery.css';

const options = {
  settings:{
    autoplaySpeed: 4000,
    slideAnimationType: 'both'
  },
  buttons:{
    backgroundColor: 'rgba(30,30,36,0.8)',
      iconColor: 'rgba(255, 255, 255, 0.8)',
      iconPadding: '10px',
      showDownloadButton: false,
      size: '60px'
  },
  caption:{
    captionContainerPadding: "0px 40px",
    captionFontFamily: "Roboto, sans-serif",
    captionFontSize: "48px"
  }
}

function Gallery() {
  const dispatch = useDispatch();
  const gallery = useSelector(store => store.gallery);

  useEffect(() => {
    dispatch({ type: 'FETCH_GALLERY' })
  }, []);

  return (
    <>
      <GalleryHeader />
      <SRLWrapper options={options}>
        <Container>
      <div className="galleryContainer row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {gallery.map(image => {
          return (
            <Col key={image.id}>
              <GalleryItem image={image} />
            </Col>
          )
        })}
        </div>
        </Container>
        </SRLWrapper>
    </>
  );
}

export default Gallery;
