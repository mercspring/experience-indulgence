// React
import React, { useState, useEffect } from "react";
// Componants
import Cover from "../../components/Cover";

const content =  [
	{
		title: "",
		description: "",
		imageUrl: "",
	},
	{
		title: "",
		description: "",
		imageUrl: "",
	},
	{
		title: "",
		description: "",
		imageUrl: "",
	}
]

function Home() {
	return (
		<div>
			<Cover />
		{/*content.map((content) => (
			<Feature props={content} />
		))*/}
		</div>
	);
}

export default Home;