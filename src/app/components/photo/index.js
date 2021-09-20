import React from 'react'

const Photo = ({ photo, lastPhotoRef, openModal }) => {
	return(
		<div ref={lastPhotoRef} onClick={() => openModal(photo.img_src)} key={photo.id} className="column is-one-third">
			<div className="card">
				<div className="card-image">
					<figure className="image is-4by3">
						<img src={photo.img_src} alt={`Fotografía ${photo.id}`} />
					</figure>
				</div>
			</div>
		</div>
	)
}

export default Photo