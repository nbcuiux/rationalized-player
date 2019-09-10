import React from 'react'
import { render } from 'react-dom'

import Crisp from '../components/Crisp'


window.mountCrisp= function(options, el) {

	render(
		<Crisp customDefaultOptions={options}/>,
	  document.getElementById('root')
	)

}
