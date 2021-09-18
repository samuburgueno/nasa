import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Loading, EmptyState, Modal } from '../../components'

import { roverRequestManifest, roverRequestPhotos } from '../../services/models/rover/slice';
import { filterRequestSearch, filterRequestSearchFavorite } from '../../services/models/filter/slice'

const Rover = ({ selectedRover }) => {
	const dispatch = useDispatch()
	const { rover, filters } = useSelector((state) => state)

	const [currentPage, setCurrentPage] = useState(1)
	const [photos, setPhotos] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [imageForModal, setImageForMmodal] = useState(false)

	const getPhotos = (params) => {
		setPhotos([])
		dispatch(roverRequestPhotos({
			rover: selectedRover,
			params
		}))
		dispatch(filterRequestSearchFavorite(false))
	}

	const openModal = (image) => {
		setImageForMmodal(image)
		setShowModal(true)
	}

	useEffect(() => {
		if(rover?.manifest?.name?.toLowerCase() !== selectedRover) {
			dispatch(roverRequestManifest(selectedRover))
		}
		
		if(rover.manifest.max_date) {
			dispatch(roverRequestPhotos({
				params: {
					page: currentPage,
					earth_date: moment(rover.manifest.max_date).format('YYYY-MM-DD')
				},
				rover: selectedRover
			}))
		}
	}, [selectedRover, rover.manifest.max_date, currentPage])

	// Cuando cambia el rover elegido se obtiene el manifest del mismo y seteo los parametros del query.
	// useEffect(() => {
	// 	if(rover.manifest.name !== undefined) {
	// 		getPhotos({
	// 			page: currentPage,
	// 			earth_date: moment(rover.manifest.max_date).format('YYYY-MM-DD')
	// 		})
	// 		dispatch(filterRequestSearchFavorite(false))
	// 		// dispatch(filterRequestSearch({
	// 		// 	page: currentPage,
	// 		// 	earth_date: moment(rover.manifest.max_date).format('YYYY-MM-DD'),
	// 		// 	rover: selectedRover
	// 		// }))
	// 	}
	// }, [])

	useEffect(() => {
		dispatch(filterRequestSearchFavorite(false))
		setPhotos(rover.photos)
	}, [rover.photos])

	// Cuando cambian los filtros de busqueda realizo el nuevo query
	useEffect(() => {
		// if(!rover.isFetchingPhotos && !rover.isFetching) {
		// 	getPhotos({
		// 		...filters.lastSearch, 
		// 		page: currentPage
		// 	})
		// }
	}, [filters.lastSearch])

	return(
		<div className="column is-three-fifths">
			<div className="columns is-flex-direction-column">
				<div className="column RoverSubtitleWrapper">
					<section className="RoverSubtitle">
						{rover.isFetching &&
							<h2 className="subtitle">Obteniendo información...</h2>
						}

						{!rover.isFetching &&
							<h2 className="subtitle">{rover.manifest.name}</h2>
						}
					</section>
				</div>
				
				{(rover.isFetching || rover.isFetchingPhotos) &&
					<Loading />
				}

				{!rover.isFetching && !rover.isFetchingPhotos &&
					<div className="column">
						{photos.length > 0 &&
							<div className="WrapperPhotos columns is-flex-wrap-wrap is-variable is-2">
								{photos.map((photo) => (
									<div onClick={() => openModal(photo.img_src)} key={photo.id} className="column is-one-third">
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
				}

				{!rover.isFetching && !rover.isFetchingPhotos && photos.length === 0 &&
					<EmptyState />
				}

				{showModal &&
					<Modal
						setShowModal={setShowModal}  
						image={imageForModal} />
				}
			</div>
		</div>
	)
}

export default Rover