import React from 'react'

const Modal = ({ image, setShowModal }) => {
	return(
		<div class="modal">
			<div class="modal-background"></div>
				<div class="modal-content">
					<p class="image is-4by3">
						<img src={image} />
					</p>
				</div>
			<button onClick={() => setShowModal(false)} class="modal-close is-large" aria-label="close"></button>
		</div>
	)
}

export default Modal