// React
import React, { useState, useEffect } from "react";
// Styles
import Container from '@material-ui/core/Container';
// Componants
import Header from "../../components/Header";
import Feature from "../../components/Feature";

const content =  [
	{
		title: "Feature 1",
		description: "Something nice",
		imageUrl: "https://source.unsplash.com/random",
	},
	{
		title: "Feature 2",
		description: "Multiple nice things",
		imageUrl: "https://source.unsplash.com/random",
	},
	{
		title: "Feature 3",
		description: "The best things",
		imageUrl: "https://source.unsplash.com/random",
	}
]

function Home() {
	return (
		<div>
			<Header />
			<Container maxWidth="lg">
				{content.map((content) => (
					<Feature props={content} />
				))}
			</Container>
		</div>
	);
}

export default Home;