import React from 'react'
import { useSelector } from 'react-redux'

import Layout from '../../components/layout'
import Nabvar from '../navbar'
import Rover from '../rover'
import Search from '../search'

const Home = (props) => {
	const { rover } = useSelector((state) => state)

	return(
		<Layout className="Home">
			<Nabvar />
			<Rover {...props} />
			{rover.manifest.name !== undefined &&
				<Search />
			}
		</Layout>
	)
}

export default Home