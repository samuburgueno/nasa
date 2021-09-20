import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Loading, EmptyState, Modal, Photo } from '../../components'

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
		if(!rover.isFetchingScroll && currentPage !== 1 && rover.hasMore) {
			const params = {...filters.lastSearch}
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

	useEffect(() => {
		setCurrentPage(1)
	}, [filters.lastSearch])

	return(
		<div className="column Rover is-three-fifths">
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
									return (
										<Photo key={photo.id} photo={photo} lastPhotoRef={lastPhoto ? lastPhotoRef : undefined} openModal={openModal} />
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