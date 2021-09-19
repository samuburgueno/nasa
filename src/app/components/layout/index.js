import React from 'react'

const Layout = ({ children, className }) => {
	return(
		<div className={`columns is-mobile ${className}`}>
			{children}
		</div>
	)
}

export default Layout