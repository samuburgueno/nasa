import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller, useWatch } from "react-hook-form";
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment'
import es from 'date-fns/locale/es';
import '../../services/utils/moment'
import "react-datepicker/dist/react-datepicker.css";

import { filterRequestSearch, filterSaveSearch, filterRequestSearchFavorite } from '../../services/models/filter/slice'
import { roverRequestPhotos } from '../../services/models/rover/slice'
import { CURIOSITY_CAMS, OPPORTUNITY_CAMS, SPIRIT_CAMS } from '../../services/utils/constants';

moment.locale('es')
registerLocale('es', es)

const Search = ({ selectedRover }) => {
	const dispatch = useDispatch()
	const { rover, filters } = useSelector((state) => state)
	
	const [searches, setSearches] = useState([])
	const [cameras, setCameras] = useState([])

	const { handleSubmit, control, getValues, setValue } = useForm({
		defaultValues: {
			earth_date: moment(rover.manifest.max_date).toDate(),
			date_filter: "earth_date",
			sol: rover.manifest.max_sol,
			camera: undefined
		}
	})
	useWatch({ control, name: ['date_filter', 'camera'] })

	const onSubmit = (data) => {
		let search = {}
		if(data.date_filter === 'earth_date') {
			search = {
				earth_date: moment(data.earth_date).format('YYYY-MM-DD')
			}
		} else {
			search = {
				sol: data.sol
			}
		}

		search.camera = data.camera
		search.rover = selectedRover
		search.page = 1

		dispatch(roverRequestPhotos({
			rover: selectedRover,
			params: search,
		}))
		dispatch(filterRequestSearch(search))
		setSearches([...searches, search])
	}

	const onClickCamera = (cam) => {
		if(getValues("camera") === cam) {
			setValue("camera", undefined)
		} else {
			setValue("camera", cam)
		}
	}

	const setMaxDate = () => {
		const maxDatePicker = moment(rover.manifest.max_date).add(1, 'days');
		return maxDatePicker.toDate()
	}

	const getMisionDays = () => {
		const from = moment(rover.manifest.landing_date)
		const until = moment(rover.manifest.max_date)

		return until.diff(from, 'days')
	}

	const saveSearch = () => {
		const tempSearches = [...filters.searches]
		tempSearches.push({...filters.lastSearch, rover: selectedRover})
		
		dispatch(filterSaveSearch(tempSearches))
	}

	useEffect(() => {
		setSearches(filters.searches)
	}, [filters.searches])

	useEffect(() => {
		if(filters.searchFromFavorite && rover.manifest.name.toLowerCase() === filters.lastSearch.rover) {
			dispatch(filterRequestSearchFavorite(false))
			onSubmit({
				...filters.lastSearch,
				date_filter: filters.lastSearch.earth_date ? 'earth_date' : 'sol'
			})
		}
	}, [filters.lastSearch, filters.searchFromFavorite])

	useEffect(() => {
		switch(rover.manifest.name) {
			case 'Curiosity':
				setCameras(CURIOSITY_CAMS)
				break
			case 'Opportunity':
				setCameras(OPPORTUNITY_CAMS)
				break
			case 'Spirit':
				setCameras(SPIRIT_CAMS)
				break
			default: break
		}
	}, [rover.manifest.name])

	return(
		<div className="column Search">
			<div className="columns is-flex-direction-column">
				<div className="column">
					<section className="SidebarSubtitle">
						<h2 className="subtitle">Buscador</h2>
					</section>
				</div>

				<div className="column">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="control">
							<label className="label" htmlFor="date_filter">Tipo de fecha</label>
							<Controller
								control={control}
								name="date_filter"
								render={({ field: { onChange, onBlur, value, ref } }) => (
									<div className="control">
										<label className="radio">
											<input 
												onChange={onChange} 
												onBlur={onBlur} 
												ref={ref} 
												type="radio" 
												value="earth_date" 
												checked={value === 'earth_date' || false}
												name="date_filter" />
											Tierra</label>
										<label className="radio">
											<input 
												onChange={onChange} 
												onBlur={onBlur} 
												ref={ref} 
												type="radio" 
												value="sol" 
												checked={value === 'sol' || false}
												name="date_filter" />
											Sol</label>
									</div>
								)}
							/>
						</div>

						{(getValues('date_filter') === 'earth_date') &&
							<div className="control">
								<label className="label" htmlFor="earth_date">Fecha terrestre</label>
								<Controller
									control={control}
									name="earth_date"
									render={({ field: { onChange, onBlur, value, ref } }) => (
										<DatePicker
											className="input"
											dateFormat="dd/MM/yyyy"
											locale="es"
											maxDate={setMaxDate()}
											onChange={onChange}
											onBlur={onBlur}
											selected={value}
											ref={ref} />
										)}
									/>
							</div>
						}
						
						{(getValues('date_filter') === 'sol') &&
							<div className="control">
							<label className="label" htmlFor="sol">Fecha solar</label>
								<Controller
									control={control}
									name="sol"
									render={({ field: { onChange, onBlur, value, ref } }) => (
										<input
											type="number"
											min={1}
											placeholder={rover.manifest.max_sol}
											max={rover.manifest.max_sol}
											className="input"
											onChange={onChange}
											onBlur={onBlur}
											ref={ref} />
									)}
								/>
							</div>
						}

						<div className="control">
							<label className="label">Cámaras</label>
							<div className="tags">
								{cameras.map((cam) => 
									<span onClick={() => onClickCamera(cam)} key={cam} className={`tag ${getValues("camera") === cam ? 'is-primary' : ''}`}>{cam}</span>
								)}
							</div>
						</div>

						<Controller 
							control={control}
							name="camera"
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<input type="hidden" />
							)}
						/>

						<div className="control">
							<input type="submit" className="button is-primary input" value="Buscar" />
						</div>
					</form>

					<div className="control">
						<button onClick={saveSearch} className="button is-fullwidth">
							<span className="icon"><i className="fa fa-bookmark"></i></span>
							<span>Guardar búsqueda</span>
						</button>
					</div>

					<article className="message">
					  	<div className="message-header"><p>Información del {rover.manifest.name}</p></div>
					  	<div className="message-body">
					  		<p>
					  			La misión del rover {rover.manifest.name} fué lanzada en <strong>{moment(rover.manifest.launch_date).format('MMMM [de] YYYY')}</strong> y
					  			aterrizó en la superficie de Marte el día <strong>{moment(rover.manifest.landing_date).format('DD [de] MMMM  [de] YYYY')}</strong>. <br/>
					  			
					  			{rover.manifest.status === 'complete' &&
					  				<>El rover estuvo <strong>{getMisionDays()} días</strong> en misión, y capturó un total de <strong>{rover.manifest.total_photos} fotografías</strong>.</>
					  			}

					  			{rover.manifest.status === 'active' &&
					  				<>El rover hasta el momento lleva <strong>{getMisionDays()} días</strong> en misión y <strong>{rover.manifest.total_photos} fotografías</strong> capturadas.</>
					  			}
					  		</p>
					  	</div>
					</article>
				</div>
			</div>
		</div>
	)
}

export default Search