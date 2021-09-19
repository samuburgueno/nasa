import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Loading, EmptyState, Modal } from '../../components'

import { roverRequestManifest, roverRequestPhotos, roverRequestScroll } from '../../services/models/rover/slice';
import { filterRequestSearch } from '../../services/models/filter/slice'

const Rover = ({ selectedRover }) => {
	const dispatch = useDispatch()
	const { rover, filters } = useSelector((state) => state)

	const [currentPage, setCurrentPage] = useState(1)
	const [photos, setPhotos] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [imageForModal, setImageForMmodal] = useState(false)
	
	const observer = useRef();
	const lastPhotoRef = useCallback((node) => {
		if (rover.isFetchingScroll) return;
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				console.log("Incremento el contador")
				setCurrentPage((prev) => prev + 1);
			}
		});
		if (node) observer.current.observe(node);
	}, [rover.isFetchingPhotos]);

	const openModal = (image) => {
		setImageForMmodal(image)
		setShowModal(true)
	}

	useEffect(() => {
		if(rover?.manifest?.name?.toLowerCase() !== selectedRover) {
			setPhotos([])
			setCurrentPage(1)
			dispatch(roverRequestManifest(selectedRover))
		}
		
		if(!rover.isFetchingPhotos && rover.manifest.name?.toLowerCase() === selectedRover && !filters.searchFromFavorite) {
			const search = {
				rover: selectedRover,
				params: {
					page: 1,
					earth_date: moment(rover.manifest.max_date).format('YYYY-MM-DD'),
					rover: selectedRover
				},
			}
			dispatch(filterRequestSearch(search.params))
			dispatch(roverRequestPhotos(search))
		}
	}, [selectedRover, rover.manifest.name])

	useEffect(() => {
		setPhotos(rover.photos)
	}, [rover.photos])

	useEffect(() => {
		if(!rover.isFetchingScroll && currentPage !== 1) {
			let params = {...filters.lastSearch}
			params.page = currentPage
			
			dispatch(roverRequestScroll({
				params,
				rover: selectedRover
			}))
		}
	}, [currentPage])

	useEffect(() => {
		if(!rover.isFetchingScroll && rover.photosScroll.length > 0) {
			const tempPhotos = [...photos, ...rover.photosScroll]
			setPhotos(tempPhotos)
		}
	}, [rover.photosScroll])

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
								{photos.map((photo, index) => {
									const lastPhoto = photos.length === index + 1
									return lastPhoto ? (
										<div key={photo.id} ref={lastPhotoRef} onClick={() => openModal(photo.img_src)} key={photo.id} className="column is-one-third">
											<div className="card">
												<div className="card-image">
													<figure className="image is-4by3">
														<img src={photo.img_src} alt={`Fotografía ${photo.id}`} />
													</figure>
												</div>
											</div>
										</div>
									) : (
										<div key={photo.id} onClick={() => openModal(photo.img_src)} key={photo.id} className="column is-one-third">
											<div className="card">
												<div className="card-image">
													<figure className="image is-4by3">
														<img src={photo.img_src} alt={`Fotografía ${photo.id}`} />
													</figure>
												</div>
											</div>
										</div>
									)
								})}
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