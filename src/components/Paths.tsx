import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';

const Paths = () => (
	<Routes>
		<Route path="/" element={<Home />} />
	</Routes>
);

export default Paths;
