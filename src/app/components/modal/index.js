import React from 'react'

const Modal = ({ image, setShowModal }) => {
	return(
		<div className="modal is-active">
			<div className="modal-background"></div>
				<div className="modal-content">
					<p className="image is-4by3">
						<img src={image} />
					</p>
				</div>
			<button onClick={() => setShowModal(false)} className="modal-close is-large" aria-label="close"></button>
		</div>
	)
}

export default Modal