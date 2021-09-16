import React from 'react'

const Layout = ({ children, className }) => {
	return(
		<div className={`columns ${className}`}>
			{children}
		</div>
	)
}

export default Layout