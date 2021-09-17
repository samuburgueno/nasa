import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller, useWatch } from "react-hook-form";
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment'
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

import { filterRequestSearch } from '../../services/models/filter/slice'
import { CURIOSITY_CAMS, OPPORTUNITY_CAMS, SPIRIT_CAMS } from '../../services/utils/constants';

registerLocale('es', es)

const Search = () => {
	const dispatch = useDispatch()
	const { rover, filters } = useSelector((state) => state)
	
	const [searches, setSearches] = useState([])
	const [cameras, setCameras] = useState([])

	console.log(rover.manifest.max_date)

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

	useEffect(() => {
		setSearches(filters.searches)
	}, [filters.searches])
	
	useEffect(() => {
		// console.log(searches)
	}, [searches])

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
		console.log(rover.manifest.max_date)
	}, [rover.manifest.name])

	const setMaxDate = () => {
		const maxDatePicker = moment(rover.manifest.max_date).add(1, 'days');
		return maxDatePicker.toDate()
	}

	return(
		<div className="column Search">
			{rover.manifest.name !== undefined &&
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
											checked={value === 'earth_date' ? true : false}
											name="date_filter" />
										Tierra</label>
									<label className="radio">
										<input 
											onChange={onChange} 
											onBlur={onBlur} 
											ref={ref} 
											type="radio" 
											value="sol" 
											checked={value === 'sol' ? true : false}
											name="date_filter" />
										Sol</label>
								</div>
							)}
						/>
					</div>

					{(getValues('date_filter') === 'earth_date') &&
						<div className="control">
							<label className="label" htmlFor="earth_date">Fecha de la tierra</label>
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
			}
		</div>
	)
}

export default Search