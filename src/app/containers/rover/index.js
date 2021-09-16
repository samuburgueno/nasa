import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { roverRequestManifest, roverRequestPhotos } from '../../services/models/rover/slice';

const Rover = () => {
	const dispatch = useDispatch()
	const { rover } = useSelector((state) => state)

	const [photos, setPhotos] = useState([])

	const getPhotos = () => {
		dispatch(roverRequestPhotos({
			rover: rover.manifest.name,
			page: 1
		}))
	}

	useEffect(() => {
		if(rover.manifest.name === undefined) {
			dispatch(roverRequestManifest('curiosity'))
		}
	}, [dispatch, rover.manifest])

	useEffect(() => {
		if(rover.manifest.name !== undefined) {
			getPhotos()
		}
	}, [rover.manifest])

	useEffect(() => {
		setPhotos(rover.photos)
	}, [rover.photos])

	return(
		<div className="column is-three-fifths">
			{rover.isFetching === false && !!rover.manifest &&
				<p>{rover.manifest.name}</p>
			}

			{photos.length > 0 &&
				<div className="WrapperPhotos columns is-flex-wrap-wrap">
					{photos.map((photo) => (
						<div key={photo.id} className="column is-one-third">
							<div className="card">
								<div className="card-image">
									<figure className="image is-4by3">
										<img src={photo.img_src} alt={`Fotografía ${photo.id}`} />
									</figure>
								</div>
							</div>
						</div>
					))}
				</div>
			}
		</div>
	)
}

export default Rover