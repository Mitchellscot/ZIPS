import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GalleryItem from '../GalleryItem/GalleryItem';

function Gallery() {
  const dispatch = useDispatch();
  const gallery = useSelector(store => store.gallery);

  React.useEffect(() => {
    dispatch({ type: 'FETCH_GALLERY' })
  }, []);

  return (
    <div className="container">
      {gallery.map(image => {
        return (
          <ul key={image.id}>
            <GalleryItem image={image} />
          </ul>
        )
      })}

    </div>
  );
}

export default Gallery;
