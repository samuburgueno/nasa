import React from 'react'

import Layout from '../../components/layout'
import Nabvar from '../navbar'
import Rover from '../rover'
import Search from '../search'

const Home = () => {
	return(
		<Layout className="Home">
			<Nabvar />
			<Rover />
			<Search />
		</Layout>
	)
}

export default Home