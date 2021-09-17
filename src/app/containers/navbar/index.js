import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';

import history from '../../services/navigation/history'
import { filterRequestSearch, filterSaveSearch } from '../../services/models/filter/slice';
import { ROVERS } from '../../services/utils/constants'
import { roverRequestManifest, roverRequestPhotos } from '../../services/models/rover/slice';

const Navbar = () => {
	const dispatch = useDispatch()
	const { filters } = useSelector((state) => state)

	const handleClickSearch = (search) => {
		console.log(search)
		// history.push(`/${search.rover}`)
		// dispatch(roverRequestManifest(search.rover))
		// dispatch(roverRequestPhotos({
		// 	params: search,
		// 	rover: search.rover
		// }))
	}

	const handleClickDelete = (index) => {
		let tempSearches = [...filters.searches]
		tempSearches.splice(index, 1)
		
		dispatch(filterSaveSearch(tempSearches))
	}

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

				<div className="column">
					<aside className="menu">
						<p className="menu-label">Búsquedas guardadas</p>
						{filters.searches.map((search, index) => 
							<div className="box" key={index}>
								<p><small><strong>Rover</strong><br/>{ROVERS[search.rover]}</small></p>

								{search.sol &&
									<p><small><strong>Fecha solar</strong><br/>{search.sol}</small></p>
								}

								{search.earth_date && 
									<p><small><strong>Fecha terrestre</strong><br/>{moment(search.earth_date).format('DD/MM/YYYY')}</small></p>
								}

								{search.camera &&
									<p><small><strong>Cámara</strong><br/>{search.camera}</small></p>
								}

								<div className="buttons">
									<button className="level-item button is-danger" aria-label="trash" onClick={() => handleClickDelete(index)}>
										<span className="icon is-small">
										<i className="fas fa-trash" aria-hidden="true"></i>
										</span>
									</button>
									<button className="level-item button is-primary" aria-label="search" onClick={() => handleClickSearch(search)}>
										<span className="icon is-small">
										<i className="fas fa-search" aria-hidden="true"></i>
										</span>
									</button>
								</div>
							</div>
						)}
					</aside>
				</div>
			</div>
		</div>
	)
}

export default Navbar