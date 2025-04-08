import React from "react";

//include images into your bundle
import { Lista } from "./Lista.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<p className="fs-1">Mi lista</p>
			<Lista/>
		</div>
	);
};

export default Home;