import React from 'react'

import Layout from '../../components/layout'
import Nabvar from '../navbar'
import Rover from '../rover'
import Search from '../search'

const Home = (props) => {
	return(
		<Layout className="Home">
			<Nabvar />
			<Rover {...props} />
			<Search />
		</Layout>
	)
}

export default Home