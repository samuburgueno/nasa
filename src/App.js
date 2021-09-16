import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { roverRequestManifest, roverRequestPhotos } from './app/services/models/rover/slice';

const App = () => {
  const dispatch = useDispatch()
  const { rover } = useSelector((state) => state)

  useEffect(() => {
    if(rover.manifest.name === undefined) {
      dispatch(roverRequestManifest('curiosity'))
    }
  }, [dispatch, rover.manifest])

  const getPhotos = () => {
    dispatch(roverRequestPhotos({
      rover: 'curiosity',
      page: 1
    }))
  }

  return (
    <div className="main">
        {rover.isFetching === false && !!rover.manifest &&
          <p>{rover.manifest.name}</p>
        }
        <button onClick={getPhotos} className="button">Obtener Fotos</button>
    </div>
  );
}

export default App;
