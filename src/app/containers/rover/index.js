import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Loading, EmptyState, Modal } from '../../components'

import { roverRequestManifest, roverRequestPhotos } from '../../services/models/rover/slice';
import { filterRequestSearch } from '../../services/models/filter/slice'

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
	}

	const openModal = (image) => {
		setImageForMmodal(image)
		setShowModal(true)
	}

	useEffect(() => {
		dispatch(roverRequestManifest(selectedRover))
	}, [selectedRover])

	// Cuando cambia el rover elegido se obtiene el manifest del mismo y seteo los parametros del query.
	useEffect(() => {
		if(rover.manifest.name !== undefined) {
			dispatch(filterRequestSearch({
				page: currentPage,
				earth_date: moment(rover.manifest.max_date).format('YYYY-MM-DD'),
				rover: selectedRover
			}))
		}
	}, [rover.manifest])

	useEffect(() => {
		setPhotos(rover.photos)
	}, [rover.photos])

	// Cuando cambian los filtros de busqueda realizo el nuevo query
	useEffect(() => {
		getPhotos({
			...filters.lastSearch, 
			page: currentPage
		})
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