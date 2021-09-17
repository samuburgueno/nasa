import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
	return(
		<div className="column Navbar">
			<div className="columns is-flex-direction-column">
				<div className="column">
					<section className="SidebarSubtitle">
						<h2 className="subtitle">SouthernCode</h2>
					</section>
				</div>
			
				<div className="column">
					<aside className="menu">
						<p className="menu-label">Rovers</p>
						<ul className="menu-list">
							<li><Link to="/curiosity">Curiosity</Link></li>
							<li><Link to="/opportunity">Opportunity</Link></li>
							<li><Link to="/spirit">Spirit</Link></li>
						</ul>
					</aside>
				</div>
			</div>
		</div>
	)
}

export default Navbar